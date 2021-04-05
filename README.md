# Audio Recorder

* Start recording
* Stop recording and save to database (including all the song info), return result including error reasons and new song name.
* Stop recording ( dont save )
* Check status ( READY, BUSY )
* Master song: top/tail, normalise levels, check for crackles, check for silence, add meta-data

*Purpose:*
 
Record audio being performed from the midi instruments or other noise sources. Store the recorded audio.


### Start recording

`curl -X POST https://api.edrobertson.co.uk/recorders/a`

*Parameters:*
- action "start"
- channels 2 

Response:

### Stop recording

`curl -X POST https://api.edrobertson.co.uk/recorders/a`

*Parameters:* 
- action "stop"
- saveAs "mp3" 
- storeOn [nostore*|local|library] 
- uuid

Response: 

### Recording status

`curl https://api.edrobertson.co.uk/recorders/a`

Response:

### Recorders status

`curl https://api.edrobertson.co.uk/recorders`

Response:

