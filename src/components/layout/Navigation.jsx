import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";

function Navigation() {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="" height="50" />
        </Link>
        <Navbar.Toggle aria-controls="main-navigation" />
        <Navbar.Collapse id="main-navigation">
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link">
              Latest posts
            </NavLink>
            <NavLink to="profiles" className="nav-link">
              Profiles
            </NavLink>
            <>
              <NavLink to="admin" className="nav-link">
                My profile
              </NavLink>
              <Button variant="secondary">Log out</Button>
            </>
            <NavLink to="login" className="nav-link">
              Log in
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
