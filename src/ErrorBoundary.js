//most code from react

import React, { Component } from "react";
import { Link, Redirect, navigate } from "@reach/router";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, redirect: false };
  }

  //call on class rather than instance
  //
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => {
        this.setState({ redirect: true });
      }, 5000);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with the listing. <Link to="/">Click here</Link> to
          {""}
          go back to the home page or wait five seconds.
        </h1>
      );
    }

    //不return的话，当出现不符合if时候，就会表现出吃掉整个出错的children

    return this.props.children; //子组件
    //return 了上面的这个link的children “Click here”
  }
}

export default ErrorBoundary;
