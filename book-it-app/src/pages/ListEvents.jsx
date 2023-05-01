import React from "react";
import Layout from "../components/Layout";
import { Row } from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { EventStat } from "../components/event";
import TableEvent from '../components/event/TableEvent';

function ListEvents() {
  const events = useSWR("/events-stat/", fetcher, {
    refreshInterval: 20000,
  });

  if (!events) {
    return <div>Loading!</div>;
  }
  return (
    <Layout hasNavigationBack>
             
      <Row className="my-4">
          <h1>Список ближайших событий</h1>
          <TableEvent events={events}/>
      </Row>
      <Row className="my-4">
        {events.data?.results.map((event, index) => (
          <EventStat key={index} event={event} />
       ))}
       </Row>

    </Layout>
  );
}

export default ListEvents;