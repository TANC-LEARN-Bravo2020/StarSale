import React from "react"
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap'
import {Redirect} from 'react-router-dom'


class SaleForm extends React.Component {
  constructor(props){
    super(props)
    this.state={
      form:{
          address:undefined,
          city:undefined,
          state:undefined,
          zip:undefined,
          date:undefined,
          duration:undefined,
          title:undefined,
          description:undefined,
          payment_type:undefined,
          img:"",
          latitude:undefined,
          longitude:undefined
      },
      success:false,
      requiredFields:["address", "city", "state", "zip", "date", "duration", "title", "description", "payment_type"],
      hasError:null
    }
  }

  handleChange = (event) => {
    let { form } = this.state
    form[event.target.name]= event.target.value
    console.log("::HANDLE CHANGE::", form)
    this.setState({form: form})
  }

  pushSale = (newSale) => {
    console.log("CALLING PUSHSALE! new sale", newSale)
    fetch("/sales", {
      body: JSON.stringify(newSale),
      headers:{
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then((response)=>{
      if(response.status === 200){
        this.setState({success:true})
        return(response.json())
      } else {
        throw new Error("unfilled fields")
      }
    })
    .catch(err => console.log(err))
  }

  handleSubmit = async e => {
    e.preventDefault()
    let latlongform = await this.fetchLatLong()
    console.log(latlongform)
    if(latlongform.img === ""){
      latlongform.img = "https://i.imgur.com/4gk26cn.png"
    }
    let checkrequired = this.state.requiredFields.map(field=> {
      console.log(this.state.form[field])
      return this.state.form[field] === undefined
      })
      console.log("checkrequired", checkrequired, checkrequired.includes(true))
    if(checkrequired.includes(true)){
      this.setState({hasError: true})
    } else {
      this.pushSale(latlongform)
    }
  }


  fetchLatLong = () => {
    // console.log("API KEY", this.props.apiKey)
    return fetch(`http://api.positionstack.com/v1/forward?access_key=${this.props.apiKey}&query=${this.state.form.address},${this.state.form.city}${this.state.form.state}`)
      .then((response)=>{
        console.log("response status:",response.status)
        if(response.status === 200){
        }
        return(response.json())
      })
      .then((response)=>{
        console.log(response.data[0])
        let {form} = this.state
        console.log("the form before lat and long added", form)
        form.latitude = response.data[0].latitude
        form.longitude = response.data[0].longitude
        console.log("does it save lat long?", form)
        return form
      })
      .catch(err => console.log(err))
  }

  render () {
    let { address, title, city, description, state, date, zip, duration, payment_type, img } = this.state.form
    return (
      <div className="form-page">
      <Container className="form-container">
        <h2 className="page-header">Create a New Sale</h2>
        <Form className="row">
          <FormGroup className="col-sm">
              <Label for="address">Street Address*</Label>
              <Input type="text" name="address" id="address" required placeholder="123 Main St" value={address} onChange={ this.handleChange} />
          </FormGroup>
          <FormGroup className="col-sm">
              <Label for="title">Sale Name*</Label>
              <Input type="text" name="title" id="title" required placeholder="Toys and Tools" value={title} onChange={ this.handleChange} />
          </FormGroup>
        </Form>
        <Form className="row">
          <FormGroup className="col-sm">
              <Label for="city">City*</Label>
              <Input type="text" name="city" id="city" required placeholder="Townsville"value={city} onChange={ this.handleChange}  />
          </FormGroup>
          <FormGroup className="col-sm">
              <Label for="description">Description*</Label>
              <Input type="textarea" name="description"  required id="description" placeholder="Tell us about the items you'll be selling - be as descriptive as possible so people will come by!" value={description } onChange={ this.handleChange} />
          </FormGroup>
        </Form>
        <Form className="row">
          <FormGroup className="col-sm">
              <Label for="state">State*</Label>
              <Input type="text" name="state" id="state" required placeholder="NY" value={state} onChange={ this.handleChange} />
          </FormGroup>
          <FormGroup className="col-sm">
              <Label for="date">Sale Date*</Label>
              <Input type="date" name="date" id="date" required placeholder="" value={date} onChange={ this.handleChange} />
          </FormGroup>
        </Form>
        <Form className="row">
          <FormGroup className="col-sm">
              <Label for="zip">Zip Code*</Label>
              <Input type="text" name="zip" id="zip" required placeholder="10101" value={zip} onChange={ this.handleChange}  />
          </FormGroup>
          <FormGroup className="col-sm">
              <Label for="duration">Duration*</Label>
              <Input type="text" name="duration" id="duration" required placeholder="9am-5pm" value={duration} onChange={ this.handleChange} />
          </FormGroup>
         </Form>
         <Form className="row">

          <FormGroup className="col-sm">
              <Label for="payment_type">Payment Types Accepted*</Label>
              <Input type="text" name="payment_type" id="payment_type" required placeholder="Cash and Venmo" value={payment_type} onChange={ this.handleChange} />
          </FormGroup>
          <FormGroup className="col-sm">
              <Label for="img">Picture URL</Label>
              <Input type="url" name="img" id="state" value={img} onChange={ this.handleChange} />
              <FormText>Please paste the url of an image of your items for sale from an external source website such as Flickr or Imgur</FormText>
          </FormGroup>
          </Form>
          <FormText>* indicates a required field.</FormText>
          {this.state.hasError && <p>Please fill out all required fields</p>}
          <Button onClick={this.handleSubmit} type="submit">Submit</Button>
          {this.state.success &&
            <Redirect to="/" />
          }
      </Container>
      </div>
    );
  }
}

export default SaleForm
