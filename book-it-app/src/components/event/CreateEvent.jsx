import React, { useState, useContext } from "react";
import { Button, Modal, Form, Image } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import { Context } from "../Layout";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CreateEvent(props) {
  const { refresh } = props;
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    admin: "",
    body: "",
    image: null,
    event_data: "",
    duration: "",
    event_limit: 3,
  });

  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  };


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
      // image: form.image,
      event_data: form.event_data.toISOString(),
      duration: form.duration,
      event_limit: form.event_limit,
    };
    
    const formData = new FormData();
    // Checking for null values in the form and removing it.

    Object.keys(data).forEach((key) => {
      if (data[key]) {
        console.log(data[key])
        formData.append(key, data[key]);
      }
    });
    if (image) {
      formData.append("image", image);
    }

    axiosService
      .postForm("/event/", formData, {
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
                src={imagePreview}
                width={420}
                height={280}
                className="m-2 border border-primary border-2 align-self-center"
              />
              <Form.Control
                onChange={(e) => handleImageChange(e)}
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


            <Form.Group controlId="formDate">
              <Form.Label>Выберете дату:</Form.Label>
                <DatePicker
                  name="event_data"
                  data-testid="event-event_data-field"
                  selected={form.event_data}
                  onChange={(date) => setForm({ ...form, event_data: date })}
                  showIcon
                  minDate={new Date()}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy hh:mm aa"
                />
            </Form.Group>


            <Form.Group controlId="duration">
              <Form.Label>Продолжительность (часы)</Form.Label>
              <Form.Control
                type="time"
                step="900"
                placeholder="Введите продолжительность в часах"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />
              <Form.Text className="text-muted">часов</Form.Text>
            </Form.Group>

            
            <Form.Group controlId="event_limit">
              <Form.Label>Количество посетителей</Form.Label>
              <Form.Control 
                type="number"
                placeholder="Введите количество посетителей"
                value={form.event_limit}
                max="10"
                onChange={(e) => setForm({ ...form, event_limit: e.target.value })}
              />
              <Form.Text className="text-muted">максимум 10</Form.Text>
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