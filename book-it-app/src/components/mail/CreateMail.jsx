import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import { Context } from "../Layout";
import 'react-datepicker/dist/react-datepicker.css';

function CreateMail(props) {
  const { refresh } = props;
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleSubmit = (event) => {
    event.preventDefault();
    const createOrderForm = event.currentTarget;

    if (createOrderForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);


    const data = {
      sender_name: form.name,
      sender_email: form.email,
      body: form.message,
      subject: `вопрос от ${form.name}`
    };
    
    const formData = new FormData();
    // Checking for null values in the form and removing it.

    Object.keys(data).forEach((key) => {
      if (data[key]) {
        console.log(data[key])
        formData.append(key, data[key]);
      }
    });

    axiosService
      .postForm("/mail/", formData)

      .then(() => {
        handleClose();
        setToaster({
          type: "success",
          message: "Mail send 🚀",
          show: true,
          title: "Mail send",
        });
        setForm({});
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
    <h6 className="text-center mb-0"  onClick={handleShow}>Остались вопросы, напиши
    <span>&#9993;</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Остались вопросы, напиши нам на почту:</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <Form 
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            data-testid="create-event-form">
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                type="text"
                placeholder="Введите имя"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                placeholder="Введите email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMessage">
                <Form.Label>Сообщение</Form.Label>
                <Form.Control
                as="textarea"
                rows={3}
                placeholder="Введите сообщение"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              <Form.Control.Feedback type="invalid">
                This file is required.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!form.email || !form.message}
            data-testid="create-order-submit"
            >
                Отправить нам сообщение
          </Button>
        </Modal.Footer>
      </Modal>
      
    </h6>
    </>
  );
}

export default CreateMail;