import React, { useContext, useState } from "react";
import { Button, Modal, Form, Dropdown, Image } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { Context } from "../Layout";

function UpdateEvent(props) {
  const { event, refresh } = props;
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const [form, setForm] = useState({
    admin: event.admin.id,
    body: event.body,
    image: event.image,
  });
  

  const [image, setImage] = useState();

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
      image: form.image, 
    };
    

    const formData = new FormData();

    // Checking for null values in the form and removing it.

    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });

    if (image) {
      formData.append("image", image);
    }
    axiosService
      .patch(`/event/${event.id}/`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        }
      })
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


<Form.Group className="mb-3 d-flex flex-column">
        <Form.Label className="text-center">Image</Form.Label>
        <Image
          src={form.image}
          // roundedCircle
          width={220}
          height={180}
          className="m-2 border border-primary border-2 align-self-center"
        />
        <Form.Control
        
          onChange={(e) => setImage(e.target.files[0])}
          // onChange={(e) => setForm(...form, image: e.target.files[0])}
          className="w-50 align-self-center"
          type="file"
          size="sm"
        />
        
        <Form.Control.Feedback type="invalid">
          This file is required.
        </Form.Control.Feedback>
      </Form.Group>

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