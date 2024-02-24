"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
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
import { useCompletion } from "ai/react";

const TextBox = () => {
  const [text, setText] = useState("");
  const [selectedTone, setSelectedTone] = useState("Standard");
  const [text2, setText2] = useState("");
  const { complete, completion, isLoading, setCompletion } = useCompletion({
    api: "/api/phraser",
  });

  const handleToneSelect = (tone: string) => {
    setSelectedTone(tone);
    handleParaphrase(tone);
  };

  const handleParaphrase = (tone: string) => {
    console.log(text);
    console.log(tone);
    complete(
      JSON.stringify({
        text: text,
        tone: tone,
      })
    );
  };

  const handleClearAll = () => {
    setText("");
    setCompletion("");
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(completion);
  };

  const toneOptions = [
    { value: "standard", label: "Standard" },
    { value: "fluency", label: "Fluency" },
    { value: "formal", label: "Formal" },
    { value: "simple", label: "Simple" },
    { value: "creative", label: "Creative" },
    { value: "summarize", label: "Summarize" },
  ];

  return (
    <div className="w-[90%] md:h-full h-[90%]  bg-white">
      <div className="w-full h-[15%] pt-4 hidden md:block">
        <div className="flex justify-between items-center pl-4 pr-4">
          <div className="space-x-8">
            <span>Tones:</span>
            {toneOptions.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleToneSelect(value)}
                style={{
                  borderBottom:
                    selectedTone === value ? "2px solid green" : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            className="w-10 h-10 bg-gray-200 flex justify-center items-center rounded-md"
            onClick={handleCopyText}
          >
            <Copy />
          </button>
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
          <div
            className="w-10 h-10 bg-gray-100 flex justify-center items-center rounded-md"
            onClick={handleCopyText}
          >
            <Copy />
          </div>
        </div>
      </div>
      <div className="w-full h-[75%] flex flex-col md:flex-row gap-1 p-2">
        <Textarea
          className="md:w-[50%] h-[50%] md:h-full w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Textarea
          className="md:w-[50%] h-[40%] md:h-full w-full"
          value={completion}
          readOnly={true}
          onChange={(e) => setText2(e.target.value)}
        />
      </div>
      <div className="w-full flex items-center justify-center gap-10 pt-2">
        <Button className="bg-green-500" onClick={handleParaphrase}>
          Paraphrase
        </Button>
        <Button
          variant={"secondary"}
          onClick={handleClearAll}
          className="border border-black"
        >
          Clear all
        </Button>
      </div>
    </div>
  );
};

export default TextBox;
