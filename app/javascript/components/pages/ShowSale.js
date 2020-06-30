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
    };
    this.getSale();
  }
  componentDidMount() {
    this.getSale();
  }
  getSale = (props) => {
    const { id } = this.props.match.params;
    fetch(`/sales/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((saleJSON) => {
        this.setState({ sale: saleJSON });
      });
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

  updateRedirect = () => {
    this.setState({ update: true });
  };

  render() {
    let { sale } = this.state;
    const { current_user } = this.props;
    return (
      <>
        <h2>{sale.title}</h2>
        <h4>Address: {sale.address},</h4>
        <h4>
          {" "}
          {sale.city}, {sale.state} {sale.zip}
        </h4>
        <h4>Payment Type: {sale.payment_type}</h4>
        <img src={sale.img} className="card-img" />
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
      </>
    );
  }
}

export default ShowSale;
