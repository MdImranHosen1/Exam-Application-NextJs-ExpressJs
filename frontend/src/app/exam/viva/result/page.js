"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URLS from "../../../../../urlsConfig";
import LoadingPage from "@/components/LoadingPage";
import Link from "next/link";


const VivaExamView = () => {
  const [results, setResults] = useState(null);

  const getResults = async () => {
    try {
      const response = await axios.get(BASE_URLS.backend + "/exam/viva/result");
      const resultsData = response.data;

      setResults(resultsData);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);


  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // Adjust as needed for specific format
  };


  if (results === null) {
    return (
      <div className="pl-[300px] ">
        <LoadingPage />
      </div>
    );
  }

  console.log("results", results)

  return (
    <div className="flex flex-col flex-grow ml-[300px]">
      <div className="font-bold h-20 justify-center text-[25px] bg-gray-200 flex items-center">
        All Viva Results
      </div>
      {results.map((value, index) => (
        <Link href={`/exam/viva/result/${value._id}`}>
        <div key={index} className="border-2 p-4 my-3 ml-2 mr-2 rounded-lg cursor-pointer ">
          <div className="text-xl font-bold">Result {value._id}</div>
          <div className="flex items-center my-2">
            <span className="mr-2 font-semibold">ID:</span>
            <span>{value._id}</span>
          </div>
          <div className="flex items-center my-2">
            <span className="mr-2 font-semibold">Created At:</span>
            <span>{formatDateTime(value.createdAt)}</span>
          </div>
          <div className="flex items-center my-2">
            <span className="mr-2 font-semibold">Total Time:</span>
            <span>{formatTime(value.totalTime)}{" "}second</span>
          </div>
        </div>
         </Link>
      ))}
    </div>
  );
};
export default VivaExamView;

