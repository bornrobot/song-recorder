const recorder = require('../record.js');

module.exports = {
  getIndex: (req, res) => {
    // TODO: get status...
    console.log("Get index...");
    res.json({
      title:"Song recorder",
      status: "BUSY"
    });
  },

  postStartRecording: (req, res) => {
    res.sendStatus(200);
    console.log("Start recording...");
    recorder.startRecording();
  },

  postStopRecording: (req, res) => {
    console.log("Stop recording...");
    recorder.stopRecording();
    res.sendStatus(200);
  }
};
