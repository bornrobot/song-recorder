//const cp = require("child_process");
const recorder = require('node-record-lpcm16');
const fs = require('fs');
const request = require('request');

let recording = null;
let song = null;

module.exports = {
  startRecording,
  stopRecording
};

function stopRecording(uuid) {
  console.log("Stop recording wav");
  recording.stop();

  //trim silence
  'sox ${uuid}.orig.wav $uuid.wav silence -l 1 0.1 1% -1 2.0 1%'

  //convert to mp3
  //#prevent strange loop issue by adding </dev/null
  ffmpeg -hide_banner -y \
  -i ${uuid}.wav \
  -metadata title="${uuid}" \
  -metadata year="2020" \
  -metadata author="Bornrobot" \
  -codec mp3 ${$uuid}.mp3 </dev/null

  addToLibrary(song, uuid + '.mp3'); 
}

function startRecording(_song) {

  song = _song;
  uuid = song.Uuid;

  console.log("Start recording ${uuid}.wav");

  const file = fs.createWriteStream(uuid + '.wav', { encoding: 'binary' });
  recording = recorder.record({
    sampleRate: 44100,
    channels: 2,
    endOnSilence: true
  });
  recording.stream().pipe(file);

  console.log("end of startRecording");
}

function addToLibrary(song, file) {
  console.log('Save to library ' + file);

  var url = "https://library.bornrobot.com/add";

  let req = request.post(url, function (err, resp, body) {
    if (err) {
      console.log('Error!');
    } else {
      console.log('URL: ' + body);
    }
  });

  var form = req.form();

  form.append("bandName", "bornrobot");
  form.append("json", song);
  form.append('mp3', fs.createReadStream(file));
}
