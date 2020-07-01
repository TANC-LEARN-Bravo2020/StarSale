import React from "react"
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Container, Label, Input } from 'reactstrap'




  class AllSales extends React.Component {
    constructor (props) {
      super (props)
      this.state = {
        allSales:[],
        form:{
          date: ""
        }
      }
      this.getSales()
    }

  componentDidMount(){
    this.getSales()
  }

  handleChange = (event) => {
    let {form} = this.state
    form[event.target.name]= event.target.value
    this.setState({form: form})
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
    <Container>
      <Form>
        <FormGroup>
            <Label for="date">Find sales on or after a date:</Label>
            <Input type="date" name="date" id="date" placeholder="" value={ this.state.form.date } onChange={ this.handleChange} />
        </FormGroup>
      </Form>
    </Container>
    <div className="all-sales">
      <div className="card-list">
        { this.state.allSales.map((sale, index) => {
          console.log(sale.date)
          if (new Date(sale.date) - new Date(this.state.form.date) >= 0 || this.state.form.date === "") {
            return(

              <div className="card" >
              <img src={sale.img} className="card-img-top"></img>

                <div className="card-body">
                  <h5 className="card-title">{ sale.title }</h5>
                  <p className="card-text">{sale.address}, {sale.city}</p>
                  <p className="card-text">Sale Date: {sale.date}</p>
                  <a href={`/saleview/${sale.id}`} className="btn btn-primary card-btn">More Info</a>
                </div>
              </div>

            )
          }
        })}
        </div>
      </div>
    </>
  );
}
}


export default AllSales
