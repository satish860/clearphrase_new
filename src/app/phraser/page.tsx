import { UserButton } from "@clerk/nextjs";
import TextBox from "./components/Textarea";

const Pharser = () => {
  return (
    <div className="h-screen w-full bg-gray-200">
      <div className="flex justify-between items-center pl-4 pr-4 md:h-20 h-12 bg-white">
       <h1 className="text-xl">ClearPhrase.io</h1>
        <UserButton />
      </div>
      <div className="flex justify-center items-center w-full h-[90%] md:h-[80%] pt-4">
        <TextBox />
      </div>
    </div>
  );
};

export default Pharser;
