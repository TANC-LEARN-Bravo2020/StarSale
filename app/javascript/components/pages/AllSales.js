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
        userLong:"",
        sort:"Date",
        flag:false,
        distanceFilter:"1000000",
        favedArray:[],
        faveJSON:[],
      }
    }

  componentDidMount(){
    this.handlePageLoad()
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

  handleSortChange = (event) => {
    this.setState({sort: event.target.value});
  }

  handleDistanceChange = (event) => {
    this.setState({distanceFilter: event.target.value});
  }

  distanceCalc = (lat1, lon1, lat2, lon2, unit) => {
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

  handlePageLoad = () =>{
    if (this.props.current_user.id !== 0){
        this.getFaves()
    }
    this.getSales()
  }



  async getFaves(){
    try{
        let favResponse = await fetch("/favorite");
        let favData = await favResponse.json();
        let favSalesIdsArray = favData.map((value) => value.sale_id);
        this.setState({
            favedArray: favSalesIdsArray, 
            faveJSON: favData
        })
    } catch (err) {
        console.log(err);
    } 
  }

  async getSales(){
    try{
        let salesResponse = await fetch("/sales");
        let salesData = await salesResponse.json();
        let sortedSales = salesData.sort((a, b) => {
            let c = new Date(a.date);
            let d = new Date(b.date);
            return c<d ? -1 : c>d ? 1 : 0;
        })
        this.setState({allSales: sortedSales})
    } catch (err) {
        console.log(err);
    }
  }

handleFavorite = (e, id) => {
  e.preventDefault();
  // console.log(this.props.current_user.id, id);
  if (this.state.favedArray.includes(id)) {
    this.removeFromFavorites(id);
  } else this.addToFavorites(id);
};

addToFavorites = (id) => {
  let fave = {
    sale_id: id,
    user_id: this.props.current_user.id,
  };
  fetch("/favorite", {
    body: JSON.stringify({ favorite: fave }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((response) => {
      if (response.ok) {
        this.handlePageLoad();
      }
    })
};

// Delete apt id from favorited from Favorite model
removeFromFavorites = (id) => {
  let favId = this.state.faveJSON.filter(favorite =>{
    if (favorite.sale_id === id) {
      return favorite
    }
  })[0].id
  console.log("favID", favId)
  fetch(`/favorite/${favId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        this.handlePageLoad()
      }
    })
};

  distanceSort = (userLat,userLong) =>  {
    if (this.state.flag === false)  {
      let newArray = this.state.allSales.slice().sort((a, b) => {
        let c = this.distanceCalc(userLat, userLong, a.latitude, a.longitude, "M")
        let d = this.distanceCalc(userLat, userLong, b.latitude, b.longitude, "M")
        return c<d ? -1 : c>d ? 1 : 0;
      })
      this.setState({
        allSales: newArray,
        flag: true
      })
    }
  }

  timeSort = () =>  {
    if (this.state.flag === true) {
      this.setState({
        allSales: this.state.allSales.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return a<b ? -1 : a>b ? 1 : 0;
        }),
      flag:false
      })
    }
  }

  render(){
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const { current_user } = this.props;
    if (this.state.sort === "Date") {
      this.timeSort()
    }
    if (this.state.sort === "Distance") {
      this.distanceSort(this.state.userLat, this.state.userLong)
    }
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
        <Input type="select" name="select" id="exampleSelect" onChange={this.handleDistanceChange} value={this.state.distanceFilter}>
          <option value="1000000">any distance</option>
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="20">20 miles</option>
          <option value="50">50 miles</option>
          <option value="100">100 miles</option>
        </Input>
      </FormGroup>
      <FormGroup className="col-sm">
        <Label for="exampleSelect">Sort By:</Label>
        <Input type="select" name="select" id="exampleSelect" onChange={this.handleSortChange} value={this.state.sort}>
          <option value="Date">Date</option>
          <option value="Distance">Distance</option>
        </Input>
      </FormGroup>
      </Form>
    </Container>
    <div className="all-sales">
      <div className="card-list">
        { this.state.allSales.map((sale, index) => {
          let distance = this.distanceCalc(this.state.userLat, this.state.userLong, sale.latitude, sale.longitude, "M").toFixed(1)

          if (new Date(sale.date) - new Date(this.state.form.startdate) >= 0
          &&  (
          (new Date(sale.date)-new Date(this.state.form.enddate) <= 0)
          && (distance < parseInt(this.state.distanceFilter))
          ||
          (this.state.form.enddate === "" && distance < parseInt(this.state.distanceFilter))))
          {
            return(


                <div className="card" key={index}>
                  <a href={`/saleview/${sale.id}`} style={{ textDecoration: 'none' }}>
                  {/* Conditional render for "your sale to show on sales you own" */}
                  {current_user.id === sale.user_id && <div className="corner-shadow"><p className="your-sale"> This is your sale.</p></div>}
                  {/* Div containing our star button to add to faves */}
                  <div className="star-div">
                    {this.state.favedArray.includes(sale.id) && <button onClick={(e)=>{this.handleFavorite(e, sale.id)}} className="star-button"><img src={icon} className="star-fave"/></button>}
                    {!this.state.favedArray.includes(sale.id) && <button onClick={(e)=>{this.handleFavorite(e, sale.id)}} className="star-button"><img src={iconOutline} className="star-fave"/></button>}
                  </div>
                <img src={sale.img} className="card-img-top"></img>

                  <div className="card-body">
                    <p className="card-text sale-date">{sale.date} - {distance} mi</p>
                    <h5 className="card-title sale-title">{ sale.title }</h5>
                    <p className="card-text sale-address">{sale.address}, {sale.city}</p>
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
