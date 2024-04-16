"use client";
import React from "react";
import Link from "next/link";


const ExamSelectCard = () => {
  return (
    <div className="flex flex-grow mt-10 h-[600px] rounded-xl roundet-2xl bg-gray-200 ml-5 mr-5 pb-2  ">
      <div className="h-full w-full flex flex-col justify-between">
        <div className="flex flex-col w-full">
          <div className="bg-green-300 flex rounded-xl w-full text-[25px] font-semibold justify-center h-16 items-center">
            15 Minute
          </div>

          <div className=" ml-2 bg-white  m-4  p-2 rounded-lg font-semibold flex flex-grow justify-between">
            <div>Subject: </div>
            <div>Number:</div>
          </div>
        </div>
        <div>
          <Link href="/exam/viva">
            <div className="cursor-pointer ml-2 mr-2 h-10 bg-white rounded-xl self-center items-center flex justify-center border border-gray-400 font-bold text-gray-700 mb-2">
              Start Exam
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExamSelectCard;
