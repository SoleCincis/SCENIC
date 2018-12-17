import React from "react";
import axios from "./axios";
// import { Link } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";

export default class SceneReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: this.props.id };

    this.choosRole = this.choosRole.bind(this);
  }

  getRoles(lines) {
    let parts = lines.map(function(line) {
      return line.part;
    });
    parts = new Set(parts);
    parts = [...parts];
    return parts;
  }
  choosRole(e) {
    this.setState(
      {
        part: this.sel.value
      },
      () => this.nextLine()
    );
  }
  nextLine() {
    let currentLine = this.state.currentLine;
    if (!currentLine) {
      currentLine = this.state.lines[0];
    } else {
      let index = this.state.lines.indexOf(currentLine) + 1;
      if (index == this.state.lines.length) {
        return;
      }
      currentLine = this.state.lines[index];
    }
    this.setState({
      currentLine
    });
    if (this.state.part === currentLine.part) {
      this.listen();
    } else {
    }
  }
  listen() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

    var recog = new SpeechRecognition();
    recog.onaudiostart = () => {
      console.log("miaaa");
    };
    recog.continuous = true;
    recog.start();
    recog.addEventListener("result", function({ results }) {
      var { transcript } = results[results.length - 1][0];
      console.log(transcript);
    });
  }

  componentDidMount() {
    axios
      .get("/scene/" + this.state.id)
      .then(({ data }) => {
        this.setState({
          lines: data,
          parts: this.getRoles(data)
        });
      })
      .then();
  }
  render() {
    if (!this.state.parts) {
      return null;
    }
    return (
      <div className="appContainer">
        {!this.state.part && (
          <div>
            <select ref={sel => (this.sel = sel)}>
              {this.state.parts.map(part => {
                return (
                  <option key={part} value={part}>
                    {part}
                  </option>
                );
              })}
            </select>
            <button onClick={this.choosRole}>START</button>
          </div>
        )}
      </div>
    );
  }
}
