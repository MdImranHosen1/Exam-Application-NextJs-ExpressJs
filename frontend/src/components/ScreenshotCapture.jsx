import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";

const ScreenshotCapture = () => {
  const [capturedImages, setCapturedImages] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      CaptureImage();
    }, getRandomInterval(50, 60) * 1000); 
    return () => clearInterval(interval);
  }, []);

  const CaptureImage = () => {
    html2canvas(document.body).then(function (canvas) {
      setCapturedImages((prevImages) => [...prevImages, canvas.toDataURL()]);
    });
  };

  const getRandomInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };


};

export default ScreenshotCapture;
