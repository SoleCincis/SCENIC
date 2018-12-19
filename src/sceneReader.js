import React from "react";
import axios from "./axios";

import { BrowserRouter, Route } from "react-router-dom";

export default class SceneReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: this.props.match.params.id, showHint: false };

    this.choosRole = this.choosRole.bind(this);
  }
  //__________
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
  //_____________
  nextLine() {
    let index;
    let currentLine = this.state.currentLine;
    if (!currentLine) {
      currentLine = this.state.lines[0];
      index = 0;
    } else {
      index = this.state.lines.indexOf(currentLine) + 1;
      if (index == this.state.lines.length) {
        return;
      }
      console.log(this.state.result);
      currentLine = this.state.lines[index];
    }
    this.setState(
      {
        currentLine,
        currentIndex: index
      },
      () => {
        if (this.state.part === currentLine.part) {
          this.listen();
        } else {
          this.speak();
        }
      }
    );
  }
  //___________
  listen() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

    var recog = new SpeechRecognition();
    recog.onend = () => {
      this.listen();
    };
    recog.interimResults = true;
    recog.continuous = true;
    recog.lang = "en-US";
    var grammar =
      "#JSGF V1.0; grammar lines; public <line> = " +
      this.state.currentLine.dialog;
    var grammarList = new webkitSpeechGrammarList();
    grammarList.addFromString(grammar, 1);
    recog.grammars = grammarList;
    recog.start();
    recog.addEventListener("result", ({ results }) => {
      var { transcript } = results[results.length - 1][0];
      if (results[results.length - 1].isFinal) {
        recog.stop();
        if (
          this.state.result.transcript.toLowerCase() ==
            this.state.currentLine.dialog
              .toLowerCase()
              .replace(/[^a-zA-Z\d\s]/g, "") ||
          this.state.showHint
        ) {
          this.setState({
            showHint: false,
            result: null
          });
          recog.onend = null;
          recog.stop();
          this.nextLine();
          return;
        } else {
          this.setState({
            showHint: true
          });
        }
      }
      this.setState({
        result: {
          transcript,
          isFinal: results[results.length - 1].isFinal
        }
      });
      console.log(transcript);
    });
  }
  //_________
  speak() {
    const voices = speechSynthesis
      .getVoices()
      .filter(v => v.lang.startsWith("en-"));

    const line = new SpeechSynthesisUtterance(this.state.currentLine.dialog);
    line.voice = voices[this.state.parts.indexOf(this.state.currentLine.part)];
    speechSynthesis.speak(line);
    const nextLine = () => {
      setTimeout(x => {
        if (!speechSynthesis.speaking) {
          this.nextLine();
        } else {
          nextLine();
        }
      }, 500);
    };
    nextLine();
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
      <div className="RenderContainer">
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
        <div className="textContainer">
          <div>
            {this.state.showHint && <div>{this.state.currentLine.dialog}</div>}
          </div>
          <div>
            {this.state.currentLine && (
              <span>{this.state.currentLine.part} : </span>
            )}
            {this.state.result && (
              <span
                style={{
                  fontWeight: this.state.result.isFinal ? "bold" : "normal"
                }}
              >
                {this.state.result.transcript}
              </span>
            )}
          </div>

          {this.state.lines
            .filter((line, i) => {
              return i < this.state.currentIndex;
            })
            .reverse()
            .map(line => {
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
