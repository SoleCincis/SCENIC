import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

export default class SceneImporter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      parts: []
    };

    this.titling = this.titling.bind(this);
    this.createScene = this.createScene.bind(this);
    this.listeningTo = this.listeningTo.bind(this);
    this.buildingScene = this.buildingScene.bind(this);
  }
  //____________________
  titling(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  //_______________________
  createScene(e) {
    e.preventDefault();
    if (!this.state.title) {
      return;
    }

    axios.post("/sceneTitle/", this.state).then(resp => {
      this.setState({
        sceneId: resp.data.sceneId
      });
    });
  }
  //_________________-
  buildingScene(e) {
    e.preventDefault();
    if (!this.state.part || !this.state.dialog) {
      return;
    }

    axios.post("/dialogLines", this.state).then(resp => {
      this.setState({
        lines: [
          ...this.state.lines,
          {
            part: this.state.part,
            dialog: this.state.dialog,
            id: resp.data.lineId
          }
        ],
        parts: [...new Set([...this.state.parts, this.state.part])],
        part: "",
        dialog: ""
      });
    });
  }

  listeningTo() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

    var recog = new SpeechRecognition();
    recog.onend = () => {
      this.listeningTo();
    };
    recog.interimResults = true;
    recog.continuous = true;
    recog.lang = "en-US";

    recog.start();
    recog.addEventListener("result", ({ results }) => {
      var { transcript } = results[results.length - 1][0];
      if (results[results.length - 1].isFinal) {
        recog.onend = null;
        recog.stop();
        this.setState({
          dialog: transcript
          // result: {
          //   transcript,
          //   isFinal: results[results.length - 1].isFinal
          // }
        });
      }
    });
  }

  render() {
    return (
      <div>
        {!this.state.sceneId && (
          <div>
            <form onSubmit={this.createScene}>
              <input
                onChange={this.titling}
                name="title"
                type="text"
                placeholder="insert scene title, pretty please with suger on top"
              />
              <button />
            </form>
          </div>
        )}
        <form onSubmit={this.buildingScene}>
          {this.state.sceneId && (
            <div>
              <input
                onChange={this.titling}
                name="part"
                type="text"
                placeholder="insert a scene character"
                value={this.state.part}
                list="parts"
                autoComplete="off"
              />
              <datalist id="parts">
                {this.state.parts.map(part => {
                  return <option key={part}>{part}</option>;
                })}
              </datalist>
            </div>
          )}
          {this.state.sceneId && (
            <div>
              <textarea
                onChange={this.titling}
                name="dialog"
                type="text"
                placeholder="insert a scene line"
                value={this.state.dialog}
              />
              <button>go</button>
              <button type="button" onClick={this.listeningTo} />
            </div>
          )}
        </form>
        <div>
          {this.state.lines.map(line => {
            return (
              <div key={line.id}>
                {line.part} : {line.dialog}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
