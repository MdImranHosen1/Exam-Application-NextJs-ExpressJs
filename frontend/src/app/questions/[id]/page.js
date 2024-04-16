"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import BASE_URLS from "../../../../urlsConfig";
import { useRouter } from "next/navigation";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import LoadingPage from "@/components/LoadingPage";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    [{ align: [] }],
    ["code-block"],
    ["clean"],
];
const QuestionEditModel = ({ params }) => {

    const [question, setQuestion] = useState("");
    const [solution, setSolution] = useState("");
    const [code, setCode] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [subjectList, setSubjectList] = useState([]);

    const { push } = useRouter();

    const handleCodeWritten = (newCode) => {
        setCode(newCode); // Set code as a string
    };
    const handleQuestionChange = (html) => {
        setQuestion(html);
    };

    const handleSolutionChange = (html) => {
        setSolution(html);
    };

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    };


    const handleSubmit = async () => {
        const data = {
            question: question,
            solution: solution,
            code: code,
            subjectName: selectedSubject,
        };
        try {
            const response = await axios.put(
                BASE_URLS.backend + "/questions/viva/" + params.id,
                data
            );
            // console.log(response.data);
            push("/questions/");
        } catch (error) {
            console.error("Error add quesitons viva:", error);
        }
    };


    const getSubjectList = async () => {
        try {
            const response = await axios.get(BASE_URLS.backend + "/subjects");
            setSubjectList(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const getQuestion = async () => {
        try {
            const response = await axios.get(BASE_URLS.backend + "/questions/viva/" + params.id);



            setQuestion(response.data[0].question);
            setSolution(response.data[0].solution);
            setCode(response.data[0]?.code);
            setSelectedSubject(response.data[0].subjectName);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getQuestion();
        getSubjectList();
    }, []);

    if (question === "" || subjectList.length === 0) {
        return <div className="ml-[300px]"><LoadingPage /></div>
    }

    return (
        <div className="    flex flex-col flex-grow ml-[300px] mb-28">
            <div className="font-bold  h-20 justify-center text-[25px] bg-gray-200 flex items-center">
                Edit Question
            </div>
            <div className="pl-3 pr-3">
                <div className=" font-semibold mt-3">Question:</div>
                <ReactQuill
                    theme="snow"
                    className=" bg-gray-100"
                    value={question}
                    onChange={handleQuestionChange}
                    modules={{ toolbar: toolbarOptions }}
                />
                <div className=" font-semibold mt-3">Solution:</div>
                <ReactQuill
                    theme="snow"
                    className=" bg-gray-100 "
                    value={solution}
                    onChange={handleSolutionChange}
                    modules={{ toolbar: toolbarOptions }}
                />
                <div className=" font-semibold mt-3">Code:</div>
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

                <form className="w-full mt-3 ">
                    <label
                        htmlFor="countries"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Select a Subject
                    </label>
                    <select
                        id="countries"
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={handleSubjectChange}
                        required
                    >
                        {Array.isArray(subjectList) &&
                            subjectList.map((value, index) => (
                                <option key={index} value={value._id}>
                                    {value.name}
                                </option>
                            ))}
                    </select>
                </form>

                <div className=" mt-10 w-full justify-center flex ">
                    <div
                        className="cursor-pointer w-60 h-10 bg-green-300 rounded-xl self-center items-center flex justify-center border border-gray-400 font-bold text-gray-700 mb-2"
                        onClick={handleSubmit}
                    >
                        Update Question
                    </div>
                </div>
            </div>
        </div>
    );
};
export default QuestionEditModel;
