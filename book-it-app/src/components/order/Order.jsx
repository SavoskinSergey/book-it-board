import React, { useContext } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import { Card } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import { Context } from "../Layout";
import { Event } from "../event";
import QRCodeComponent from "../QRCode.jsx";

function Order(props) {
  const { order, refresh, isSingleOrder } = props;
  const { setToaster } = useContext(Context);
  const currentUrl = window.location.href;

  const user = getUser();
  // const date = moment(event.event_data);
  // const date = moment("2014-06-01T12:00:00Z").format("MM YYYY");
  const date = moment(order.event.event_data).format("DD.MM YYYY старт в hh:mm");

  const handleLikeClick = (action) => {
    axiosService
      .post(`/order/${order.id}/${action}/`)
      .then(() => {
        refresh();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    axiosService
      .delete(`/order/${order.id}/`)
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
              <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                <p className="fs-6 m-0">{order.account.username}</p>
                <p className="fs-6 fw-lighter">
                  <small>{format(order.created)}</small>
                </p>
              </div>
            </div>

          </Card.Title>
          <Card.Text>{order.token}</Card.Text>
          <QRCodeComponent id={currentUrl} />
          <Card.Text>{order.status}</Card.Text>


          <Card.Text>{order.event.date}</Card.Text>
          <Event event={order.event}  />



        </Card.Body>

      </Card>
    </>
  );
}

export default Order;