import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
} from "reactstrap";
import { Redirect } from "react-router-dom";

class ShowSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sale: [],
      deletesuccess: false,
      update: false,
      favorited:false,
      favId:""
    };
    this.getSale();
  }
  componentDidMount() {
    this.getSale();
  }
  async getSale (props){
    const { id } = this.props.match.params;
    try {
      // Fetch JSON of favorites specific to current user
      let favResponse = await fetch("/favorite")
      let favData = await favResponse.json()
      // Declare array to hold only favorited apt ids to be used in both if-statements below
      let favAptIdsArray
      if(favResponse.ok) {
        console.log("favData:", favData)
        favData.map(favorite=> {
          // Determine the favorite id (for use in favorite delete call) if current apt is currently favorited
          if (favorite.sale_id == this.props.match.params.id) {
            this.setState({favId:favorite.id})
          }
        })
        // Create array of just the ids of the apts favorited by current user
        favAptIdsArray = favData.map(value=>value.sale_id)
        console.log("favAptIdsArray:",favAptIdsArray)
      }
    
    fetch(`/sales/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((saleJSON) => {
        this.setState({ sale: saleJSON });
        if (favAptIdsArray.includes(saleJSON.id)) {
          this.setState({favorited:true})}
      });
  }catch (err) {
    console.log(err)
  }
};

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

  addToFavorites = () => {
    console.log(this.props.match.params.id, this.props.current_user.id)
    let fave = {sale_id: this.props.match.params.id, user_id:this.props.current_user.id}
    fetch("/favorite", {
      body: JSON.stringify({favorite: fave}),
      headers:{
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then(response => {
      if (response.ok) {
        // If favorite post request is successful, set favorited to true
        this.setState({favorited: true})
      }
    })
    .then(() => {
      // Call the sale API call again to update frontend data
      this.getSale()
    })
  }

  // Delete apt id from favorited from Favorite model
  removeFromFavorites = () => {
    fetch(`/favorite/${this.state.favId}`, {
      headers:{
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
    .then(response => {
      if (response.ok) {
        // If favorite delete request is successful, set favorited to false
        this.setState({favorited: false})
      }
    })
    .then(() => {
      // Call the apartment API call again to update frontend data
      this.getSale()
    })
  }

  // On click for the follow/following button
  handleFavorite = (e) => {
    e.preventDefault()
    console.log(this.props.current_user.id, this.state.sale.id)
    if (this.state.favorited === false){
      this.addToFavorites()
    } 
    else this.removeFromFavorites()
  }


  updateRedirect = () => {
    this.setState({ update: true });
  };

  render() {
    let { sale } = this.state;
    const { current_user } = this.props;
    return (
      <>
        <Container className="form-container">
          <div className="row">
          <div className="col-6">
            <img src={sale.img} className="sale-img" />
            <button onClick={(e)=>this.handleFavorite(e)}>Fave!</button>
            {this.state.favorited && <p>FAVED! IT WORKS</p>}
          </div>
          <div className="col-6">
            <h2>{sale.title}</h2>
            <h4>Address: {sale.address},</h4>
            <h4>
              {" "}
              {sale.city}, {sale.state} {sale.zip}
            </h4>
            <h4>Payment Type: {sale.payment_type}</h4>
            <p>{sale.description}</p>
            {console.log(current_user, sale.user_id)}
            {current_user.id === sale.user_id && (
              <div>
                <button onClick={this.deleteSale}>Delete this Sale</button>
                {this.state.deletesuccess && <Redirect to="/" />}
                <button onClick={this.updateRedirect}>Update Sale</button>
                {this.state.update && <Redirect to={`/saleupdate/${sale.id}`} />}
              </div>
            )}
          </div>
          </div>
        </Container>
      </>
    );
  }
}

export default ShowSale;
