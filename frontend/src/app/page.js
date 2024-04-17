import Image from "next/image";
import ExamSelectCard from "./../components/ExamSelectCard";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-grow  justify-between ml-[300px]">
      <div className=" flex flex-grow flex-col">
        <div className="font-bold  h-20 justify-center text-[25px] bg-gray-200 flex items-center w-full">
          Viva Information
        </div>
        <div className="flex flex-grow">
          <ExamSelectCard quetionNum={2} />
          <ExamSelectCard quetionNum={3} />
          <ExamSelectCard quetionNum={4} />
          <ExamSelectCard quetionNum={5} />
        </div>
      </div>
    </main>
  );
}
