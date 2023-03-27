import React, { useState, useContext } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";

import { Context } from "../Layout";

function UpdateBoard(props) {
  const { eventId, board, refresh } = props;
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    operator: board.operator.id,
    comment: board.comment,
    event: eventId,
  });

  const { setToaster } = useContext(Context);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateBoardForm = event.currentTarget;

    if (updateBoardForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      operator: form.operator,
      comment: form.comment,
      event: eventId,
    };

    axiosService
      .put(`/event/${eventId}/board/${board.id}/`, data)
      .then(() => {
        handleClose();
        setToaster({
          type: "success",
          message: "Board signed 🚀",
          show: true,
          title: "Success!",
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "danger",
          message: "An error occurred.",
          show: true,
          title: "Board asigment Error",
        });
      });
  };

  return (
    <>
      <Dropdown.Item data-testid="show-modal-form" onClick={handleShow}>
        Modify
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Update Board supply</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <Form
            data-testid="update-board-test"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3">
              <Form.Control
                name="comment"
                value={form.comment}
                data-testid="board-comment-field"
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            data-testid="update-board-submit"
            variant="primary"
            onClick={handleSubmit}
          >
            Modify
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateBoard;