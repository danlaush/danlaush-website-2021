import { useRef, useState } from "react";
import Recording from '../../components/sound/recording';

import dynamic from 'next/dynamic';
 
const Map = dynamic(() => import('../../components/sound/map'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Submit = () => {
  const [latlng, setLatlng] = useState({ lat: 51.505, lng: -0.09 })
  const [recording, setRecording] = useState({
    decibelAverage: 1,
    file: {},
  })

  function updateSubmission(key, value) {
    setSubmission({
      ...submission,
      [key]: value,
    })
  }

  function handleLocationChange(latlng) {
    setLatlng(latlng)
  }

  function handleRecordingChange(recording) {
    setRecording(recording)
  }

  return (
    <main>
      <h1>Submit recording</h1>
      <Map onLocationChange={handleLocationChange} />
      <Recording onRecordingChange={handleRecordingChange} />
      <h2>Submit</h2>
      <table>
        <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody>
          <tr><td>Lat</td><td>{latlng.lat}</td></tr>
          <tr><td>Long</td><td>{latlng.lng}</td></tr>
          <tr><td>Decibel Avg</td><td>{recording.decibelAverage}</td></tr>
          <tr><td>File</td><td>{JSON.stringify(recording.file)}</td></tr>
        </tbody>
      </table>
    </main>
  )
}

export default Submit;