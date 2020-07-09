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
import icon from "../starsaleicon.png"
import iconOutline from "../starsaleiconoutline2.png"

class ShowSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sale: [],
      deletesuccess: false,
      update: false,
      favorited: false,
      favId: "",
      faveSales:[]
    };
    this.getSale();
  }
  componentDidMount() {
    this.getSale();
  }
  async getSale(props) {
    const { id } = this.props.match.params;

    try {
      if (this.props.current_user.id !== 0) {
        // Fetch JSON of favorites specific to current user
        let favResponse = await fetch("/favorite");
        let favData = await favResponse.json();
        // Declare array to hold only favorited apt ids to be used in both if-statements below
        let favAptIdsArray;
        if (favResponse.ok) {
          console.log("favData:", favData);
          favData.map((favorite) => {
            // Determine the favorite id (for use in favorite delete call) if current apt is currently favorited
            if (favorite.sale_id == this.props.match.params.id) {
              this.setState({ favId: favorite.id });
            }
          });
          // Create array of just the ids of the apts favorited by current user
          favAptIdsArray = favData.map((value) => value.sale_id);
          this.setState({faveSales:favAptIdsArray})
          console.log("favAptIdsArray:", favAptIdsArray);
        }
      }

      fetch(`/sales/${id}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((saleJSON) => {
          console.log("test saleJSon", saleJSON);
          this.setState({ sale: saleJSON });
          if (this.state.faveSales.includes(saleJSON.id)) {
            this.setState({ favorited: true });
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

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
    console.log(this.props.match.params.id, this.props.current_user.id);
    let fave = {
      sale_id: this.props.match.params.id,
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
          // If favorite post request is successful, set favorited to true
          this.setState({ favorited: true });
        }
      })
      .then(() => {
        // Call the sale API call again to update frontend data
        this.getSale();
      });
  };

  // Delete apt id from favorited from Favorite model
  removeFromFavorites = () => {
    fetch(`/favorite/${this.state.favId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // If favorite delete request is successful, set favorited to false
          this.setState({ favorited: false });
        }
      })
      .then(() => {
        // Call the apartment API call again to update frontend data
        this.getSale();
      });
  };

  // On click for the follow/following button
  handleFavorite = (e) => {
    e.preventDefault();
    console.log(this.props.current_user.id, this.state.sale.id);
    if (this.state.favorited === false) {
      this.addToFavorites();
    } else this.removeFromFavorites();
  };

  updateRedirect = () => {
    this.setState({ update: true });
  };

  render() {
    let { sale } = this.state;
    const { current_user } = this.props;
    return (
      <>
        <Container className="form-container">
        <h2 className="sale-name">{sale.title}</h2>
          <div className="row row-1">
            <div className="col-6">
              <div>
                <div className="star-div">
                        {this.state.favorited && <button onClick={(e)=>{this.handleFavorite(e)}} className="star-button"><img src={icon} className="star-fave"/></button>}
                        {!this.state.favorited && <button onClick={(e)=>{this.handleFavorite(e)}} className="star-button"><img src={iconOutline} className="star-fave"/></button>}
                </div>
                  <img src={sale.img} className="sale-img" />
                </div>
              </div>  
                <div className="col-6 text">
                <div className="smaller-text"><span>Address:</span> {sale.address}
                    {" "}
                    {sale.city}, {sale.state} {sale.zip}
                  </div>
                  <div className="underline smaller-text">
                    <span>Payment type:</span> {sale.payment_type}
                  </div>
              
            
              {console.log(current_user, sale.user_id)}
              {current_user.id === sale.user_id && (
                <div className=" button-div">
                  <button className="btn btn-primary sign-in-out b-1" onClick={this.deleteSale}>Delete this Sale</button>
                  {this.state.deletesuccess && <Redirect to="/" />}
                  <button className="btn btn-primary sign-in-out" onClick={this.updateRedirect}>Update Sale</button>
                  {this.state.update && (
                    <Redirect to={`/saleupdate/${sale.id}`} />
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="sale-description">{sale.description}</div>
          
          
        </Container>
      </>
    );
  }
}

export default ShowSale;
