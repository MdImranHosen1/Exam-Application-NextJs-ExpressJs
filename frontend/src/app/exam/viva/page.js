"use client";
import React, { useEffect, useState } from "react";
import BASE_URLS from "../../../../urlsConfig";
import axios from "axios";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import Webcam from "react-webcam";
import WebcamImage from "@/components/WebcamImage";
import parse from "html-react-parser";

const AnswerReview = ["Bad", "Avarage", "Good", "Best"];

const ExamViva = () => {
  const [questions, setQuestions] = useState(null);
  const [index, setIndex] = useState(0);
  const [code, setCode] = React.useState("// Your initial code here");
  const [totalTime, setTotalTime] = useState(0);
  const [questionTime, setQuestionTime] = useState(0);

  const onChange = (newCode) => {
    setCode(newCode);
  };

  useEffect(() => {
    const getQuestionsList = async () => {
      try {
        const response = await axios.get(BASE_URLS.backend + "/exam/viva");
        const questionsList = response.data;

        const arrangedQuestions = [
          ...questionsList.HR.filter(
            (question) => question._id === "6615a7d23e2adfb29dff966d"
          ),
          ...questionsList["Data Structure & Algorithm"],
          ...questionsList.OOP,
          ...questionsList.Database,
          ...questionsList.SQL,
          ...questionsList.Programming,
          ...questionsList.HR.filter(
            (question) => question._id !== "6615a7d23e2adfb29dff966d"
          ),
        ];

        setQuestions(arrangedQuestions);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getQuestionsList();

    const timerId = setInterval(() => {
      setTotalTime((totalTime) => totalTime + 1);
      setQuestionTime((questionTime) => questionTime + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (questions === null) {
    return (
      <div className="border border-blue-300 shadow rounded-md p-4  w-screen h-screen mx-auto ">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const moveNextQuestion = () => {
    setIndex(index + 1);
    setQuestionTime(0);
  };
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex  flex-grow">
      <div className=" flex w-full flex-col ">
        <div className=" text-gray-800 flex bg-green-300 p-3 font-bold text-[26px] ml-3 mr-3 mt-3 mb-5 rounded-2xl border  ">
          {parse(questions[index].question)}
        </div>
        <div className=" flex flex-col ml-3  flex-grow ">
          <h3 class="bg-green-300 p-1 rounded-t-lg  font-semibold text-gray-900 text-[18px]">
            Write Your Solution
          </h3>
          <AceEditor
            mode="c_cpp"
            theme="monokai"
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            width="100%"
            height="600px"
            fontSize={16}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={code}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>
      </div>
      <div className="w-[300px] ml-2 mr-3 mt-3">
        <div>
          <div>
            <h3 class=" bg-green-300 p-1 rounded-t-lg  font-semibold text-gray-900  text-[20px]">
              Review Solution
            </h3>
            <ul class="flex flex-col text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-b-lg justify-center ">
              {AnswerReview.map((value) => {
                return (
                  <li class="w-full border-b border-gray-200 rounded-t-lg ">
                    <div class="flex items-center ps-3">
                      <input
                        id="vue-checkbox"
                        type="checkbox"
                        value={value}
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                      />
                      <label
                        for="vue-checkbox"
                        class="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
                      >
                        {value}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className=" mt-5 flex flex-grow h-10 bg-white rounded-xl self-center items-center  justify-center border border-gray-400 font-bold text-gray-700 mb-2">
            Total Time:{formatTime(totalTime)}
          </div>
          <div className="flex flex-grow h-10 bg-white rounded-xl self-center items-center  justify-center border border-gray-400 font-bold text-gray-700 mb-2">
            Time: {questionTime}s
          </div>

          <div className="flex">
            <div className="cursor-pointer flex flex-grow h-10 bg-red-100 rounded-xl self-center items-center  justify-center border border-gray-400 font-bold text-gray-700 mb-2">
              Skip
            </div>
            <div
              className="cursor-pointer   flex flex-grow h-10 bg-green-200 rounded-xl self-center items-center  justify-center border border-gray-400 font-bold text-gray-700 mb-2 ml-1"
              onClick={moveNextQuestion}
            >
              Next
            </div>
          </div>
          <div className=" mt-7">
            <WebcamImage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamViva;
