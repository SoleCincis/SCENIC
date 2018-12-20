

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

this.setState({
     showHint: true
  })


  render() {
     return (
         <div>

         {this.state.showHint && <div>{this.state.currentLine.text}</div>}
         </div>
     )
  }

  recog.addEventListener('result', function({results}) {
        var {transcript} = results[results.length-1][0];
        document.body.innerHTML = `
            <p>${transcript}</p>
        ` + document.body.innerHTML;

        const utterance = new SpeechSynthesisUtterance('Royale with cheese');

        const voices = speechSynthesis.getVoices().filter(v => v.lang.startsWith('en-'));
        const voice = voices[Math.floor(Math.random() * voices.length)];
        console.log(voices);
        utterance.voice = voice;
        speechSynthesis.speak(
            utterance
        );
    });
