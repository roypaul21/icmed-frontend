import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { FaStore } from "react-icons/fa6";
import { FaBox } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import Logout from '../Logout';

function UserNavbar({}) {

  const handleLogout = async() => {
    await Logout()
  }

  return (
    <Navbar id='navbar--shop--user' expand="lg" className="bg-body-tertiary" bg="light" data-bs-theme="light">
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
          <Nav className="me-auto">
            <Link id="nav--font" className="nav-link" to="/store"><FaStore/>Store</Link>
            <Link id="nav--font" className="nav-link" to="/cart"><FaCartShopping />Cart</Link>
            <Link id="nav--font" className="nav-link" to="/order"><FaBox />My Orders</Link>
          </Nav>
        </Navbar.Collapse>
        
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown title={<><CgProfile /> Username</>} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.2">
                <button onClick={() => handleLogout()} id="nav--font" className='nav-link'>Logout</button>
              </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserNavbar;