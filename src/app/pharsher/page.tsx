import { UserButton } from "@clerk/nextjs";
import { Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import TextArea from "../components/Textarea";

const Pharsher = () => {
  return (
    <div className="h-screen w-full">
      <div className="flex justify-between items-center pl-4 pr-4">
        <img
          src="/aj_logo_21_09_2023 2 (3).svg"
          className="w-20 md:h-20 h-14"
        ></img>
        <UserButton />
      </div>
      <div className="flex justify-center items-center w-full h-[80%]">
        <TextArea />
      </div>
    </div>
  );
};

export default Pharsher;
