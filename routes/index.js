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

    let strJson = JSON.stringify(req.body);

    console.log("Stop recording...");

    recorder.stopRecording(strJson);

    res.sendStatus(200);
  }
};
