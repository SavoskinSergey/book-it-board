import React from "react";

import Layout from "../components/Layout";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { Event } from "../components/event";
import CreateBoard from "../components/board/CreateBoard";
import Board from "../components/board/Board";

function SingleEvent() {
  const { eventId } = useParams();

  const event = useSWR(`/event/${eventId}/`, fetcher);

  const boards = useSWR(`/event/${eventId}/board/`, fetcher);

  return (
    <Layout hasNavigationBack>
      {event.data ? (
        <Row className="justify-content-center">
          <Col sm={8}>
            <Event event={event.data} refresh={event.mutate} isSingleEvent />
            <CreateBoard eventId={event.data.id} refresh={boards.mutate} />
            {boards.data &&
              boards.data.results.map((board, index) => (
                <Board
                  key={index}
                  eventId={event.data.id}
                  board={board}
                  refresh={boards.mutate}
                />
              ))}
          </Col>
        </Row>
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  );
}

export default SingleEvent;