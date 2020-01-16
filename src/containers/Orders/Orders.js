import React, { useEffect } from "react";
import Order from "../../components/Orders/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../Store/Action/Index";

const Orders = props => {
  // state = {
  //   orders: [],
  //   loading: true
  // };

  useEffect(() => {
    props.onFetchOrder(props.token, props.userId);
  }, []);
  // componentDidMount() {
  //   this.props.onFetchOrder(this.props.token,this.props.userId);
  //   // axios
  //   //   .get("./orders.json")
  //   //   .then(result => {
  //   //     const fetchOrders = [];
  //   //     for (let key in result.data) {
  //   //       fetchOrders.push({ ...result.data[key], id: key });
  //   //     }
  //   //     this.setState({
  //   //       orders: fetchOrders,
  //   //       loading: false
  //   //     });
  //   //     console.log(this.state.orders);
  //   //   })
  //   //   .catch(err => {
  //   //     this.setState({ loading: false });
  //   //   });
  // }

  let check = props.loading ? (
    <Spinner></Spinner>
  ) : (
    props.orders.map(res => (
      <Order
        key={res.id}
        ingredients={res.ingredients}
        price={res.price}
      ></Order>
    ))
  );

  return <div>{check}</div>;
};

const mapStatetoProps = state => {
  return {
    orders: state.orderReducer.order,
    loading: state.orderReducer.loading,
    token: state.AuthReducer.idtoken,
    userId: state.AuthReducer.userId
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onFetchOrder: (token, userId) => {
      dispatch(actions.fetchorder(token, userId));
    }
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(withErrorHandler(Orders, axios));
