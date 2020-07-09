import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Nav, NavItem, NavLink, Navbar, NavbarBrand, Button } from "reactstrap";
import logo from "../starsalelogo.png"

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    const {
      logged_in,
      sign_in_route,
      sign_out_route,
      current_user,
      apiKey
    } = this.props;


    return (
      <>
        <footer>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/"><img src={ logo } width="200px"/></NavbarBrand>
            <Nav className="nav-bar ml-auto">
              <NavItem>
                <NavLink to="/about" tag={Link} className="ml-auto">
                  About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" tag={Link} className="ml-auto">
                  See All Sales
                </NavLink>
              </NavItem>

              {logged_in && (
                <NavItem>
                  <NavLink to="/newsale" tag={Link} className="ml-auto">
                    Post a New Sale
                  </NavLink>
                </NavItem>
              )}
              {logged_in && (
                <NavItem>
                  <NavLink to="/myaccount/" tag={Link} className="ml-auto">
                    Account Details
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </Navbar>
        </footer>
      </>
    );
  }
}

export default Footer;
