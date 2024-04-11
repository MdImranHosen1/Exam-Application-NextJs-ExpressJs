"use client";
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import WebcamImage from "@/components/WebcamImage";
import parse from "html-react-parser";
import html2canvas from "html2canvas";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const VivaExamSubmit = () => {
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("examData");
    if (data) {
      const parsedData = JSON.parse(data);
      setExamData(parsedData);
    }
  }, []);

  return (
    <div className="flex flex-col flex-grow">
      <div className="font-bold h-20 justify-center text-[25px] bg-gray-200 flex items-center">
        Viva Exam Overview
      </div>
      {examData && (
        <div>
          <div>
            <h2>Question ID: {examData.questionId}</h2>
            <p>Code: {examData.code}</p>
            <p>Review Solution: {examData.reviewSolution}</p>
            <p>Time Taken for Question: {examData.timeTaken} seconds</p>
            <p>Total Time Taken: {examData.totalTimeTaken} seconds</p>
          </div>
          <div>
            {/* Display images */}
            {examData.capturedImages.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index}`} />
            ))}
          </div>
          <div>
            {/* Display audio recordings */}
            {/* {examData.recordedBlobs.map((blob, index) => (
              <div key={index}>
                <h2>Recorded Audio {index + 1}</h2>
                {blob && (
                  <audio controls>
                    <source src={URL.createObjectURL(blob)} />
                  </audio>
                )}
              </div>
            ))} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default VivaExamSubmit;
