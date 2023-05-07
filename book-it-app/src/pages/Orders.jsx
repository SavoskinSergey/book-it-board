import React from "react";
import Layout from "../components/Layout";
import { Row } from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import TableOrder from '../components/order/TableOrder';

function ListOrders() {
  const orders = useSWR("/order/", fetcher, {
    refreshInterval: 20000,
  });

  if (!orders) {
    return <div>Loading!</div>;
  }
  return (
    <Layout hasNavigationBack>
    
      <Row className="my-4">
          <h1>Подписки на событие</h1>
          <TableOrder orders={orders}/>
      </Row>
    </Layout>
  );
}

export default ListOrders;