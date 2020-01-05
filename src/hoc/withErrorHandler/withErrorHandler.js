import React, { Component, useState, useEffect } from "react";
import Aux from "../Auxillary/Auxillary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    // state = {
    //   error: null
    // };

    const [error, setError] = useState(null);

    const Errorhandler = () => {
      // this.setState({ error: null });
      setError(null);
    };

    const resInterceptor = axios.interceptors.response.use(
      resp => {
        return resp;
      },
      error => {
        // this.setState({ error: error });
        setError(error);
      }
    );
    const reqInterceptor = axios.interceptors.request.use(
      req => {
        return req;
      },
      error => {
        // this.setState({ error: error });
        setError(error);
      }
    );

    // componentWillUnmount()
    // {
    //     axios.interceptors.request.eject(this.reqInterceptor);
    //     axios.interceptors.response.eject(this.resInterceptor);
    // }
    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    });

    return (
      <Aux>
        <Modal show={error} modelclosed={Errorhandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props}></WrappedComponent>
      </Aux>
    );
  };
};

export default withErrorHandler;
