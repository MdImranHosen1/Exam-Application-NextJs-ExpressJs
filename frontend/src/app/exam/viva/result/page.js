"use client";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import axios from "axios";
import BASE_URLS from "../../../../../urlsConfig";
import LoadingPage from "@/components/LoadingPage";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";


const VivaExamSubmit = () => {
  const [results, setResults] = useState(null);
  const [questionsData, setQuestionsData] = useState(null);
  const [code, setCode] = useState(null);

  const handleCodeWritten = (newCode) => {
    setCode(newCode);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getQuestionsData = async () => {

    console.log("resultsresultsresults", results);
    try {
      if (results && results.questions) {
        const promises = results.questions.map(async (value) => {
          const response = await axios.get(BASE_URLS.backend + `/questions/viva/${value}`);
          return response.data;
        });

        const questionDataArray = await Promise.all(promises);
        setQuestionsData(questionDataArray);
        console.log("questionsData", questionsData);
      } else {
        console.error("No questions found in results.");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };



  useEffect(() => {
    getQuestionsData();
  }, [results]);


  const getResults = async () => {
    try {
      const response = await axios.get(BASE_URLS.backend + "/exam/viva/result");
      const resultsData = response.data;

      setResults(resultsData[0]);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);


  if (results === null || questionsData === null) {
    return (
      <div className="pl-[300px] ">
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow ml-[300px]">
      <div className="font-bold h-20 justify-center text-[25px] bg-gray-200 flex items-center">
        Viva Exam Overview
      </div>
      <div className="flex flex-grow border p-3 overflow-x-auto ">
        {/* Display images */}
        {results &&
          results.screenshot.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              width="450px"
              style={{ objectFit: "contain" }}
            />
          ))}
      </div>
      <div className="">
        {results &&
          results.codes.map((value, index) => {
            return (
              <div className='m-2 bg-[#85CDCA] p-2 mb-5 border-[3px] border-green-500 rounded-lg'>
                <div className='flex text-[25px] font-bold mb-2'>
                  Question   {' '}{index + 1}:  {' '} {parse(questionsData[index][0].question)}
                </div>
                <div className='flex flex-grow justify-between text-[18px] font-semibold mb-1'>
                  <div>
                    Answer Time:{formatTime(results.answersTaken[index])}s
                  </div>
                  <div>
                    Total Exam Time:{formatTime(results.totalTime)}s
                  </div>
                  <div>
                    Answer Type:{results.reviewSolutions[index]}
                  </div>
                </div>
                <div className="w-full">
                  {results.records[index] && (
                    <audio controls className="w-full">
                      <source
                        src={`data:audio/wav;base64,${Buffer.from(
                          results.records[index].data
                        ).toString("base64")}`}
                        type="audio/wav"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
                <div className=" flex flex-col flex-grow">
                  <div className=' bg-white border p-2 rounded-lg text-[19px] m-2'>
                    {parse(questionsData[index][0].solution)}
                  </div>
                  <div>
                    {/* {results.codes[index]} */}
                    <div className="font-bold text-[20px]">Your Code:</div>
                    <AceEditor
                      mode="c_cpp"
                      theme="monokai"
                      onChange={handleCodeWritten}
                      name="UNIQUE_ID_OF_DIV"
                      editorProps={{ $blockScrolling: true }}
                      width="100%"
                      fontSize={18}
                      showPrintMargin={true}
                      showGutter={true}
                      highlightActiveLine={true}
                      value={code === null ? results.codes[index] : code}
                      setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                        maxLines: Infinity
                      }} />
                  </div>
                </div>

              </div>
            );
          })}
      </div>



    </div>
  );
};

export default VivaExamSubmit;
