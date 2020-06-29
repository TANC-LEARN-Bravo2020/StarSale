import React from "react"
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap'



const AllSales = (props) => {
  

  return (
    <>
      { props.allSales.map((sale, index) => {
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


export default AllSales