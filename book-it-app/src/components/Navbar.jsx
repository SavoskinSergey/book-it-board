import React from "react";

import { Navbar, Container, Image, NavDropdown, Nav, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUser, useUserActions } from "../hooks/user.actions";
import styled from 'styled-components';

import CreateEvent from "../components/event/CreateEvent";

const Styles = styled.div `
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #adb1b8;
    &:hover {
      color: white
    }
  }
`


function NavigationBar() {
  const userActions = useUserActions();

  const user = getUser();

  return (
    <Styles>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="fw-bold" as={Link} to={`/`}>
            Book-it-NOW
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={`/event/`}>Статистика</Nav.Link>
            <Nav.Link as={Link} to={`/order/`}>Заявки</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown
                title={
                  <Image src={user.avatar} roundedCircle width={36} height={36} />
                }
              >
                <NavDropdown.Item as={Link} to={`/profile/${user.id}/`}>
                  YouProfile
                </NavDropdown.Item>
                
                <NavDropdown.Item as={Link} to={`/event/`}>
                  Статистика по событиям
                </NavDropdown.Item>

                <NavDropdown.Item >
                  CreateEvent
                  <Col sm={10} className="flex-grow-1">
                      <CreateEvent />
                  </Col>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={userActions.logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
      
    </Styles>
  );
}

export default NavigationBar;