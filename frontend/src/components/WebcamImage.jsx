import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

function WebcamImage() {
  const [img, setImg] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true); // State to manage camera on/off
  const webcamRef = useRef(null);



  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  return (
    <div className="Container">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isCameraOn}
          onChange={toggleCamera}
          className="sr-only peer"
        />
        <div
          className={`relative w-11 h-6 ${
            isCameraOn
              ? "bg-gray-200 peer-focus:ring-blue-300"
              : "bg-blue-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"
          } peer-focus:outline-none peer-focus:ring-4 rounded-full  peer-checked:bg-blue-600 peer peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] ${
            isCameraOn
              ? "after:start-[2px] after:bg-white after:border-gray-300"
              : "after:end-[2px] after:bg-white after:border-blue-300"
          } after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
        />
        <span className="ms-3 text-sm font-medium text-gray-900">
          Toggle Camera
        </span>
      </label>

      {isCameraOn && (
        <>
          <Webcam
            audio={false}
            mirrored={true}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
         
        </>
      )}
      
    </div>
  );
}

export default WebcamImage;
