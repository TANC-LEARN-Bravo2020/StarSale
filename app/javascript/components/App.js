import React from "react"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Nav, NavItem, NavLink, Navbar, NavbarBrand, Button } from 'reactstrap'
import AllSales from "./pages/AllSales"
import SaleForm from "./pages/SaleForm"
import ShowSale from "./pages/ShowSale"
import UpdateSale from "./pages/UpdateSale"



class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      allSales:[]
    }
    this.getSales()
  }

  componentDidMount(){
    this.getSales()
  }

  getSales = () => {
    fetch("/sales")
    .then((response)=>{
      if(response.status ===200){
        return(response.json())
      }
    })
    .then((saleArray) => {
      this.setState({allSales: saleArray})
    })
  }
  render () {
    const {
      logged_in,
      sign_in_route,
      sign_out_route
    } = this.props
    return (
      <Router>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">StarSale</NavbarBrand>
          <Nav className="nav-bar">
            <NavItem>
              <NavLink to="/" tag={ Link }>See All Sales</NavLink>
            </NavItem>
          
          {logged_in &&
            <NavItem>
              <NavLink to="/newsale" tag={ Link }>Post a New Sale</NavLink>
            </NavItem>
          }
          {!logged_in &&
            <NavItem>
              <a href={sign_in_route} tag={ Link } className="btn btn-primary float-right">Sign In</a>
            </NavItem>
          }
          {logged_in &&
            <NavItem>
                <a href={sign_out_route} tag={ Link } className="btn btn-primary float-right">Sign Out</a>
            </NavItem>
          }
          </Nav>
        </Navbar>
        <Route exact path="/newsale/" component={ SaleForm }/>
        <Route exact path="/" render={ props => <AllSales allSales={this.state.allSales}/> } />   
        <Route exact path="/saleview/:id" render={ (props) => <ShowSale {...props} getSales={this.getSales}/> } />  
        <Route exact path="/saleupdate/:id" render={ (props) => <UpdateSale {...props} getSales={this.getSales}/> } />  
      </Router>
    );
  }
}

export default App