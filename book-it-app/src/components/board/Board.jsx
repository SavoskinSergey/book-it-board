import React, { useContext } from "react";
import { format } from "timeago.js";
import { Image, Card, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import UpdateBoard from "./UpdateBoard";
import { Context } from "../Layout";
import MoreToggleIcon from "../MoreToggleIcon";

function Board(props) {
  const { eventId, board, refresh } = props;
  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleDelete = () => {
    axiosService
      .delete(`/event/${eventId}/board/${board.id}/`)
      .then(() => {
        setToaster({
          type: "danger",
          message: "Board supply deleted 🚀",
          show: true,
          title: "Board support Deleted",
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "warning",
          message: "Board deleted 🚀",
          show: true,
          title: "Board Deleted",
        });
      });
  };

  return (
    <Card className="rounded-3 my-2" data-testid="comment-test">
      <Card.Body>
        <Card.Title className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row">
            <Image
              src={board.operator.avatar}
              roundedCircle
              width={48}
              height={48}
              className="me-2 border border-primary border-2"
            />
            <div className="d-flex flex-column justify-content-start align-self-center mt-2">
              <p className="fs-6 m-0">{board.operator.name}</p>
              <p className="fs-6 fw-lighter">
                <small>{format(board.created)}</small>
              </p>
            </div>
          </div>
          {user.name === board.operator.name && (
            <div>
              <Dropdown>
                <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>
                <Dropdown.Menu>
                  <UpdateBoard
                    board={board}
                    refresh={refresh}
                    eventId={eventId}
                  />
                  <Dropdown.Item onClick={handleDelete} className="text-danger">
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </Card.Title>
        <Card.Text>{board.comment}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Board;