import { useState, useRef } from "react";

const CheckPackage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioURLs, setAudioURLs] = useState([]);
  const mediaRecorder = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = (e) => {
          setAudioChunks((prev) => [...prev, e.data]);
        };
        mediaRecorder.current.start();
        setIsRecording(true);
        // Reset audio URLs list when recording starts
        setAudioURLs([]);
      })
      .catch((error) => console.error("Error accessing microphone:", error));
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const sendRecordings = () => {
    // Send audioChunks to backend
    const formData = new FormData();
    audioChunks.forEach((chunk) => {
      formData.append("audio", chunk);
    });

    fetch("/api/upload-audio", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log("Audio uploaded:", data))
      .catch((error) => console.error("Error uploading audio:", error));
  };

  const playRecording = (index) => {
    const blob = new Blob([audioChunks[index]], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div>
      <div>
        <button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        <button onClick={sendRecordings} disabled={!audioChunks.length}>
          Send Recordings
        </button>
      </div>
      <div>
        {audioChunks.map((chunk, index) => (
          <div key={index}>
            <audio
              controls
              src={URL.createObjectURL(
                new Blob([chunk], { type: "audio/wav" })
              )}
            ></audio>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckPackage;
