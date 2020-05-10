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
    console.log(req.body);
    recorder.startRecording(req.body);
  },

  postStopRecording: (req, res) => {

    console.log("Stop recording...");
    console.log(req.body);

    let uuid = req.body.uuid;

    recorder.stopRecording(uuid);

    res.sendStatus(200);
  }
};
