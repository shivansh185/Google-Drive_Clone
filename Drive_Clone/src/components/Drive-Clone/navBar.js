import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; // Firebase auth instance
import SearchBar from './SearchBar';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="w-100 shadow-sm" style={{ width: '100%' }}>
      <Container fluid className="d-flex justify-content-between align-items-center">
        {/* Brand & Profile */}
        <div className="d-flex align-items-center gap-3">
          <Navbar.Brand as={Link} to="/">Drive Clone</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/user">Profile</Nav.Link>
          </Nav>
        </div>

        {/* Search and Logout */}
        <div className="d-flex align-items-center gap-2">
          <SearchBar />
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
