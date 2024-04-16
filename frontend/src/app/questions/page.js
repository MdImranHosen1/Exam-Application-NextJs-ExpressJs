"use client"
import LoadingPage from '@/components/LoadingPage';
import React, { useEffect, useState } from 'react'
import BASE_URLS from "../../../urlsConfig";
import axios from "axios";
import parse from "html-react-parser";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import Link from 'next/link';

const Questions = () => {

    const [subjectList, setSubjectList] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [code, setCode] = useState(null);

    const getSubjectList = async () => {
        try {
            const response = await axios.get(BASE_URLS.backend + "/subjects");
            setSubjectList(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const getQuestion = async (id) => {
        try {
            const response = await axios.get(BASE_URLS.backend + `/questions/viva/subject/` + id);
            setQuestions(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getSubjectList();
        getQuestion("6615118fc3079a21bfc98929");
    }, [])

    if (subjectList === null) {
        return <div className='ml-[300px]'><LoadingPage /></div>
    }





    return (
        <div className="ml-[300px]">
            <div className="font-bold  h-20 justify-center text-[19px] bg-gray-200 flex items-center ">
                {subjectList.map((value, index) => {
                    return (<div key={index} className={`${questions != null ? (questions[0].subjectName === value._id ? " bg-green-800" : "bg-white ") : "bg-white "}cursor-pointer pl-2 pr-2 pt-1 pd-1 ml-1 mr-1  rounded-xl self-center items-center flex  border border-gray-400 font-bold text-gray-700`} onClick={() => getQuestion(value._id)}> {value.name}</div>)
                })}
            </div>

            {questions === null ? <LoadingPage /> :
                <div className="">
                    {console.log(questions)}
                    {questions.map((value, index) => {
                        return (
                            <div className="m-2 bg-[#85CDCA] p-2 mb-5 border-[3px] border-green-500 rounded-lg" key={index}>
                                <div>
                                    <div className="text-[25px] font-bold mb-2">
                                        Question {index + 1}: {parse(value.question)}
                                    </div>
                                    <Link href={`/questions/` + value._id}>
                                        <div className=' cursor-pointer w-36 justify-center h-10 bg-white rounded-xl self-center items-center flex  border border-green-600 font-bold text-gray-700'>
                                            Edit
                                        </div>
                                    </Link>
                                </div>
                                <div className="flex flex-col flex-grow">
                                    <div className="bg-white border p-2 rounded-lg text-[19px] m-2">
                                        {parse(value.solution)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-[20px]">Your Code:</div>
                                        <AceEditor
                                            mode="c_cpp"
                                            theme="monokai"
                                            name="UNIQUE_ID_OF_DIV"
                                            editorProps={{ $blockScrolling: true }}
                                            width="100%"
                                            fontSize={18}
                                            showPrintMargin={true}
                                            showGutter={true}
                                            highlightActiveLine={true}
                                            value={code === null ? value?.code : code}
                                            setOptions={{
                                                enableBasicAutocompletion: false,
                                                enableLiveAutocompletion: false,
                                                enableSnippets: false,
                                                showLineNumbers: true,
                                                tabSize: 2,
                                                maxLines: Infinity
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            }

        </div>
    )
}

export default Questions;