import React from "react";

export default class Speech extends React.Component {
    constructor() {
      super();


(function Speech() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

    var recog = new SpeechRecognition;
    recog.continuous = true

    recog.start();

    recog.addEventListener('result', function({results}) {
        var {transcript} = results[results.length-1][0];
        document.body.innerHTML = `
            <p>${transcript}</p>
        ` + document.body.innerHTML;
    });
})();

render() {
  return (

  )}







}
