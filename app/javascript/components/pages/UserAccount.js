import React from "react"
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container } from 'reactstrap'
import { Redirect, Link } from "react-router-dom";



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
  deleteSale = (id) => {
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
      <div className="row-user-account">
        <div className="column-left-user-account">
          <h3 className="info-spacing-user-account header-user-account"> User Info </h3>
          <div className="user-div-centering">
            <h6 className="info-spacing-user-account"> Name: {current_user.name}</h6>
            <h6 className="info-spacing-user-account"> Phone: {current_user.phone}</h6>
            <h6 className="info-spacing-user-account"> Email: {current_user.email}</h6>
          </div>
          <a href="/users/edit" tag={Link} className="btn btn-primary">
             Update Account Info
          </a>
        </div>
        <div className="column-right-user-account">
          <h3 className="info-spacing-user-account header-user-account"> Sales Info </h3>
          <Container>
              <div className="card-list">
                { this.state.allSales.map((sale, index) => {
                  if(current_user.id === sale.user_id){
                    return(
                    <div key={index} className="card" >
                      <img src={sale.img} className="card-img-top"></img>
                      <div className="card-body">
                        <h5 className="card-title">{ sale.title }</h5>
                        <p className="card-text">{sale.address}, {sale.city}</p>
                        <div className="card-btn-holder">
                          <a href={`/saleview/${sale.id}`} className="btn btn-primary card-btn">View</a>

                          <a href={`/saleupdate/${sale.id}`} tag={Link} className="btn btn-primary card-btn">Update</a>

                          <button onClick={()=>this.deleteSale(sale.id)} className="btn btn-primary card-btn">Delete</button>
                            {this.state.deletesuccess && <Redirect to="/" />}

                        </div>
                      </div>
                    </div>
                    )
                  }
                })}
               </div>
            </Container>
          </div>
        </div>
    </>
  );
}
}


export default UserAccount
