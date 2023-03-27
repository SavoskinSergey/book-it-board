import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import ProfileDetails from "../components/profile/ProfileDetails";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { Event } from "../components/event";
import { Row, Col } from "react-bootstrap";

function Profile() {
  const { profileId } = useParams();

  const user = useSWR(`/account/${profileId}/`, fetcher);

  const events = useSWR(`/event/?admin__public_id=${profileId}`, fetcher, {
    refreshInterval: 20000,
  });

  return (
    <Layout hasNavigationBack>
      <Row className="justify-content-evenly">
        <Col sm={9}>
          <ProfileDetails user={user.data} />
          <div>
            <Row className="my-4">
              {events.data?.results.map((event, index) => (
                <Event key={index} event={event} refresh={events.mutate} />
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default Profile;