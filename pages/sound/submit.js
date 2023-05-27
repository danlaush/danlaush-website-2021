import { useRef, useState } from "react";

// https://blog.logrocket.com/how-to-create-video-audio-recorder-react/

const mimeType = "audio/mp3";

const SubmitRecording = () => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);


  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            });
            setPermission(true);
            setStream(streamData);
        } catch (err) {
            alert(err.message);
        }
    } else {
        alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
       if (typeof event.data === "undefined") return;
       if (event.data.size === 0) return;
       localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
       const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
       const audioUrl = URL.createObjectURL(audioBlob);
       setAudio(audioUrl);
       setAudioChunks([]);
    };
  };

  return (
    <main>
      <h1>Submit recording</h1>
      <button onClick={getMicrophonePermission} disabled={permission}>Get microphone</button>
      <button onClick={startRecording} disabled={!permission && recordingStatus === 'inactive'}>Record</button>
      {/* <button onClick={startRecording} disabled={permission && recordingStatus === 'recording'}>Pause</button> */}
      <button onClick={stopRecording} disabled={!permission && recordingStatus === "recording"}>Stop</button>
      {audio ? (
        <div className="audio-container">
          <audio src={audio} controls></audio>
          <a download href={audio}>
              Download Recording
          </a>
        </div>
      ) : null}
    </main>
  )
}

export default SubmitRecording;