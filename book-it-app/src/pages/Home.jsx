import React from "react";
import Layout from "../components/Layout";
import { Row, Col, Image } from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { getUser } from "../hooks/user.actions";
import { Event } from "../components/event";
import CreateEvent from "../components/event/CreateEvent";
import ProfileCard from "../components/profile/ProfileCard";

function Home() {
  const events = useSWR("/event/", fetcher, {
    refreshInterval: 20000,
  });
  const profiles = useSWR("/account/?limit=5", fetcher);

  const user = getUser();

  if (!user) {
    return <div>Loading!</div>;
  }

  return (
    <Layout>
      <Row className="justify-content-evenly">
        <Col sm={7}>
          <Row className="border rounded  align-items-center">
            <Col className="flex-shrink-1">
              <Image
                src={user.avatar}
                roundedCircle
                width={52}
                height={52}
                className="my-2"
                alt="аватарка для создания поста"
              />
            </Col>
            <Col sm={10} className="flex-grow-1">
              <CreateEvent refresh={events.mutate} />
            </Col>
          </Row>
          <Row className="my-4">
            {events.data?.results.map((event, index) => (
              <Event key={index} event={event} refresh={events.mutate} />
            ))}
          </Row>
        </Col>
        <Col sm={3} className="border rounded py-4 h-50">
          <h4 className="font-weight-bold text-center">Все пользователи</h4>
          <div className="d-flex flex-column">
            {profiles.data &&
              profiles.data.results.map((profile, index) => (
                <ProfileCard key={index} user={profile} />
              ))}
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default Home;