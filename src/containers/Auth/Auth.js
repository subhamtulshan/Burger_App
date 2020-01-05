import React, { Component } from "react";
import classes from "./Auth.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../Store/Action/Index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from 'react-router-dom';
import {checkValidity} from '../../Shared/Utility'

class Auth extends Component {
  state = {
    AuthForm: {
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
          maxLength: 10
        },
        isValid: false,
        touched: false
      }
    },

    isSignUp: false
  };

  componentDidMount(){
      if(!this.props.building &&this.props.AuthRedirect==="/checkout")
      {
        this.props.onAuthRedirect('/')
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
    // console.log(updatedform);
    // console.log(updatedElement);
    this.setState({ AuthForm: updatedform });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.AuthForm.Email.value,
      this.state.AuthForm.Password.value,
      this.state.isSignUp
    );


  };

  swithAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
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

    let authRedirect=null;
    if(this.props.isAuthenticated)
    {
        authRedirect=<Redirect to={this.props.AuthRedirect}></Redirect>
    }

    return (
      <div className={classes.authdata}>
        {error}{authRedirect}
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.swithAuthModeHandler}>
          {this.state.isSignUp ? "SignIn" : "SignUp"}
        </Button>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    loading: state.AuthReducer.loading,
    error: state.AuthReducer.error,
    AuthRedirect: state.AuthReducer.AuthRedirect,
    building:state.BurgerbuilderReducer.building,
    isAuthenticated:state.AuthReducer.idtoken!==null
  };
};
const mapDispatchtoProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => {
      // dispatch(actions.auth(email, password, isSignUp));
      dispatch(actions.checkEmail(email,password,isSignUp))
    },
    onAuthRedirect:path=>{dispatch(actions.setAuthRedirect(path))}
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Auth);
