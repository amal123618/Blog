import 'bootstrap/dist/css/bootstrap.min.css';
import './navBar.css';          
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AppNavbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="navbar-custom"
      variant="dark"   
    >

      <Container>
        <Navbar.Brand as={Link} to="/"><img src="/blogi.jpg"  className='logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
             {isAuthenticated && (
              <Nav.Link as={Link} to="/create_blog">Create Blog</Nav.Link>
              )}
            {isAuthenticated ? (
              <>
                <Nav.Link as="button" onClick={handleLogout}>Logout</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/Blogs">Blogs</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
