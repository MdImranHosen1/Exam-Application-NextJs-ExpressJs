"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import userIcon from "../../public/images/home.png";
import Link from "next/link";
const navItem = ["Home", "Questions", "MCQ", "Subjects"];
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  const [viewSidebar, setViewSidebar] = useState(true);

  const handleClick = (value) => () => {
    if (value === "Home") {
      push("/");
    }
    else if(value='Questions')
    {
      push('/questions');
    }
  };

  useEffect(() => {
    if (pathname === "/exam/viva") {
      setViewSidebar(false);
    } else {
      setViewSidebar(true);
    }
  }, [pathname]);

  return (
    viewSidebar && (
      <div className="fixed w-[300px] bg-gray-200 h-screen border border-green-400 flex flex-col justify-between pb-6 pt-6">
        <div className="flex flex-col w-full">
          {navItem.map((value, index) => (
            <div
              key={index}
              onClick={handleClick(value)} // Pass a callback function to onClick
              className="cursor-pointer w-60 h-10 bg-white rounded-xl self-center items-center flex justify-center border border-gray-400 font-bold text-gray-700 mb-2"
            >
              {value}
            </div>
          ))}
        </div>
        <div className="flex flex-col self-center items-center">
          <Link href="/exam/viva/result">
            <div className="cursor-pointer w-60 h-10 bg-white rounded-xl self-center items-center flex justify-center border border-gray-400 font-bold text-gray-700 mb-2">
              Results
            </div>
          </Link>
          <div className="cursor-pointer w-60 h-10 bg-white rounded-xl self-center items-center flex justify-center border border-gray-400 font-bold text-gray-700 mb-2">
            Add MCQ
          </div>

          <Link href="/add-question/viva">
            <div className="cursor-pointer w-60 h-10 bg-white rounded-xl self-center items-center flex justify-center border border-gray-400 font-bold text-gray-700 mb-2">
              Add Questions
            </div>
          </Link>

          <div className="cursor-pointer w-60 h-16 bg-white rounded-xl self-center items-center flex  border border-gray-400 font-bold text-gray-700">
            <div className="h-12 w-12 p-1 ml-2 bg-slate-300 rounded-full">
              <Image src={userIcon} alt="" />
            </div>
            <div className="ml-3">Name</div>
          </div>
        </div>
      </div>
    )
  );
};

export default Sidebar;
