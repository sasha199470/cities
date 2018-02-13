var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

function speech(inputEl) {
    console.log("speech.js");
    let recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.start();
    recognition.onresult = (event) => {
      inputEl.value = event.results[0][0].transcript;
      console.log(inputEl,1)
    };
    recognition.onspeechend = () => {
        recognition.stop();
        console.log("onspeeched");
    };
    recognition.onerror = (event) => {
        console.log(event)
    }
    recognition.onaudiostart = (event) => {
        //Fired when the user agent has started to capture audio.
        console.log('SpeechRecognition.onaudiostart');
    }
    recognition.onaudioend = (event) => {
        //Fired when the user agent has finished capturing audio.
        console.log('SpeechRecognition.onaudioend');
    }

    recognition.onend = (event) => {
        //Fired when the speech.js recognition service has disconnected.
        console.log('SpeechRecognition.onend');
    }

    recognition.onnomatch = function(event) {
        //Fired when the speech.js recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
        console.log('SpeechRecognition.onnomatch');
    }

    recognition.onsoundstart = function(event) {
        //Fired when any sound — recognisable speech.js or not — has been detected.
        console.log('SpeechRecognition.onsoundstart');
    }

    recognition.onsoundend = function(event) {
        //Fired when any sound — recognisable speech.js or not — has stopped being detected.
        console.log('SpeechRecognition.onsoundend');
    }

    recognition.onspeechstart = function (event) {
        //Fired when sound that is recognised by the speech.js recognition service as speech.js has been detected.
        console.log('SpeechRecognition.onspeechstart');
    }
    recognition.onstart = function(event) {
        //Fired when the speech.js recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
        console.log('SpeechRecognition.onstart');
    }
}

module.exports = speech;