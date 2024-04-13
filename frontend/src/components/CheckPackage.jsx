import React, { useState } from "react";

const RecorderAndScreenshotTaker = () => {
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [screenshot, setScreenshot] = useState(null);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => {
          setAudioChunks((prev) => [...prev, e.data]);
        };
        mediaRecorder.start();
        setRecording(true);
      })
      .catch((err) => console.log(err));
  };

  const stopRecording = () => {
    setRecording(false);
  };

  const takeScreenshot = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    const track = stream.getTracks()[0];
    const imageCapture = new ImageCapture(track);

    const blob = await imageCapture.takePhoto();
    const url = URL.createObjectURL(blob);
    setScreenshot(url);

    track.stop();
  };

  const sendToDatabase = async () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");
    formData.append("screenshot", screenshot);

    try {
      const response = await fetch("/api/saveResult", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error saving result:", error);
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
      <button onClick={takeScreenshot}>Take Screenshot</button>
      {screenshot && <img src={screenshot} alt="Screenshot" />}
      {audioChunks.length > 0 && (
        <div>
          <audio controls>
            <source
              src={URL.createObjectURL(
                new Blob(audioChunks, { type: "audio/wav" })
              )}
              type="audio/wav"
            />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      <button onClick={sendToDatabase}>Send to Database</button>
    </div>
  );
};

export default RecorderAndScreenshotTaker;
