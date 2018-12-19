import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

export default class SceneImporter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.titeling = this.titeling.bind(this);
    this.submitting = this.submitting.bind(this);
  }
  titeling(e) {
    this.setState({
      [e.targe]: e.target.value
    });
  }
  submitting(e) {
    e.preventDefault();
    axios.post("/sceneTitle/:id", this.state).then(x => {
      this.setState(sceneId);
      return null;
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitting}>
          <input
            onChange={this.titeling}
            name="sceneTitle"
            typre="text"
            placeholder="insert scene title, pretty please with suger on top"
          />

          <button />
        </form>
      </div>
    );
  }
}

//name of the scene first input + button => axios post get the scene id

//name of the scene desapper and taxt imput for the scene appear "type or say your line" + button send to database
