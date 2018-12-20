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
        });
      }
    });
  }

  render() {
    return (
      <div
        className="sceneImporter"
        style={{ display: "flex", padding: "0 10px" }}
      >
        {!this.state.sceneId && (
          <div>
            <img id="sceneTitle" src="/sceneTitle.png" />

            <form onSubmit={this.createScene}>
              <input
                id="title"
                style={{ border: "0" }}
                onChange={this.titling}
                name="title"
                type="text"
                placeholder="type the title of your scene here"
                autoComplete="off"
              />
              <button
                style={{
                  borderRadius: "100%",
                  backgroundColor: "#88001b",
                  minHeight: "15px"
                }}
              />
            </form>
          </div>
        )}
        <form onSubmit={this.buildingScene}>
          {this.state.sceneId && (
            <div>
              <p>{this.state.title}</p>
              <input
                style={{
                  fontSize: "15px",
                  width: "250px",
                  marginTop: "50px",
                  border: "0"
                }}
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
            <div className="linesContainer">
              <textarea
                style={{
                  width: "250px",
                  marginTop: "50px",
                  border: "1px solid black",
                  padding: "5px"
                }}
                onChange={this.titling}
                name="dialog"
                type="text"
                placeholder="insert a scene line"
                value={this.state.dialog}
              />
              <div>
                <button
                  style={{
                    borderRadius: "100%",
                    backgroundColor: "#a30404",
                    minHeight: "15px"
                  }}
                />
                <img
                  width="50"
                  onClick={this.listeningTo}
                  style={{ verticalAlign: "middle" }}
                  id="icon"
                  src="/speakIcone.png"
                />
              </div>
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
