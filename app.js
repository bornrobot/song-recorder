'use strict'
const mysql = require('mysql');
let config = require('./config.js');

let songId = 387;

const recorder = require('node-record-lpcm16')
const fs = require('fs')

let wavFile = "./audio/" + songId + ".wav";
const file = fs.createWriteStream(wavFile, { encoding: 'binary' })

recorder.record({
  sampleRate: 44100,
  endOnSilence: true
})
  .stream()
  .pipe(file);

const db = mysql.createConnection(config);

console.log('Connected to database');

let query = "UPDATE tblSongs SET wavUrl='" + wavFile + "'";
query += " WHERE songId=" + songId;

db.query(query, (err, result) => {
  if (err) {
    throw err;
  }
});

db.end();
