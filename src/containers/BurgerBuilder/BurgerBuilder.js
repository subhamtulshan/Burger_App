import React, { Component } from "react";
import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
// import * as BurgerBuilderAction from "../../Store/Action/BurgerBuilder";
// import * as orderaction from "../../Store/Action/Order";
import * as actions from "../../Store/Action/Index";
// import { Redirect } from "react-router-dom";


export class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    // price: 4,
    purchasable: false,
    purchased: false
    // loading: false,
  };

  componentDidMount() {
    // console.log("burger builder");
    this.props.onsetIngredient();
  }

  updatePurchasableState(updatedIngredients) {
    const sum = Object.keys(updatedIngredients)
      .map(igkeys => {
        return updatedIngredients[igkeys];
      })
      .reduce((sum, ele) => {
        return sum + ele;
      }, 0);

    return sum > 0;
  }

  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const oldPrice = this.state.price;
  //   const updatedPrice = oldPrice + Ingredient_price[type];
  //   const Updatedingredients = { ...this.state.ingredients };
  //   Updatedingredients[type] = updatedCount;
  //   this.setState({ ingredients: Updatedingredients, price: updatedPrice });
  //   this.updatePurchasableState(Updatedingredients);
  // };

  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) return;
  //   const updatedCount = oldCount - 1;
  //   const oldPrice = this.state.price;
  //   const updatedPrice = oldPrice - Ingredient_price[type];
  //   const Updatedingredients = { ...this.state.ingredients };
  //   Updatedingredients[type] = updatedCount;
  //   this.setState({ ingredients: Updatedingredients, price: updatedPrice });
  //   this.updatePurchasableState(Updatedingredients);
  // };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchased: true });
    } else {
      this.props.onsetAuthRedirect('/checkout')
      this.props.history.push("/auth");
    }
  };

  purchaseremoveHandler = () => {
    this.setState({ purchased: false });
  };

  purchaseContinue = () => {
    // console.log(this.state.ingredients);
    // const queryparams = [];
    // for (let i in this.state.ingredients)
    //   queryparams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );

    // queryparams.push("price=" + this.state.price);

    // const querystring = queryparams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + querystring
    // });
    this.props.onpurchaseinit();
    this.props.history.push("/checkout");
  };

  render() {
    const displayInfo = { ...this.props.ings };

    for (let key in displayInfo) displayInfo[key] = displayInfo[key] <= 0;

    let orderSummary = null;
    let burger = this.props.error ? <h1>Yeh toh gaya</h1> : <Spinner></Spinner>;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}></Burger>
          <BuildControls
            addingIngredient={this.props.onAddingredient}
            removingIngredientHandler={this.props.onRemoveingredient}
            disabledInfo={displayInfo}
            price={this.props.price}
            purchasable={this.updatePurchasableState(this.props.ings)}
            orderClick={this.purchaseHandler}
            isAuthenticated={this.props.isAuthenticated}
          ></BuildControls>
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.price}
          pruchasecontinued={this.purchaseContinue}
          purchaseCancelled={this.purchaseremoveHandler}
          ingredients={this.props.ings}
        ></OrderSummary>
      );

      if (this.state.loading) {
        orderSummary = <Spinner></Spinner>;
      }
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchased}
          modelclosed={this.purchaseremoveHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStatetoProps = state => {
  return {
    ings: state.BurgerbuilderReducer.ingredients,
    price: state.BurgerbuilderReducer.price,
    error: state.orderReducer.error,
    isAuthenticated: state.AuthReducer.idtoken !== null,
    building:state.BurgerbuilderReducer.building,
    authRedirect:state.AuthReducer.AuthRedirect
  };
};

const mapDispatchtoprops = dispatch => {
  return {
    onAddingredient: igName => {
      dispatch(actions.addingredient(igName));
    },
    onRemoveingredient: igName => {
      dispatch(actions.removeingredient(igName));
    },
    onsetIngredient: () => {
      dispatch(actions.initingredient());
    },
    onpurchaseinit: () => {
      dispatch(actions.purchaseInit());
    },
    onsetAuthRedirect: path => {
      dispatch(actions.setAuthRedirect(path));
    }
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoprops
)(withErrorHandler(BurgerBuilder, axios));
