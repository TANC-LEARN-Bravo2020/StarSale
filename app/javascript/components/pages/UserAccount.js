import React from "react"
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Link } from 'reactstrap'
import { Redirect } from "react-router-dom";



  class UserAccount extends React.Component {
    constructor (props) {
      super (props)
      this.state = {
        allSales:[],
        deletesuccess:false
      }
      this.getSales()
    }

  componentDidMount(){
    this.getSales()
    this.setState({allSales:this.state.allSales.filter(sale => {
        if (sale.user_id === current_user.id){
            return sale
        }
    })})
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
  deleteSale = (props) => {
    const { id } = this.props.match.params;
    fetch(`/sales/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(() => {
        this.setState({ deletesuccess: true });
      });
  };
  render(){
    const { current_user } = this.props;

  return (
    <>
    <Container>
       <h6> Name: {current_user.name}</h6>
       <h6> Phone: {current_user.phone}</h6>
       <h6> Email: {current_user.email}</h6>
       <a href="/users/edit" tag={Link} className="btn btn-primary">
          Update Account Info
        </a>
        <div className="card-list">
          { this.state.allSales.map((sale, index) => {          
            if(current_user.id === sale.user_id){
              return(
              <div className="card" >
                <img src={sale.img} className="card-img-top"></img>
                <div className="card-body">
                  <h5 className="card-title">{ sale.title }</h5>
                  <p className="card-text">{sale.address}, {sale.city}</p>
                  <div className="card-btn-holder">
                    <a href={`/saleview/${sale.id}`} className="btn btn-primary card-btn">View</a>
                    
                    <a href={`/saleupdate/${sale.id}`} tag={Link} className="btn btn-primary card-btn">Update</a>

                    <button onClick={this.deleteSale} className="btn btn-primary card-btn">Delete</button>
                      {this.state.deletesuccess && <Redirect to="/" />}
            
                  </div>
                </div>
              </div>
              )
            }
          })}
      </div>
      </Container>
    </>
  );
}
}


export default UserAccount