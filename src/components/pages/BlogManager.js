import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  Container, Form, Button, Card, Row, Col,
  Spinner, Modal, Toast, ToastContainer, Image
} from 'react-bootstrap';
import { PencilSquare, Trash, XCircle } from 'react-bootstrap-icons';
import { AuthService } from '../../services/Auth';
import AppNav from '../header/AppNav';
import loginBg from "../../img/login/login.jpeg";

// ✅ Import React-Quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/api/blogs`;
const UPLOAD_URL = `${process.env.REACT_APP_API_BASE_URL}/api/upload`;

// Helper function to generate a URL-friendly slug
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
};

// ✅ Custom image handler for Cloudinary upload
function imageHandler() {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(UPLOAD_URL, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (data.url) {
          const range = this.quill.getSelection();
          this.quill.insertEmbed(range.index, "image", data.url);
        } else {
          console.error("Upload failed: No URL returned");
        }
      } catch (err) {
        console.error("Image upload failed", err);
      }
    }
  };
}

const BlogManager = () => {
  // State variables
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    slug: '',
    content: '',
    coverImage: ''
  });
  const [showDeleteModal, setShowDeleteModal] = useState({ show: false, id: null });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  // Auth headers
  const getAuthHeaders = () => {
    const token = AuthService.getToken();
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  };

  // Toast
  const showToast = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  // Fetch blogs
  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_BASE, getAuthHeaders());
      setBlogs(response.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      showToast('Failed to fetch blogs.', 'danger');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newFormData = { ...prev, [name]: value };
      if (name === 'title' && (prev.slug === '' || prev.slug === generateSlug(prev.title))) {
        newFormData.slug = generateSlug(value);
      }
      return newFormData;
    });
  };

  // Submit blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isEditing = formData.id !== null;
    const url = isEditing ? `${API_BASE}/${formData.id}` : API_BASE;
    const method = isEditing ? 'put' : 'post';

    try {
      await axios[method](url, formData, getAuthHeaders());
      showToast(`Blog ${isEditing ? 'updated' : 'created'} successfully!`);
      handleCancelEdit();
      fetchBlogs();
    } catch (error) {
      console.error(`Failed to ${isEditing ? 'update' : 'create'} blog:`, error);
      showToast(`Error: Could not ${isEditing ? 'update' : 'create'} blog.`, 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      coverImage: blog.coverImage || ''
    });
  };

  const handleCancelEdit = () => {
    setFormData({ id: null, title: '', slug: '', content: '', coverImage: '' });
  };

  const handleDeleteClick = (id) => {
    setShowDeleteModal({ show: true, id: id });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/${showDeleteModal.id}`, getAuthHeaders());
      showToast('Blog deleted successfully!');
      setShowDeleteModal({ show: false, id: null });
      fetchBlogs();
    } catch (error) {
      console.error("Failed to delete blog:", error);
      showToast('Error: Could not delete blog.', 'danger');
    }
  };

  return (
    <div style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
      <header id="header">
        <AppNav />
      </header>

      <h1 className="brownbear stays-h1 heading-color">Blogs</h1>

      <Container className="my-4">
        {/* Blog Form */}
        <Card className="mb-4">
          <Card.Header as="h3">{formData.id ? 'Edit Blog' : 'Create New Blog'}</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Slug</Form.Label>
                <Form.Control type="text" name="slug" value={formData.slug} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cover Image URL</Form.Label>
                <Form.Control type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} />
                {formData.coverImage && (
                  <Image src={formData.coverImage} thumbnail className="mt-2" style={{ maxHeight: '100px' }} />
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                  modules={BlogManager.modules}
                  formats={BlogManager.formats}
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                {formData.id && (
                  <Button variant="secondary" type="button" className="me-2" onClick={handleCancelEdit}>
                    <XCircle /> Cancel
                  </Button>
                )}
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner as="span" size="sm" animation="border" /> : (formData.id ? 'Update Blog' : 'Create Blog')}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* Existing Blogs */}
        <h3>Existing Blogs</h3>
        {isLoading ? (
          <div className="text-center p-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row>
            {blogs.length > 0 ? blogs.map(blog => (
              <Col key={blog.id} md={4} className="mb-4">
                <Card className="h-100">
                  <Image
                    src={blog.coverImage || loginBg}
                    fluid
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                  <Card.Body>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">/{blog.slug}</Card.Subtitle>
                    <div className="mt-3 d-flex justify-content-between">
                      <Button variant="outline-primary" size="sm" onClick={() => handleEdit(blog)}>
                        <PencilSquare /> Edit
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(blog.id)}>
                        <Trash /> Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )) : (
              <Col><Card><Card.Body>No blogs found. Create one to get started!</Card.Body></Card></Col>
            )}
          </Row>
        )}
      </Container>

      {/* Delete Modal */}
      <Modal show={showDeleteModal.show} onHide={() => setShowDeleteModal({ show: false, id: null })} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal({ show: false, id: null })}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toasts */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
        <Toast onClose={() => setNotification({ ...notification, show: false })} show={notification.show} delay={3000} autohide bg={notification.type}>
          <Toast.Header>
            <strong className="me-auto">{notification.type === 'success' ? 'Success' : 'Error'}</strong>
          </Toast.Header>
          <Toast.Body className={notification.type === 'success' ? 'text-white' : ''}>{notification.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

// ✅ Quill toolbar config with custom image handler
BlogManager.modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
    handlers: {
      image: imageHandler,
    },
  },
};

BlogManager.formats = [
  "header",
  "bold", "italic", "underline", "strike",
  "list", "bullet",
  "blockquote", "code-block",
  "link", "image"
];

export default BlogManager;
