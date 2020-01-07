import React, { Component } from "react";
import classes from "./SignUp.css";
import { checkValidity } from "../../../Shared/Utility";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import { connect } from "react-redux";
import * as actions from "../../../Store/Action/Index";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class SignUp extends Component {
  state = {
    AuthForm: {
      Name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name"
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 30
        },
        isValid: false,
        touched: false
      },
      Email: {
        elementType: "input",
        elementConfig: {
          type: "Email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 30,
          isEmail: true
        },
        isValid: false,
        touched: false
      },
      Password: {
        elementType: "input",
        elementConfig: {
          type: "Password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 30
        },
        isValid: false,
        touched: false
      },
      DateOfBirth: {
        elementType: "input",
        elementConfig: {
          type: "date",
          placeholder: "Date Of Birth"
        },
        value: "",
        validation: {
          required: true,
          isDob: true
        },
        isValid: false,
        touched: false
      }
    },
    isSignup: false,
    formValid: false
  };

  componentDidMount() {
    if (!this.props.building && this.props.AuthRedirect === "/checkout") {
      this.props.onAuthRedirect("/");
    }
  }
  inputChangeHandler = (event, name) => {
    const updatedform = { ...this.state.AuthForm };
    const updatedElement = { ...updatedform[name] };
    updatedElement.value = event.target.value;
    updatedElement.isValid = checkValidity(
      event.target.value,
      updatedElement.validation
    );
    updatedElement.touched = true;
    updatedform[name] = updatedElement;

    let formvalid = true;
    for (let key in updatedform) {
      formvalid = updatedform[key].isValid && formvalid;
    }
    this.setState({ AuthForm: updatedform, formValid: formvalid });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.OnAuth(
      this.state.AuthForm.Email.value,
      this.state.AuthForm.Password.value,
      this.state.AuthForm.Name.value,
      this.state.AuthForm.DateOfBirth.value,
      this.state.isSignup
    );
  };

  render() {
    let formdata = [];

    for (let key in this.state.AuthForm) {
      formdata.push({
        id: key,
        config: this.state.AuthForm[key]
      });
    }

    let form = formdata.map(data => (
      <Input
        key={data.id}
        elementtype={data.config.elementType}
        elementconfig={data.config.elementConfig}
        value={data.config.value}
        changed={event => this.inputChangeHandler(event, data.id)}
        valid={data.config.isValid}
        touched={data.config.touched}
      ></Input>
    ));
    if (this.props.loading) {
      form = <Spinner></Spinner>;
    }

    let error = this.props.error ? this.props.error : null;

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.AuthRedirect}></Redirect>;
    }
    return (
      <div className={classes.authdata}>
        {error}
        {authRedirect}
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <Button disabled={!this.state.formValid} btnType="Success">
            Sign Up
          </Button>
        </form>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    loading: state.AuthReducer.loading,
    error: state.AuthReducer.error,
    AuthRedirect: state.AuthReducer.AuthRedirect,
    building: state.BurgerbuilderReducer.building,
    isAuthenticated: state.AuthReducer.idtoken !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    OnAuth: (email, password, name, Dob, isSignup) => {
      dispatch(actions.checkEmail(email, password, name, Dob, isSignup));
    },
    onAuthRedirect: path => {
      dispatch(actions.setAuthRedirect(path));
    }
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(SignUp);
