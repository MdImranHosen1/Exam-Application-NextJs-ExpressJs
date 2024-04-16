"use client"
import LoadingPage from '@/components/LoadingPage';
import React, { useEffect, useState } from 'react'
import BASE_URLS from "../../../urlsConfig";
import axios from "axios";

const Questions = () => {

    const [subjectList, setSubjectList] = useState(null);

    const getSubjectList = async () => {
        try {
            const response = await axios.get(BASE_URLS.backend + "/subjects");
            setSubjectList(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        getSubjectList();
    }, [])

    if (subjectList === null) {
        return <div className='ml-[300px]'><LoadingPage /></div>
    }

    return (
        <div className="ml-[300px]">
            <div className="font-bold  h-20 justify-center text-[22px] bg-gray-200 flex items-center ">
                {subjectList.map((value, index) => {
                    return (<div className='ml-1 mr-1  bg-white pl-2 pr-2 pt-1 pd-1 rounded-xl border cursor-pointer text-gray-700'> {value.name}</div>)
                })}
            </div>

        </div>
    )
}

export default Questions;