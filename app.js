//Perform song
//Input: record song (start / stop) + audio input
//Outputs: save command, audio data

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')

const {getIndex, postStartRecording, postStopRecording} = require('./routes');
const port = 5001;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(cors());

// routes for the app
app.get('/', getIndex);
app.post('/startRecording', postStartRecording);
app.post('/stopRecording', postStopRecording);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
