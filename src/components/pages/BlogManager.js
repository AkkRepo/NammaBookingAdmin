import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { 
  Container, Form, Button, Card, Row, Col, 
  Spinner, Modal, Toast, ToastContainer, Image 
} from 'react-bootstrap';
import { PencilSquare, Trash, XCircle } from 'react-bootstrap-icons';
import { AuthService } from '../../services/Auth'; // Assuming this is the correct path

const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/api/blogs`;

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

  // Function to get headers with the auth token
  const getAuthHeaders = () => {
    const token = AuthService.getToken();
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  };

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  // Fetch all blogs from the API
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

  // Handle form input changes, including auto-slug generation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newFormData = { ...prev, [name]: value };
      // Auto-generate slug from title only if slug hasn't been manually edited
      if (name === 'title' && (prev.slug === '' || prev.slug === generateSlug(prev.title))) {
        newFormData.slug = generateSlug(value);
      }
      return newFormData;
    });
  };

  // Handle form submission for both creating and updating
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isEditing = formData.id !== null;
    const url = isEditing ? `${API_BASE}/${formData.id}` : API_BASE;
    const method = isEditing ? 'put' : 'post';

    try {
      await axios[method](url, formData, getAuthHeaders());
      showToast(`Blog ${isEditing ? 'updated' : 'created'} successfully!`);
      handleCancelEdit(); // Reset form
      fetchBlogs(); // Refresh the list
    } catch (error) {
      console.error(`Failed to ${isEditing ? 'update' : 'create'} blog:`, error);
      showToast(`Error: Could not ${isEditing ? 'update' : 'create'} blog.`, 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set the form up for editing a blog
  const handleEdit = (blog) => {
    setFormData({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      coverImage: blog.coverImage || ''
    });
  };
  
  // Clear the form and reset to "create" mode
  const handleCancelEdit = () => {
    setFormData({ id: null, title: '', slug: '', content: '', coverImage: '' });
  };

  // Show the delete confirmation modal
  const handleDeleteClick = (id) => {
    setShowDeleteModal({ show: true, id: id });
  };

  // Perform the actual deletion after confirmation
  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/${showDeleteModal.id}`, getAuthHeaders());
      showToast('Blog deleted successfully!');
      setShowDeleteModal({ show: false, id: null });
      fetchBlogs(); // Refresh the list
    } catch (error) {
      console.error("Failed to delete blog:", error);
      showToast('Error: Could not delete blog.', 'danger');
    }
  };

  return (
    
    <>
      <Container className="my-4">
        <Row>
          {/* Existing Blogs Column */}
          <Col md={7}>
            <h3>Existing Blogs</h3>
            {isLoading ? (
              <div className="text-center p-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                {blogs.length > 0 ? blogs.map(blog => (
                  <Card key={blog.id} className="mb-3">
                    <Row g={0}>
                      <Col sm={4}>
                        <Image src={blog.coverImage || 'https://via.placeholder.com/200x150'} fluid roundedStart style={{objectFit: 'cover', height: '100%'}}/>
                      </Col>
                      <Col sm={8}>
                        <Card.Body>
                          <Card.Title>{blog.title}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">/{blog.slug}</Card.Subtitle>
                          <div className="mt-3">
                            <Button variant="outline-primary" size="sm" onClick={() => handleEdit(blog)}>
                              <PencilSquare /> Edit
                            </Button>
                            <Button variant="outline-danger" size="sm" className="ms-2" onClick={() => handleDeleteClick(blog.id)}>
                              <Trash /> Delete
                            </Button>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                )) : <Card><Card.Body>No blogs found. Create one to get started!</Card.Body></Card>}
              </div>
            )}
          </Col>

          {/* Manage Blogs Form Column */}
          <Col md={5}>
            <Card className="position-sticky" style={{ top: '2rem' }}>
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
                    {formData.coverImage && <Image src={formData.coverImage} thumbnail className="mt-2" style={{maxHeight: '100px'}}/>}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={5} name="content" value={formData.content} onChange={handleChange} required />
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
          </Col>
        </Row>
      </Container>
      
      {/* Delete Confirmation Modal */}
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

      {/* Toast Notification Container */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
        <Toast onClose={() => setNotification({ ...notification, show: false })} show={notification.show} delay={3000} autohide bg={notification.type}>
          <Toast.Header>
            <strong className="me-auto">{notification.type === 'success' ? 'Success' : 'Error'}</strong>
          </Toast.Header>
          <Toast.Body className={notification.type === 'success' ? 'text-white' : ''}>{notification.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default BlogManager;