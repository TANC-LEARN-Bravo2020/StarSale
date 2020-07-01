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
    <div className="all-sales">
      <div className="card-list">
        { this.state.allSales.map((sale, index) => {
            return(
      
              <div className="card" >
              <img src={sale.img} className="card-img-top"></img>

                <div className="card-body">
                  <h5 className="card-title">{ sale.title }</h5>
                  <p className="card-text">{sale.address}, {sale.city}</p>
                  <a href={`/saleview/${sale.id}`} className="btn btn-primary card-btn">More Info</a>
                </div>
              </div>
              
            )
        })}
        </div>
      </div>
    </>
  );
}
} 


export default AllSales