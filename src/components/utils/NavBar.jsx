import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavBar({ url }) {
  return (
    <Navbar className="justify-content-start fixed-top navbar-color" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand className="text-navbar-title"><b>Todo List</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          {url
            && <h5 style={{ color: 'white' }}>{`Backend Server Endpoint: ${url}`}</h5>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

NavBar.propTypes = {
  url: PropTypes.string,
};

NavBar.defaultProps = {
  url: '',
};
