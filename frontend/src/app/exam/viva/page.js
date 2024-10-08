"use client";
import React, { useEffect, useState, useRef } from "react";
import BASE_URLS from "../../../../urlsConfig";
import axios from "axios";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import WebcamImage from "@/components/WebcamImage";
import parse from "html-react-parser";
import html2canvas from "html2canvas";
import LoadingPage from "@/components/LoadingPage";
import { useRouter } from "next/navigation";

const AnswerReview = ["Bad", "Avarage", "Good", "Best"];

const ExamViva = () => {
  const { push } = useRouter();
  const [questions, setQuestions] = useState(null);
  const [index, setIndex] = useState(0);
  const [code, setCode] = useState("// Your initial code here");
  const [codes, setCodes] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [questionTime, setQuestionTime] = useState(0);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [examFinished, setExamFinished] = useState(0);
  const [capturedImages, setCapturedImages] = useState([]);
  const [reviewSolution, setReviewSolution] = useState("Avarage");
  const [reviewSolutions, setReviewSolutions] = useState([]);
  const [audioChunks, setAudioChunks] = useState([]);

  const handleCodeWritten = (newCode) => {
    setCode(newCode);
  };

  const handleReviewSelection = (value) => {
    setReviewSolution(value);
  };

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
      })
      .catch((error) => console.error("Error accessing microphone:", error));
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
    }
  };

  // const playRecording = (index) => {
  //   const blob = new Blob([audioChunks[index]], { type: "audio/wav" });
  //   const url = URL.createObjectURL(blob);
  //   const audio = new Audio(url);
  //   audio.play();
  // };

  const CaptureImage = () => {
    html2canvas(document.body, { scale: 0.5 }).then(function (canvas) {
      setCapturedImages((prevImages) => [...prevImages, canvas.toDataURL()]);
    });
  };

  const getRandomInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    console.log(" page is active 1");
    const getQuestionsList = async () => {
      try {
        let questionNumber = 10;
        let url = BASE_URLS.backend + "/exam/viva/" + questionNumber;
        const response = await axios.get(url);
        console.log("data: ", url, response.data);
        const questionsList = response.data;

        // Check if questionsList is in the expected format
        if (typeof questionsList !== "object" || questionsList === null) {
          console.error("Unexpected response format");
          return;
        }

        const arrangedQuestions = [
          ...(Array.isArray(questionsList.HR)
            ? questionsList.HR.filter(
                (question) => question._id === "6615a7d23e2adfb29dff966d"
              )
            : []),
          ...(Array.isArray(questionsList["Data Structure & Algorithm"])
            ? questionsList["Data Structure & Algorithm"]
            : []),
          ...(Array.isArray(questionsList.OOP) ? questionsList.OOP : []),
          ...(Array.isArray(questionsList.Database)
            ? questionsList.Database
            : []),
          ...(Array.isArray(questionsList.SQL) ? questionsList.SQL : []),
          ...(Array.isArray(questionsList.Programming)
            ? questionsList.Programming
            : []),
          ...(Array.isArray(questionsList.HR)
            ? questionsList.HR.filter(
                (question) => question._id !== "6615a7d23e2adfb29dff966d"
              )
            : []),
        ];

        if (arrangedQuestions.length === 0) {
          console.error("No valid questions found in the response");
          return;
        }

        setQuestions(arrangedQuestions);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getQuestionsList();
    startRecording();

    const timerId = setInterval(() => {
      setTotalTime((totalTime) => totalTime + 1);
      setQuestionTime((questionTime) => questionTime + 1);
    }, 1000);
    const interval = setInterval(() => {
      CaptureImage();
    }, getRandomInterval(5 * 60 * 1000, 8 * 60 * 1000));
    return () => {
      clearInterval(interval);
      clearInterval(timerId);
    };
  }, []);

  const moveNextQuestion = () => {
    setReviewSolutions((reviewSolutions) => [
      ...reviewSolutions,
      reviewSolution,
    ]);
    setCodes((codes) => [...codes, code]);
    setQuestionTimes((questionTimes) => [...questionTimes, questionTime]);
    stopRecording();
    startRecording();
    setQuestionTime(0);
    if (examFinished === 0) {
      setIndex(index + 1);
    }

    if (questions.length <= index + 2 && examFinished === 0) {
      setExamFinished(1);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleFinishExam = async () => {
    moveNextQuestion();
    stopRecording();

    // Convert audio chunks from Blob to Buffer
    const buffers = await Promise.all(
      audioChunks.map(async (chunk) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const buffer = Buffer.from(reader.result);
            resolve(buffer);
          };
          reader.readAsArrayBuffer(chunk);
        });
      })
    );

    const examData = {
      questions: questions.map((question) => question._id),
      codes,
      reviewSolutions,
      answersTaken: questionTimes,
      totalTime,
      screenshot: capturedImages,
      records: buffers, // Use the converted Buffers here
    };

    console.log("ExamDATA ", examData);

    //   // function calculateSizeInBytes(data) {
    //   //   // Convert the data to JSON string
    //   //   const jsonString = JSON.stringify(data);

    //   //   // Calculate the size of the JSON string in bytes
    //   //   const bytes = new Blob([jsonString]).size;

    //   //   return bytes;
    //   // }

    //   // const sizeInBytes = calculateSizeInBytes(examData);
    //   // console.log("Size of ExamData:", sizeInBytes, "bytes");

    axios
      .post(BASE_URLS.backend + "/exam/viva/result", examData)
      .then((response) => {
        console.log("Data sent to backend successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });

    push("/exam/viva/result");
  };

  if (questions === null) {
    console.log("first loading page");
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-grow">
      <div className="flex w-full flex-col">
        <div className="text-gray-800 flex bg-green-300 p-3 font-bold text-[26px] ml-3 mr-1 mt-3 mb-5 rounded-lg border">
          {index + 1}. {parse(questions[index].question)}
        </div>
        <div className="flex flex-col ml-3 flex-grow">
          <h3 className="bg-green-300 p-1 rounded-t-lg font-semibold text-gray-900 text-[18px]">
            Write Your Solution
          </h3>
          <AceEditor
            mode="c_cpp"
            theme="monokai"
            onChange={handleCodeWritten}
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
      <div className="w-[400px] ml-2 mr-3 mt-3">
        <div>
          <div>
            <h3 className="bg-green-300 p-4 rounded-t-lg font-semibold text-gray-900 text-[20px]">
              Review Solution
            </h3>
            <ul className="flex flex-col text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-b-lg justify-center">
              {AnswerReview.map((value) => {
                return (
                  <li
                    key={value}
                    className="w-full border-b border-gray-200 rounded-t-lg"
                  >
                    <div className="flex items-center ps-3">
                      <input
                        id={value}
                        type="checkbox"
                        value={value}
                        onChange={() => handleReviewSelection(value)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={value}
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                      >
                        {value}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-5 flex flex-grow h-10 bg-white rounded-xl self-center items-center justify-center border border-gray-400 font-bold text-gray-700 mb-2">
            Total Time: {formatTime(totalTime)}
          </div>
          <div className="flex flex-grow h-10 bg-white rounded-xl self-center items-center justify-center border border-gray-400 font-bold text-gray-700 mb-2">
            Time: {questionTime}s
          </div>
          <div className="flex">
            <div
              className={`cursor-pointer flex flex-grow h-10 bg-green-200 rounded-xl self-center items-center justify-center border border-gray-400 font-bold text-gray-700 mb-2 ml-1`}
              onClick={examFinished ? handleFinishExam : moveNextQuestion}
            >
              {examFinished ? "Submit" : "Next"}
            </div>
          </div>
          <div className="mt-7 flex-grow flex flex-col">
            <WebcamImage />
            {/* {audioChunks.map((chunk, index) => (
              <div key={index}>
                <audio
                  controls
                  key={index}
                  src={URL.createObjectURL(new Blob([chunk]))}
                  onError={(e) => console.error("Error during playback:", e)}
                ></audio>
                <button onClick={() => playRecording(index)}>Play</button>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamViva;
