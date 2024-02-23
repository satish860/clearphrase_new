"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import axios from "axios";
import { Copy } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TextArea = () => {
  const [text1, setText1] = useState("");
  const [selectedTone, setSelectedTone] = useState("");

  const handleToneSelect = (tone: string) => {
    setSelectedTone(tone);
  };

  const handleParaphrase = async () => {
    const response = await axios.post("api/Textarea", {
      Question: text1,
      Tones:selectedTone,
    });
    console.log(response.data);
  };

  return (
    <div className="w-[90%] h-full bg-gray-100">
      <div className="w-full h-[15%] pt-4 hidden md:block">
        <div className="flex justify-between items-center pl-4 pr-4">
          <div className="space-x-8">
            <span>Tones:</span>
            <button onClick={() => handleToneSelect("Standard")}>
              Standard
            </button>
            <button onClick={() => handleToneSelect("Fluency")}>Fluency</button>
            <button onClick={() => handleToneSelect("Formal")}>Formal</button>
            <button onClick={() => handleToneSelect("Simple")}>Simple</button>
            <button onClick={() => handleToneSelect("Creative")}>
              Creative
            </button>
            <button onClick={() => handleToneSelect("Summarize")}>
              Summarize
            </button>
          </div>
          <div className="w-10 h-10 bg-gray-200 flex justify-center items-center rounded-md">
            <Copy />
          </div>
        </div>
        <Separator className="w-full mt-4" />
      </div>

      <div className="block md:hidden">
        <div className="flex flex-row justify-center items-center p-2 gap-32">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Select</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleToneSelect("Standard")}>
                  Standard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleToneSelect("Fluency")}>
                  Fluency
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleToneSelect("Formal")}>
                  Formal
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleToneSelect("Simple")}>
                  Simple
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleToneSelect("Creative")}>
                  Creative
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleToneSelect("Summarize")}>
                  Summarize
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="w-10 h-10 bg-gray-100 flex justify-center items-center rounded-md">
            <Copy />
          </div>
        </div>
      </div>
      <div className="w-full md:h-[75%] h-full flex flex-col md:flex-row gap-1">
        <Textarea
          className="md:w-[50%] h-[50%] md:h-full w-full"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
        />
        <Textarea className="md:w-[50%] h-[50%] md:h-full w-full" />
      </div>
      <div className="w-full flex items-center justify-center gap-10 pt-2">
        <Button className="bg-green-500" onClick={handleParaphrase}>
          Parapharse
        </Button>
        <Button variant={"secondary"}>Clearall</Button>
      </div>
    </div>
  );
};

export default TextArea;
