import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AuthenticationService from '../../service/AuthenticationService';

class NavBar extends Component {
  logout() {
    AuthenticationService.logout();
    this.props.updateLoggedIn();
  }
  render() {
    const isUserLoggedIn = this.props.isLoggedInUser;
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">BitCode</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav activeKey={window.location.pathname} className="mr-auto">
              <Nav.Link href="/problems">Problems</Nav.Link>
              <Nav.Link href="/contests">Contests</Nav.Link>
            </Nav>
            { 
              !isUserLoggedIn ? (
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link eventKey={2} href="/signup">
                  Sign Up
                </Nav.Link>
              </Nav>
              ) : (<Button onClick={this.logout.bind(this)} variant="outline-primary">Logout</Button>)
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;