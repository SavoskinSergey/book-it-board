import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import { Context } from "../Layout";
import 'react-datepicker/dist/react-datepicker.css';

function CreateOrder(props) {
  const { refresh,  eventId } = props;
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    account: "",
    event: "",
    comment: "",
    status: "draft"
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
      account: user.id,
      event: eventId,
      comment: form.comment,
      status: form.status,
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
      .postForm("/order/", formData)

      .then(() => {
        handleClose();
        setToaster({
          type: "success",
          message: "Order created 🚀",
          show: true,
          title: "Order Success",
        });
        setForm({});
      })
      .catch(() => {
        setToaster({
          type: "danger",
          message: "An error occurred.",
          show: true,
          title: "Order Error",
        });
      });
  };

  return (
    <>
    
    <Button variant="primary" onClick={handleShow}>Принять участие</Button>
      {/* <Form.Group className="my-3 w-75">
        <Form.Control
          className="py-2 rounded-pill border-primary text-primary"
          data-testid="show-modal-form"
          type="text"
          placeholder="Create order"
         
        />
      </Form.Group> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Подать заявку на участие</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            data-testid="create-order-form"
          >


            <Form.Group className="mb-3">
              <Form.Control
                name="comment"
                data-testid="order-comment-field"
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
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
            disabled={!form.comment}
            data-testid="create-order-submit"
          >
            Принять участие
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateOrder;