import React from "react";
import CheckoutSummary from "../../components/Orders/CheckoutSummary/CheckoutSummary";
import { Route, Redirect,withRouter } from "react-router-dom";
import ContactData from "../ContactData/ContactData";
import { connect } from "react-redux";
// import * as action from '../../Store/Action/Order'

const Checkout =(props)=>{
  // state = {
  //   ingredients: { salad: 0, cheese: 0, bacon: 0, meat: 0 },
  //   price: 0
  // };

  // componentWillMount() {
  //   const queryparam = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of queryparam.entries()) {
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }

  //   this.setState({
  //     ingredients: ingredients,
  //     price: price
  //   });
  // }
  // componentDidMount(){
  //   console.log(this.props);
  // }

  const checkoutCancledHandler = () => {
    props.history.goBack();
  };

  const checkoutcontinueHandler = () => {
    props.history.replace("/checkout/contactdata");
    // console.log(this.props);
  };


    let summary = <Redirect to="/"></Redirect>;
    const purchased = props.purchased ? (
      <Redirect to="/"></Redirect>
    ) : null;
    if (props.ings) {
      summary = (
        <div>
          {purchased}
          <CheckoutSummary
            checkoutCancled={checkoutCancledHandler}
            checkoutContinue={checkoutcontinueHandler}
            ingredients={props.ings}
          ></CheckoutSummary>
          {<Route
            path={props.match.url + "/contactdata"}
            component={ContactData}
          ></Route>}
        </div>
      );
    }
    return summary;
  
}

const mapStatetoProps = state => {
  return {
    ings: state.BurgerbuilderReducer.ingredients,
    purchased: state.orderReducer.purchased
  };
};

// const mapDispatchtoProps=dispatch=>
// {
//   return{
//     onpurchaseinit:()=>{dispatch(action.purchaseIntit())}
//   }
// }
export default connect(mapStatetoProps)(withRouter(Checkout));
