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
    let strJson = JSON.stringify(req.body);

    res.sendStatus(200);
    console.log("Start recording...");

    recorder.startRecording(strJson);
  },

  postStopRecording: (req, res) => {

    console.log("Stop recording...");

    console.log(req.body);
    let uuid = req.body.Uuid;

    recorder.stopRecording(uuid);

    res.sendStatus(200);
  }
};
