import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function DefaultNavbar({loginModalOpened}) {

  const loginModalOpen = () => {
    loginModalOpened();
  }

  return (
    <Navbar id='navbar--shop' expand="lg" className="bg-body-tertiary" bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand>
            <Link to="/landing" >
                <img
                    src="images/icmed_logo.svg"
                    className="d-inline-block align-top"
                    alt="C-Shop"
                    width={100}
                />
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" id='nav-bar-link-container'>
            <Link id="nav--font" className="nav-link" to="/landing">Store</Link>
            <Link id="nav--font" className="nav-link">About Us</Link>
            <Link to="/signup" id="nav--font" className="nav-link">Register</Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <button onClick={loginModalOpen} id="nav--font" className='nav-link'>Login</button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DefaultNavbar;