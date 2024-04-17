"use client";
import React, { useEffect,useState } from "react";
import Link from "next/link";
import LoadingPage from "@/components/LoadingPage";
import BASE_URLS from "../../urlsConfig";
import axios from "axios";


const ExamSelectCard = ({quetionNum}) => {

  const [subjectList, setSubjectList] = useState(null);

  const getSubjectList = async () => {
    try {
      const response = await axios.get(BASE_URLS.backend + "/subjects");
     
      setSubjectList(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(()=>{
    getSubjectList();
    BASE_URLS.questionNumber=quetionNum;
  },[])

  if(subjectList===null)
  {
    return <div><LoadingPage/></div>
  }

  console.log("subjectList",subjectList)

  return (
    <div className="flex flex-grow mt-10 h-[600px] rounded-xl roundet-2xl bg-gray-200 ml-5 mr-5 pb-2  ">
      <div className="h-full w-full flex flex-col justify-between">
        <div className="flex flex-col w-full">
          <div className="bg-green-300 flex rounded-xl w-full text-[25px] font-semibold justify-center h-16 items-center">
            {quetionNum*7} Minute
          </div>
          {subjectList.map(value=>{
            return (<div className=" ml-2 bg-white mr-2 mt-1  p-2 rounded-lg font-semibold flex flex-grow justify-between">
            <div>{value.name}</div>
            <div>{value.name==='Programming'?1:quetionNum}</div>
          </div>)
          })}
          
        </div>
        <div>
          <Link href={`/exam/viva/`}>
            <div className="cursor-pointer ml-2 mr-2 h-10 bg-white rounded-xl self-center items-center flex justify-center border border-gray-400 font-bold text-gray-700 mb-2">
              Start Viva
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExamSelectCard;
