import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Nav, NavItem, NavLink, Navbar, NavbarBrand, Button } from "reactstrap";
import AllSales from "./pages/AllSales";
import SaleForm from "./pages/SaleForm";
import ShowSale from "./pages/ShowSale";
import UpdateSale from "./pages/UpdateSale";
import UserAccount from "./pages/UserAccount";
import Footer from "./pages/Footer";
import About from "./pages/About";
import logo from "./starsalelogo.png"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allSales: [],
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
      <Router>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"><img src={ logo } width="200px"/></NavbarBrand>
          <Nav className="nav-bar ml-auto">
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
            {!logged_in && (
              <NavItem>
                <a
                  href={sign_in_route}
                  tag={Link}
                  className="btn btn-primary ml-auto sign-in-out"
                >
                  Sign In
                </a>
              </NavItem>
            )}
            {!logged_in && (
              <NavItem>
                <a
                  href="/users/sign_up"
                  tag={Link}
                  className="btn btn-primary ml-auto sign-in-out"
                >
                  Sign Up
                </a>
              </NavItem>
            )}
            {logged_in && (
              <NavItem>
                <a
                  href={sign_out_route}
                  tag={Link}
                  className="btn btn-primary ml-auto sign-in-out"
                >
                  Sign Out
                </a>
              </NavItem>
            )}
          </Nav>
        </Navbar>
        <Route path="/newsale/" render={(props) => (
          <div className="page-container">
            <div className="content-wrap">
              <SaleForm {...props} apiKey={this.props.apiKey} />
            </div>
            <Footer current_user={this.props.current_user} logged_in={this.props.logged_in} sign_in_route={this.props.sign_in_route} sign_out_route={this.props.sign_out_route}/>
          </div>
        )} />
        <Route
        exact path="/"
        render={(props) => (
          <div className="page-container">
            <div className="content-wrap">
              <AllSales {...props} current_user={this.props.current_user} />
            </div>
            <Footer {...props} current_user={this.props.current_user} logged_in={this.props.logged_in} sign_in_route={this.props.sign_in_route} sign_out_route={this.props.sign_out_route}/>
          </div>
        )} />

        <Route exact path="/saleupdate/:id" render={(props) => (
          <div className="page-container">
            <div className="content-wrap">
              <UpdateSale {...props} apiKey={this.props.apiKey} />
            </div>
            <Footer {...props} current_user={this.props.current_user} logged_in={this.props.logged_in} sign_in_route={this.props.sign_in_route} sign_out_route={this.props.sign_out_route}/>
          </div>
        )} />

        <Route
          exact path="/saleview/:id"
          render={(props) => (
            <div className="page-container">
              <div className="content-wrap">
                <ShowSale {...props} current_user={this.props.current_user} />
              </div>
              <Footer {...props} current_user={this.props.current_user} logged_in={this.props.logged_in} sign_in_route={this.props.sign_in_route} sign_out_route={this.props.sign_out_route}/>
            </div>
          )}
        />
        <Route
        path="/myaccount/"
        render={(props) => (
          <div className="page-container">
            <div className="content-wrap">
              <UserAccount {...props} current_user={this.props.current_user} />
            </div>
            <Footer {...props} current_user={this.props.current_user} logged_in={this.props.logged_in} sign_in_route={this.props.sign_in_route} sign_out_route={this.props.sign_out_route}/>
          </div>
        )}
        />
        <Route
        path="/about/"
        render={(props) => (
          <div className="page-container">
            <div className="content-wrap">
              <About {...props} current_user={this.props.current_user} />
            </div>
            <Footer {...props} current_user={this.props.current_user} logged_in={this.props.logged_in} sign_in_route={this.props.sign_in_route} sign_out_route={this.props.sign_out_route}/>
          </div>
        )}
        />
        {/*<Footer />*/}
      </Router>
    );
  }
}

export default App;
