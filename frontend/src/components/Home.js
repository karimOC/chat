import React, { Component } from "react";
import Register from "./register";
import Login from "./login";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Login />
        <Register />
      </div>
    );
  }
}
