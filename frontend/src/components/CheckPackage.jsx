import React, { useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const AudioRecorderComponent = () => {
  const [recordedBlobs, setRecordedBlobs] = useState([]); // State to store an array of recorded blobs
  const recorderControls = useAudioRecorder();

  // Function to handle when recording is complete
  const addAudioElement = (blob) => {
    setRecordedBlobs((prevBlobs) => [...prevBlobs, blob]); // Append the new blob to the existing array of blobs
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
  };

  return (
    <div>
      <div>
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
        />
        <button onClick={recorderControls.stopRecording}>Stop recording</button>
        <button onClick={recorderControls.startRecording}>
          Start recording
        </button>
      </div>

      {recordedBlobs.map((blob, index) => (
        <div key={index}>
          <h2>Recorded Audio {index + 1}</h2>
          <audio controls>
            <source src={URL.createObjectURL(blob)} />
          </audio>
        </div>
      ))}
    </div>
  );
};

export default AudioRecorderComponent;
