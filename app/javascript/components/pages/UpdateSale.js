import React from "react"
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap'
import {Redirect} from 'react-router-dom'


class UpdateSale extends React.Component {
  constructor(props){
    super(props)
    this.state={
        form:{
            address:"", 
            city:"", 
            state:"", 
            zip:"", 
            date:"", 
            duration:"", 
            title:"", 
            description:"", 
            payment_type:"", 
            img:""
        },
        success:false
    }
    this.getSale()
  }

  componentDidMount(){
    this.getSale()
}
    getSale = (props) => {
        const {id} = this.props.match.params
        fetch(`/sales/${id}`)
        .then((response)=>{
        if(response.status === 200){
            return(response.json())
        }
        })
        .then((saleJSON) => {
        this.setState({form: saleJSON})
        })
    }

  handleChange = (event) => {
    let {form} = this.state
    form[event.target.name]= event.target.value
    this.setState({form: form})
  }
  updateSale = (updatedSale) => {
    const {id} = this.props.match.params

      fetch(`/sales/${id}`, {
        body: JSON.stringify(updatedSale),
        headers:{
          "Content-Type": "application/json"
        },
        method: "PATCH"
      })
      .then((response)=>{
        if(response.status === 200){
          return(response.json())
        }
      })
      .then(() => {
        this.setState({success:true})
      })
  }
  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state.form)
    this.updateSale(this.state.form)
  }
  render () {
    return (
      <>
      <Container>
        <Form>
          <FormGroup>
              <Label for="address">Street Address</Label>
              <Input type="text" name="address" id="address" placeholder="123 Main St" value={ this.state.form.address } onChange={ this.handleChange} />
          </FormGroup>
          <FormGroup>
              <Label for="city">City</Label>
              <Input type="text" name="city" id="city" placeholder="Townsville"value={ this.state.form.city } onChange={ this.handleChange}  />
          </FormGroup>
          <FormGroup>
              <Label for="state">State</Label>
              <Input type="text" name="state" id="state" placeholder="NY" value={ this.state.form.state } onChange={ this.handleChange} />
          </FormGroup>
          <FormGroup>
              <Label for="zip">Zip Code</Label>
              <Input type="text" name="zip" id="zip" placeholder="10101" value={ this.state.form.zip } onChange={ this.handleChange}  />
          </FormGroup>
          <FormGroup>
              <Label for="country">Country</Label>
              <Input type="text" name="country" id="country" placeholder="USA" value={ this.state.form.country } onChange={ this.handleChange} />
          </FormGroup>
          <FormGroup>
              <Label for="date">Sale Date</Label>
              <Input type="date" name="date" id="date" placeholder="" value={ this.state.form.date } onChange={ this.handleChange} />
          </FormGroup>
          <FormGroup>
              <Label for="duration">Duration</Label>
              <Input type="text" name="duration" id="duration" placeholder="9am-5pm" value={ this.state.form.duration } onChange={ this.handleChange} />
          </FormGroup>
          <FormGroup>
              <Label for="title">Sale Name</Label>
              <Input type="text" name="title" id="title" placeholder="Toys and Tools" value={ this.state.form.title } onChange={ this.handleChange} />
          </FormGroup>
          <FormGroup>
              <Label for="description">Description</Label>
              <Input type="textarea" name="description" id="description" placeholder="Tell us about the apartment" value={ this.state.form.description } onChange={ this.handleChange} />
          </FormGroup>
          <FormGroup>
              <Label for="payment_type">Payment Types Accepted</Label>
              <Input type="text" name="payment_type" id="payment_type" placeholder="Cash and Venmo" value={ this.state.form.payment_type } onChange={ this.handleChange} />
          </FormGroup>
          <FormGroup>
              <Label for="img">Picture URL</Label>
              <Input type="url" name="img" id="state" value={ this.state.form.img } onChange={ this.handleChange} />
              <FormText>Please paste the url of an image of your apartment from an external source website such as Flickr or Imgur</FormText>
          </FormGroup>
          <Button onClick={this.handleSubmit} type="submit">Submit</Button>
          {this.state.success &&
          <Redirect to="/" />
            }
        </Form>
      </Container>
      </>
    );
  }
}

export default UpdateSale