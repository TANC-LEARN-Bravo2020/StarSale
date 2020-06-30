import React from "react"
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Link } from 'reactstrap'



  class UserAccount extends React.Component {
    constructor (props) {
      super (props)
      this.state = {
        allSales:[]
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
       <a href="/users/edit"
                  tag={Link}
                  className="btn btn-primary"
                >
                  Update Account Info
                </a>

      { this.state.allSales.map((sale, index) => {
          if(current_user.id === sale.user_id)
          return(
            <div>
            <Card key= { index }>
              <CardImg src={sale.img} alt="Card image cap" className="card-img" />
              <CardBody>
                <CardTitle>{ sale.title }</CardTitle>
                <CardSubtitle>{sale.address}, {sale.city}</CardSubtitle>
                <Button href={`/saleview/${sale.id}`}>View More Info</Button>
                <div>
                    <button onClick={this.deleteSale}>Delete this Sale</button>
                    {this.state.deletesuccess && <Redirect to="/" />}
                    <button onClick={this.updateRedirect}>Update Sale</button>
                    {this.state.update && <Redirect to={`/saleupdate/${sale.id}`} />}
                </div>
              </CardBody>
            </Card>
            </div>
          )
      })}
      </Container>
    </>
  );
}
}


export default UserAccount