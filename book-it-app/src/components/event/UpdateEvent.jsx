import React, { useContext, useState } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { Context } from "../Layout";

function UpdateEvent(props) {
  const { event, refresh } = props;
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    admin: event.admin.id,
    body: event.body,
  });

  const { setToaster } = useContext(Context);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (_event) => {
    _event.preventDefault();
    const updateEventForm = _event.currentTarget;

    if (updateEventForm.checkValidity() === false) {
      _event.stopPropagation();
    }

    setValidated(true);

    const data = {
      admin: form.admin,
      body: form.body,    
    };
    axiosService
      .put(`/event/${event.id}/`, data)
      .then(() => {
        handleClose();
        setToaster({
          type: "success",
          message: "Event updated 🚀",
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
          title: "Event Error",
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
          <Modal.Title>Update Event</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            data-testid="update-event-form"
          >
            <Form.Group className="mb-3">
              <Form.Control
                name="body"
                value={form.body}
                data-testid="event-body-field"
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            data-testid="update-event-submit"
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

export default UpdateEvent;