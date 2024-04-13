"use client";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import axios from "axios";
import BASE_URLS from "../../../../../urlsConfig";
import LoadingPage from "@/components/LoadingPage";

const VivaExamSubmit = () => {
  const [results, setResults] = useState(null);

  const getResults = async () => {
    try {
      const response = await axios.get(BASE_URLS.backend + "/exam/viva/result");
      const resultsData = response.data;

      console.log(resultsData);

      setResults(resultsData[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  if (results === null) {
    return <LoadingPage />;
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
      {results &&
        results.questions.map((value, index) => {
          return (
            <div key={index} className="flex flex-grow m-2 p-2">
              <div className="flex flex-col">
                <div className="flex flex-grow">{parse(value)}</div>
                <div className=" flex">
                  <div>
                    Review Solution: {parse(results.reviewSolutions[index])}
                  </div>
                  <div>{results.answersTaken[index]}</div>
                  <div>{results.totalTimeTaken}</div>
                </div>
                {/* Play audio recordings */}
                {results.records[index] && (
                  <audio controls>
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
              <div>{parse(results.codes[index])}</div>
            </div>
          );
        })}
    </div>
  );
};

export default VivaExamSubmit;
