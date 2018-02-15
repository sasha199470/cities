var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

function speech(inputEl, errorEl) {
    errorEl.innerHTML = "";
    let noRecognized = true;
    let recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.start();
    recognition.onresult = (event) => {
      inputEl.value = event.results[0][0].transcript;
        noRecognized = false;
    };
    recognition.onerror = (event) => {
        noRecognized = false;
        errorEl.innerHTML = event.error;
        console.log(event);
    };

    recognition.onend = (event) => {
        if (noRecognized) {
            errorEl.innerHTML = "Слово не распознано"
        }
    };

}

module.exports = speech;