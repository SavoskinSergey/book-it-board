import React, { useContext, useState } from "react";
import { Button, Modal, Form, Dropdown, Image } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { Context } from "../Layout";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function UpdateEvent(props) {
  const { event, refresh } = props;
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const [form, setForm] = useState({
    admin: event.admin.id,
    body: event.body,
    image: event.image,
    event_data: event.event_data,
    duration: event.duration,
    event_limit: event.event_limit,
  });
  

  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(form.image);
  
  const { setToaster } = useContext(Context);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      event_data: form.event_data, 
      duration: form.duration, 
      event_limit: form.event_limit, 
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
    for (let pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
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
                src={imagePreview}
                width={220}
                height={180}
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
                value={form.body}
                data-testid="event-body-field"
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                as="textarea"
                rows={3}
              />
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Выберете дату:</Form.Label>
                <DatePicker
                  name="event_data"
                  selected={form.event_data ? new Date(form.event_data) : null}
                  data-testid="event-event_data-field"
                  onChange={(date) => setForm({ ...form, event_data: date.toISOString() })}
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