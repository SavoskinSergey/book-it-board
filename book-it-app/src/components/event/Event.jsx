import React, { useContext } from "react";
import { format } from "timeago.js";
import { LikeFilled, CommentOutlined, LikeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import { Image, Card, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import UpdateEvent from "./UpdateEvent";
import { Context } from "../Layout";
import MoreToggleIcon from "../MoreToggleIcon";

function Event(props) {
  const { event, refresh, isSingleEvent } = props;
  const { setToaster } = useContext(Context);

  const user = getUser();
  // const date = moment(event.event_data);
  // const date = moment("2014-06-01T12:00:00Z").format("MM YYYY");
  const date = moment(event.event_data).format("DD.MM YYYY старт в hh:mm");

  const handleLikeClick = (action) => {
    axiosService
      .post(`/event/${event.id}/${action}/`)
      .then(() => {
        refresh();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    axiosService
      .delete(`/event/${event.id}/`)
      .then(() => {
        setToaster({
          type: "warning",
          message: "Event deleted 🚀",
          show: true,
          title: "Event Deleted",
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
      <Card className="rounded-3 my-4" data-testid="post-test">
        <Card.Body>
          <Card.Title className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row">
              <Image
                src={event.admin.avatar}
                roundedCircle
                width={48}
                height={48}
                className="me-2 border border-primary border-2"
              />
              <Image
                src={event.image}
                width={480}
                height={320}
                className="me-2 border border-primary border-2"
              />
              <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                <p className="fs-6 m-0">{event.admin.username}</p>
                <p className="fs-6 fw-lighter">
                  <small>{format(event.created)}</small>
                </p>
              </div>
            </div>
            {user.username === event.admin.username && (
              <div>
                <Dropdown>
                  <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <UpdateEvent event={event} refresh={refresh} />
                    <Dropdown.Item
                      onClick={handleDelete}
                      className="text-danger"
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Card.Title>
          <Card.Text>{event.body}</Card.Text>


          <Card.Text>{date}</Card.Text>


          <Card.Text>{event.event_limit}</Card.Text>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row">
              <LikeFilled
                style={{
                  color: "#fff",
                  backgroundColor: "#0D6EFD",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "75%",
                  padding: "2px",
                  margin: "3px",
                }}
              />
              <p className="ms-1 fs-6">
                <small>{event.subscribes_count} Количество Участников</small>
              </p>
            </div>
            {!isSingleEvent && (
              <p className="ms-1 fs-6">
                <small>
                  <Link to={`/event/${event.id}/`}>
                    {event.boards_count} количесвто поддержки. Подробнее..
                  </Link>
                </small>
              </p>
            )}
          </div>
        </Card.Body>
        <Card.Footer className="d-flex bg-white w-50 justify-content-between border-0">
          <div className="d-flex flex-row">
            <LikeOutlined
              style={{
                width: "24px",
                height: "24px",
                padding: "2px",
                fontSize: "20px",
                color: event.subscribed ? "#0D6EFD" : "#C4C4C4",
              }}
              onClick={() => {
                if (event.subscribed) {
                  handleLikeClick("unsubscribe");
                } else {
                  handleLikeClick("subscribe");
                }
              }}
            />
            <p className="ms-1">
              <small>Участники</small>
            </p>
          </div>
          {!isSingleEvent && (
            <div className="d-flex flex-row">
              <CommentOutlined
                style={{
                  width: "24px",
                  height: "24px",
                  padding: "2px",
                  fontSize: "20px",
                  color: "#C4C4C4",
                }}
              />
              <p className="ms-1 mb-0">
                <small>Поддержка</small>
              </p>
            </div>
          )}
        </Card.Footer>
      </Card>
    </>
  );
}

export default Event;