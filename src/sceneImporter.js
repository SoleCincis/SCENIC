import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

export default class SceneImporter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.titeling = this.titeling.bind(this);
    this.createScene = this.createScene.bind(this);
  }
  titeling(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  createScene(e) {
    e.preventDefault();
    axios.post("/sceneTitle/", this.state).then(resp => {
      this.setState({
        sceneId: resp.data.sceneId
      });
    });
  }

  render() {
    return (
      <div>
        {!this.state.sceneId && (
          <div>
            <form onSubmit={this.createScene}>
              <input
                onChange={this.titeling}
                name="title"
                type="text"
                placeholder="insert scene title, pretty please with suger on top"
              />
              <button />
            </form>
          </div>
        )}

        <div>
          <form>
            <input
              id="lines"
              name="sceneLines"
              typre="text"
              placeholder="insert scene line"
            />
            <button />
          </form>
        </div>
      </div>
    );
  }
}

//name of the scene first input + button => axios post get the scene id

//name of the scene desapper and taxt imput for the scene appear "type or say your line" + button send to database
