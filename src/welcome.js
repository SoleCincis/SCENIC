import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

export default class Welcome extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="welcomeContainer">
        <img id="logo" src="/logo.png" width="400" />
      </div>
    );
  }
}
