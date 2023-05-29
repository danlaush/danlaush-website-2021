import { useRef, useState } from "react";

// https://blog.logrocket.com/how-to-create-video-audio-recorder-react/

const mimeType = "audio/mp3";

const SubmitRecording = ({onRecordingChange}) => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const audioCtx = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [volume, setVolume] = useState(0);
  const [audioData, setAudioData] = useState();

  // https://stackoverflow.com/a/13735541
  // var rms = Math.sqrt(sum / (_buffer.length / 2));
  // var decibel = 20 * (Math.log(rms) / Math.log(10));
  // https://jameshfisher.com/2021/01/18/measuring-audio-volume-in-javascript/
  // https://stackoverflow.com/a/48589671
  // https://resources.pcb.cadence.com/blog/2020-time-domain-analysis-vs-frequency-domain-analysis-a-guide-and-comparison
  // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatTimeDomainData
  // breakthrough - just use 30 for relative silence to calibrate
  // https://stackoverflow.com/a/5097868


  // This is basically it https://www.noisetube.net/


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

    // SET UP RECORDING
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

    // SET UP ANALYSING VOLUME
    const audioContext = new AudioContext();
    audioCtx.current = audioContext;
    const mediaStreamAudioSourceNode = audioCtx.current.createMediaStreamSource(stream);
    const analyserNode = audioCtx.current.createAnalyser();
    mediaStreamAudioSourceNode.connect(analyserNode);

    const pcmData = new Float32Array(analyserNode.fftSize);
    
    const onFrame = () => {
        analyserNode.getFloatTimeDomainData(pcmData);
        let sumSquares = 0.0;
        for (const amplitude of pcmData) { 
          sumSquares += amplitude*amplitude;
        }
        
        const rms = Math.sqrt(sumSquares / pcmData.length);
        const decibel = 20 * (Math.log(rms) / Math.log(10));
        const decibel2 = 20 * Math.log(rms);
        setAudioData({
          pcmData,
          sumSquares,
          rms,
          decibel,
          decibel2,
          fftSize: analyserNode.fftSize,
        })
        setVolume(decibel)
        window.requestAnimationFrame(onFrame);
    };
    window.requestAnimationFrame(onFrame);
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
    audioCtx.current.close()
    let sumSquares = 0.0;
    for (const amplitude of audioData.pcmData) { 
      sumSquares += amplitude*amplitude;
      console.log(amplitude, 'squared', amplitude*amplitude, 'sumSquares', sumSquares)
    }
    
    const rms = Math.sqrt(sumSquares / audioData.pcmData.length);
    const decibel = 20 * (Math.log(rms) / Math.log(10));
    const decibel2 = 20 * Math.log(rms);
    console.log({rms, decibel, decibel2})
  };

  return (
    <div>
      <h2>Recording</h2>
      <button onClick={getMicrophonePermission} disabled={permission}>Get microphone</button>
      <button onClick={startRecording} disabled={!permission && recordingStatus === 'inactive'}>Record</button>
      {/* <button onClick={startRecording} disabled={permission && recordingStatus === 'recording'}>Pause</button> */}
      <button onClick={stopRecording} disabled={!permission && recordingStatus === "recording"}>Stop</button>
      <p>
        Volume: {volume}
      </p>
      {audio ? (
        <div className="audio-container">
          <audio src={audio} controls></audio>
          <a download href={audio}>
              Download Recording
          </a>
        </div>
      ) : null}
    </div>
  )
}

export default SubmitRecording;