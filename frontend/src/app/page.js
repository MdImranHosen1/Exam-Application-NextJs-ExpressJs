import Image from "next/image";
import ExamSelectCard from "./../components/ExamSelectCard";
const exam1=[];
const exam1Question=[];


export default function Home() {
  return (
    <main className="flex min-h-screen flex-grow  justify-between ml-[300px]">
      <div className=" flex flex-grow flex-col">
        <div className="font-bold  h-20 justify-center text-[25px] bg-gray-200 flex items-center w-full">
          Viva Information
        </div>
        <div className="flex flex-grow">
          <ExamSelectCard />
          <ExamSelectCard />
          <ExamSelectCard />
          <ExamSelectCard />
        </div>
      </div>
    </main>
  );
}
