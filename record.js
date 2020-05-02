//const cp = require("child_process");
const recorder = require('node-record-lpcm16');
const fs = require('fs');

let recording = null;

module.exports = {
  startRecording,
  stopRecording
};

function stopRecording() {
  console.log("Stop recording wav");
  recording.stop();

  //convert to mp3

  //trim silence

  //save to library
  addToLibrary(song,'tmp.wav'); 
}

function startRecording() {
  console.log("Start recording wav");

  const file = fs.createWriteStream('tmp.wav', { encoding: 'binary' });
  recording = recorder.record({
    sampleRate: 44100,
    channels: 2,
    endOnSilence: true
  });
  recording.stream().pipe(file);

  console.log("end of startRecording");
}

function addToLibrary(song, filePath) {
  console.log('save to library');
}
