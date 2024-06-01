import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import { UsersService } from "../../services/Users";

function DeleteUsers(props) {
  const deleteUsers = async (id) => {
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await UsersService.deleteUsers(id);
        if (res.status === 200) {
          alert("User delete");
        } else {
          alert("Error while else");
        }
      }
    } catch (error) {
      alert("Error while catch");
    }
  };
  return (
    <>
      <FontAwesomeIcon
        icon={faTrash}
        size="lg"
        className="custom-icon"
        onClick={(e) => {
          deleteUsers();
        }}
      />
    </>
  );
}

export default DeleteUsers;
