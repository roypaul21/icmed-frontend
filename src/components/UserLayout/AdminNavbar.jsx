import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { FaAddressBook } from "react-icons/fa";
import { FaStore } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";
import { FaBox } from "react-icons/fa6";
import Logout from '../Logout';

function AdminNavbar({}) {

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
            <Link id="nav--font" className="nav-link"><FaAddressBook/>Contact Us</Link>
            <Link to="/additem" id="nav--font" className="nav-link"><MdAddBox />Add Item</Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <button onClick={() => handleLogout()} id="nav--font" className='nav-link'>Logout</button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;