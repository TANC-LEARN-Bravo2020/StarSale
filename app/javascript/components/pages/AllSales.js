import React from "react"
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Container, Label, Input } from 'reactstrap'
import icon from "../starsaleicon.png"
import iconOutline from "../starsaleiconoutline2.png"




  class AllSales extends React.Component {
    constructor (props) {
      super (props)
      this.state = {
        allSales:[],
        form:{
          startdate: new Date(),
          enddate: "",
        },
        userLat:"",
        userLong:""
      }
      this.getSales()
    }

  componentDidMount(){
    this.getSales()
    this.getLocation()

  }
  setPosition = (position) => {
    this.setState({userLat:position.coords.latitude, userLong:position.coords.longitude})
  }

  getLocation = () => {
    let loc = document.getElementById("userlocation")
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition);
    } else {
      loc.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  handleChange = (event) => {
    let {form} = this.state
    form[event.target.name]= event.target.value
    this.setState({form: form})
  }

  distance = (lat1, lon1, lat2, lon2, unit) => {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
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
    const { current_user } = this.props;

  return (
    <>
    <Container>
      <p id="userlocation"></p>
      <Form className="row">
        <FormGroup className="col-sm">
            <Label for="startdate">Start Date:</Label>
            <Input type="date" name="startdate" id="startdate" placeholder="" value={ this.state.form.startdate } onChange={ this.handleChange} />
        </FormGroup>
        <FormGroup className="col-sm">
            <Label for="enddate">End Date:</Label>
            <Input type="date" name="enddate" id="enddate" placeholder="" value={ this.state.form.enddate } onChange={ this.handleChange} />
        </FormGroup>
        <FormGroup className="col-sm">
        <Label for="exampleSelect">Distance:</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>5 miles</option>
          <option>10 miles</option>
          <option>20 miles</option>
          <option>50 miles</option>
          <option>100 miles</option>
        </Input>
      </FormGroup>
      <FormGroup className="col-sm">
        <Label for="exampleSelect">Sort By:</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>Date</option>
          <option>Distance</option>
        </Input>
      </FormGroup>
      </Form>
    </Container>
    <div className="all-sales">
      <div className="card-list">
        { this.state.allSales.map((sale, index) => {
          let distance = this.distance(this.state.userLat, this.state.userLong, sale.latitude, sale.longitude, "M").toFixed(1)

          console.log(distance, "distance", sale.latitude, "sale - latitude")

          if (new Date(sale.date) - new Date(this.state.form.startdate) >= 0
          &&  (
          (new Date(sale.date)-new Date(this.state.form.enddate) <= 0)
          ||
          this.state.form.enddate === ""))
          {
            return(

              <div className="card" >
                <a href={`/saleview/${sale.id}`} style={{ textDecoration: 'none' }}>
                {/* Conditional render for "your sale to show on sales you own" */}
                {current_user.id === sale.user_id && <div className="corner-shadow"><p className="your-sale"> This is your sale.</p></div>}
                {/* Div containing our star button to add to faves */}
                <div className="star-div">
                  <button className="star-button"><img src={iconOutline} className="star-fave"/></button>
                </div>
              <img src={sale.img} className="card-img-top"></img>

                <div className="card-body">
                  <p className="card-text sale-date">{sale.date} - {distance} mi</p>
                  <h5 className="card-title sale-title">{ sale.title }</h5>
                  <p className="card-text sale-address">{sale.address}, {sale.city}</p>


                  {/* <a href={`/saleview/${sale.id}`} className="btn btn-primary card-btn">More Info</a> */}
                </div>
                </a>
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
