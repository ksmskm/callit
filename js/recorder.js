// https://github.com/mdn/web-dictaphone

// fork getUserMedia for multiple browser versions, for the future
// when more browsers support MediaRecorder
navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

// set up basic variables for app
var record = document.querySelector('.start-record');
var soundClips = document.querySelector('.sound-clips');

//main block for doing the audio recording
if (navigator.getUserMedia) {

  var chunks = [];

  var onSuccess = function(stream) {
    var mediaRecorder = new MediaRecorder(stream);

    record.onmousedown = function () {
      mediaRecorder.start();
      record.style.background = "red";
    };

    record.onmouseup = function () {
      mediaRecorder.stop();
      record.style.background = "";
    };

    mediaRecorder.onstop = function(e) {

      var clipName = prompt('Enter a name for your sound clip?','My unnamed clip');
      var clipContainer = document.createElement('article');
      var clipLabel = document.createElement('p');
      var audio = document.createElement('audio');
      var deleteButton = document.createElement('button');
     
      clipContainer.classList.add('clip');
      audio.setAttribute('controls', '');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete';

      if(clipName === null) {
        clipLabel.textContent = 'My unnamed clip';
      } else {
        clipLabel.textContent = clipName;
        audio.classList.add(clipName);
      }

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);
      soundClips.appendChild(clipContainer);

      audio.controls = true;
      var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
      chunks = [];
      var audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;

      deleteButton.onclick = function(e) {
        var evtTgt = e.target;
        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
      }
    }

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    }
  }

  navigator.getUserMedia({ video: false, audio: true }, onSuccess, function(err) {
    console.log('The following error occured: ' + err);
  });
}