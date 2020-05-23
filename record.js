const recorder = require('node-record-lpcm16');
const fs = require('fs');
const request = require('request');
const { execSync } = require('child_process');

let recording = null;
let song = null;

module.exports = {
  startRecording,
  stopRecording
};

function addToLibrary(audioFilename) {
  console.log(`Save ${audioFilename} to lib`);

  var url = "http://library.bornrobot.com:5000/add";

  let req = request.post(url, function (err, resp, body) {
    if (err) {
      console.log(err);
    } else {
      console.log('URL: ' + body);
    }
  });

  var form = req.form();
  form.append("bandName", "bornrobot");
  form.append("json", JSON.stringify(song));
  form.append("mp3", fs.createReadStream(audioFilename));
}

function trimSilence(uuid) {
  let path = process.cwd();

  console.log(`Trimming ${uuid} ...`);

  let cmd = `sox ${path}/${uuid}.wav ${path}/${uuid}.trimmed.wav silence 1 1 1% reverse silence 1 1 1% reverse`;

  const mstr = execSync(cmd, {cwd: path }, function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: '+error.code);
      console.log('Signal received: '+error.signal);
    }
    console.log('Child Process STDOUT: '+stdout);
    console.log('Child Process STDERR: '+stderr);
  });
}

function transcodeToMp3(uuid) {
  console.log(`Transcoding ${uuid} to mp3 ...`);

  let path = process.cwd();

  let cmd = `ffmpeg -hide_banner -y -i ${path}/${uuid}.trimmed.wav -codec mp3 ${path}/${uuid}.mp3 </dev/null`;

  /*
  #prevent strange loop issue by adding </dev/null
  ffmpeg -hide_banner -y \
  -i ${uuid}.trimmed.wav \
  -metadata title="${uuid}" \
  -metadata year="2020" \
  -metadata author="Bornrobot" \
  -codec mp3 ${$uuid}.mp3 </dev/null
  */

  const mstr = execSync(cmd, {cwd: path }, function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: '+error.code);
      console.log('Signal received: '+error.signal);
    }
    console.log('Child Process STDOUT: '+stdout);
    console.log('Child Process STDERR: '+stderr);
  });
}

function stopRecording(uuid) {
  console.log(`Stop recording ${uuid}`);
  recording.stop();

  trimSilence(uuid);

  transcodeToMp3(uuid);

  addToLibrary(uuid + '.mp3');
}

function startRecording(_song) {

  song = _song;
  let filename = song.uuid + '.wav';

  console.log(`Start recording ${filename}`);

  const file = fs.createWriteStream( filename, { encoding: 'binary' });

  recording = recorder.record({
    sampleRate: 44100,
    channels: 2,
    endOnSilence: false,
    audioType: 'wav'
  });
  recording.stream().pipe(file);

  console.log("recording started.");
}
