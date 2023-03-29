import React, { useState, useContext } from "react";
import { Button, Form, Image } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";

import { Context } from "../Layout";

function CreateBoard(props) {
  const { eventId, refresh } = props;
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    operator: "",
    comment: "",
    event: "",
  });

  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    const createBoardForm = event.currentTarget;

    if (createBoardForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      operator: user.id,
      comment: form.comment,
      event: eventId,
    };

    axiosService
      .post(`/event/${eventId}/board/`, data)
      .then(() => {
        setForm({ ...form, comment: "" });
        setToaster({
          type: "success",
          message: "Board supliyed successfully🚀",
          show: true,
          title: "Board register!",
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "danger",
          message: "",
          show: true,
          title: "An error occurred.!",
        });
      });
  };

  return (
    <Form
      className="d-flex flex-row justify-content-between"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      data-testid="create-board-test"
    >
      <Image
        src={user.avatar}
        roundedCircle
        width={48}
        height={48}
        className="my-2"
      />
      <Form.Group className="m-3 w-75">
        <Form.Control
          className="py-2 rounded-pill border-primary"
          type="text"
          data-testid="comment-body-field"
          placeholder="Write a comment"
          value={form.comment}
          name="comment"
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
        />
      </Form.Group>
      <div className="m-auto">
        <Button
          variant="primary"
          data-testid="create-board-submit"
          onClick={handleSubmit}
          disabled={!form.comment}
          size="small"
        >
          Board support
        </Button>
      </div>
    </Form>
  );
}

export default CreateBoard;