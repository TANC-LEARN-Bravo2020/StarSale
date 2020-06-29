import React from "react"
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap'



  class AllSales extends React.Component {
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
  render(){

  return (
    <>
      { this.state.allSales.map((sale, index) => {
          return(
            <div>
            <Card key= { index }>
              <CardImg src={sale.img} alt="Card image cap" className="card-img" />
              <CardBody>
                <CardTitle>{ sale.title }</CardTitle>
                <CardSubtitle>{sale.address}, {sale.city}</CardSubtitle>
                <Button href={`/saleview/${sale.id}`}>View More Info</Button>
              </CardBody>
            </Card>
            </div>
          )
      })}
    </>
  );
}
}


export default AllSales