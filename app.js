'use strict'
const mysql = require('mysql');
const config = require('./config.js');
const recorder = require('node-record-lpcm16');
const fs = require('fs');
const redis = require('redis');

let recording = null;

var client = redis.createClient(36379, "127.0.0.1");
const db = mysql.createConnection(config);

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

client.on("message", function (channel, message) {

  console.log("Message: " + message + " on channel: " + channel + " is arrive!");

  var msg = JSON.parse(message);

  if(msg.Action === "StartRecording"){
    startRecording( getWavName(msg.songId) );
  }
  if(msg.Action === "StopRecording"){
    stopRecording(function() {
      updateDatabase(msg.songId, getWavName(msg.songId));
    });
  }
});

client.subscribe("notification");


function getWavName(songId) {
    return "./assets/wav/" + songId + ".wav";
}

function stopRecording(callback) {
    recording.stop();
    callback();
}

function startRecording(wavName) {
  console.log("Start recording to " + wavName);

  const file = fs.createWriteStream(wavName, { encoding: 'binary' });

  recording = recorder.record({
    sampleRate: 44100,
    endOnSilence: false
  });

  recording.stream()
  .pipe(file);
}

function updateDatabase(songId, wavName) {

  console.log('Connected to database');

  let query = "UPDATE tblSongs SET wavUrl='" + wavName + "'"; 
  query += " WHERE songId=" + songId;

  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
  });
}

//db.end();

