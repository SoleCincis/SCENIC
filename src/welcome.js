import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

export default class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    axios.get("/getScenes").then(response => {
      this.setState({
        scenes: response.data.scenes
      });
    });
  }

  render() {
    return (
      <div className="welcomeContainer">
        <img id="logo" src="/logo.png" width="400" />
        {this.state.scenes &&
          this.state.scenes.map(scene => {
            return (
              <div key={scene.id} style={{ textAlign: "center" }}>
                <Link to={"/read/" + scene.id}>{scene.title}</Link>
              </div>
            );
          })}
        <Link to="/import">
          <img id="new" src="/newscene.png" width="400" />
        </Link>
      </div>
    );
  }
}
