import React from "react";

import Layout from "../components/Layout";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { Order } from "../components/order";
// import CreateBoard from "../components/board/CreateBoard";
// import Board from "../components/board/Board";

function SingleOrder() {
  const { orderId } = useParams();

  const order = useSWR(`/order/${orderId}/`, fetcher);


  return (
    <Layout hasNavigationBack>
      <Row className="my-4">
        <h1>Ваша заявка на участие</h1>
        {order.data ? (
            <Row className="justify-content-center">
            <Col sm={8}>
                <Order order={order.data} refresh={order.mutate} isSingleOrder />
            </Col>
            </Row>
        ) : (
            <div>Loading...</div>
        )}
      </Row>
    </Layout>
  );
}

export default SingleOrder;