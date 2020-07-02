import React from "react"
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Container, Label, Input } from 'reactstrap'




  class AllSales extends React.Component {
    constructor (props) {
      super (props)
      this.state = {
        allSales:[],
        form:{
          startdate: new Date(),
          enddate: "",
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
      this.setState({allSales: saleArray.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return a<b ? -1 : a>b ? 1 : 0;
    })})
      console.log(this.state.allSales)
    })
  }    

  render(){
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <>
    <Container>
      <Form>
        <FormGroup>
            <Label for="startdate">Start Date:</Label>
            <Input type="date" name="startdate" id="startdate" placeholder="" value={ this.state.form.startdate } onChange={ this.handleChange} />
        </FormGroup>
        <FormGroup>
            <Label for="enddate">End Date:</Label>
            <Input type="date" name="enddate" id="enddate" placeholder="" value={ this.state.form.enddate } onChange={ this.handleChange} />
        </FormGroup>
      </Form>
    </Container>
    <div className="all-sales">
      <div className="card-list">
        { this.state.allSales.map((sale, index) => {
          console.log("sale date - start date", new Date(sale.date) - new Date(this.state.form.startdate))

          if (new Date(sale.date) - new Date(this.state.form.startdate) >= 0 
          &&  (
          (new Date(sale.date)-new Date(this.state.form.enddate) <= 0) 
          || 
          this.state.form.enddate === "")) {
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
