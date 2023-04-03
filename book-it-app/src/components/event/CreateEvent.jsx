import React, { useState, useContext } from "react";
import { Button, Modal, Form, Image } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import { Context } from "../Layout";

function CreateEvent(props) {
  const { refresh } = props;
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    admin: "",
    body: "",
    image: null,
  });

  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const createEventForm = event.currentTarget;

    if (createEventForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      admin: user.id,
      body: form.body,
      image: form.image,
    };

    axiosService
      .post("/event/", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(() => {
        handleClose();
        setToaster({
          type: "success",
          message: "Event created 🚀",
          show: true,
          title: "Event Success",
        });
        setForm({});
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
      <Form.Group className="my-3 w-75">
        <Form.Control
          className="py-2 rounded-pill border-primary text-primary"
          data-testid="show-modal-form"
          type="text"
          placeholder="Write a post"
          onClick={handleShow}
        />
      </Form.Group>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            data-testid="create-event-form"
          >

<Form.Group className="mb-3 d-flex flex-column">
        <Form.Label className="text-center">Image</Form.Label>
        <Image
          src={form.image}
          // roundedCircle
          width={420}
          height={280}
          className="m-2 border border-primary border-2 align-self-center"
        />
        <Form.Control
        
          onChange={(e) => setForm({...form, image: e.target.files[0]})}
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
                data-testid="event-body-field"
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!form.body}
            data-testid="create-event-submit"
          >
            Event
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateEvent;