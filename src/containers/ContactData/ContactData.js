import React, { Component } from "react";
import classes from "./ContactData.css";
import Button from "../../components/UI/Button/Button";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../Store/Action/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { checkValidity } from "../../Shared/Utility";

class ContactData extends Component {
  state = {
    OrderForm: {
      Name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 10
        },
        isValid: false,
        touched: false,
        message: "length should be between 4 to 10 and only character"
      },
      Email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 30,
          isEmail: true
        },
        isValid: false,
        touched: false,
        message: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "street"
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 10
        },
        isValid: false,
        touched: false,
        message: "length should be between 4 to 10 and only character"
      },
      postalcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Posatal code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 10,
          isNumeric: true
        },
        isValid: false,
        touched: false,
        message: "length should be between 4 to 10 and only numbers"
      },
      Delivery: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", display: "fastest" },
            { value: "cheapest", display: "cheapest" }
          ]
        },
        value: "fastest",
        isValid: true,
        touched: false
      }
    },
    formValid: false
  };

  inputChangeHandler = (event, FormDataIdentifier) => {
    const updatedFormData = { ...this.state.OrderForm };
    const IndividualData = { ...updatedFormData[FormDataIdentifier] };
    IndividualData.value = event.target.value;
    if (IndividualData.validation) {
      IndividualData.isValid = checkValidity(
        IndividualData.value,
        IndividualData.validation
      );
    }

    IndividualData.touched = true;
    updatedFormData[FormDataIdentifier] = IndividualData;

    let formvalid = true;
    for (let key in updatedFormData) {
      formvalid = updatedFormData[key].isValid && formvalid;
    }
    this.setState({ OrderForm: updatedFormData, formValid: formvalid });
  };

  placeOrderHandler = () => {
    this.props.onPurchaseStart();
    let customerdata = {};

    for (let formidentifier in this.state.OrderForm) {
      customerdata[formidentifier] = this.state.OrderForm[formidentifier].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      customerdata: customerdata,
      UserId: this.props.userId
    };
    this.props.onPurchaseBurger(order, this.props.token);
  };
  render() {
    let formdata = [];

    for (let key in this.state.OrderForm) {
      formdata.push({
        id: key,
        config: this.state.OrderForm[key]
      });
    }

    let form = (
      <form>
        {formdata.map(data => (
          <Input
            key={data.id}
            elementtype={data.config.elementType}
            elementconfig={data.config.elementConfig}
            value={data.config.value}
            changed={event => this.inputChangeHandler(event, data.id)}
            valid={data.config.isValid}
            touched={data.config.touched}
            message={data.config.message}
          ></Input>
        ))}

        <Button
          disabled={!this.state.formValid}
          btnType="Success"
          clicked={this.placeOrderHandler}
        >
          PLACE ORDER
        </Button>
      </form>
    );

    if (this.props.loading) form = <Spinner></Spinner>;
    return (
      <div className={classes.contactdata}>
        <h1>Enter Your contact Info</h1>
        {form}
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    ings: state.BurgerbuilderReducer.ingredients,
    price: state.BurgerbuilderReducer.price,
    loading: state.orderReducer.loading,
    token: state.AuthReducer.idtoken,
    userId: state.AuthReducer.userId
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onPurchaseBurger: (orderdata, token) =>
      dispatch(actions.purchaseBurger(orderdata, token)),
    onPurchaseStart: () => dispatch(actions.purchaseBurgerStart())
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(withErrorHandler(ContactData, axios));
