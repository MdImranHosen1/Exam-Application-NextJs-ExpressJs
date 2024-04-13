"use client";
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import WebcamImage from "@/components/WebcamImage";
import parse from "html-react-parser";
import html2canvas from "html2canvas";

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
      <div className="flex flex-grow border p-3 overflow-x-auto ">
        {/* Display images */}
        {examData &&
          examData.capturedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              width="450px"
              style={{ objectFit: "contain " }}
            />
          ))}
      </div>
      {examData &&
        examData.questions.map((value, index) => {
          return (
            <div key={index} className="flex flex-grow m-2 p-2">
              <div className="flex flex-col">
                <div className="flex flex-grow">{parse(value.question)}</div>
                <div className=" flex">
                  <div>
                    Review Solution: {parse(examData.reviewSolutions[index])}
                  </div>
                  <div>{examData.timeTaken[index]}</div>
                  <div>{examData.totalTimeTaken}</div>
                </div>
                {/* <div>{examData.records[index]}Audio</div> */}
                {/* {examData.recordings[index] && (
                  <audio controls src={examData.recordings[index]}></audio>
                )} */}
              </div>
              <div>{parse(examData.codes[index])}</div>
            </div>
          );
        })}

      {examData &&
        examData.recordings.map((recording, index) => (
          <div key={index}>
            {console.log(
              "examData.recordings.map((recording, index) => (",
              recording
            )}
            <audio controls src={recording}></audio>
          </div>
        ))}
    </div>
  );
};

export default VivaExamSubmit;
