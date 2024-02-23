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
  const { complete, completion, isLoading, setCompletion } = useCompletion({
    api: "/api/phraser",
  });

  const handleToneSelect = (tone: string) => {
    setSelectedTone(tone);
  };

  const handleParaphrase = () => {
    console.log(text);
    console.log(selectedTone);
    complete(
      JSON.stringify({
        text: text,
        tone: selectedTone,
      })
    );
  };
  const handleClearAll = () => {
    setText("");
  };
  const handleCopyText = () => {
    navigator.clipboard.writeText(completion);
  };

  return (
    <div className="w-[90%] h-full bg-white">
      <div className="w-full h-[15%] pt-4 hidden md:block">
        <div className="flex justify-between items-center pl-4 pr-4">
          <div className="space-x-8">
            <span>Tones:</span>
            <button
              onClick={() => handleToneSelect("Standard")}
              style={{
                borderBottom:
                  selectedTone === "Standard" ? "2px solid green" : "none",
              }}
            >
              Standard
            </button>
            <button
              onClick={() => handleToneSelect("Fluency")}
              style={{
                borderBottom:
                  selectedTone === "Fluency" ? "2px solid green" : "none",
              }}
            >
              Fluency
            </button>
            <button
              onClick={() => handleToneSelect("Formal")}
              style={{
                borderBottom:
                  selectedTone === "Formal" ? "2px solid green" : "none",
              }}
            >
              Formal
            </button>
            <button
              onClick={() => handleToneSelect("Simple")}
              style={{
                borderBottom:
                  selectedTone === "Simple" ? "2px solid green" : "none",
              }}
            >
              Simple
            </button>
            <button
              onClick={() => handleToneSelect("Creative")}
              style={{
                borderBottom:
                  selectedTone === "Creative" ? "2px solid green" : "none",
              }}
            >
              Creative
            </button>
            <button
              onClick={() => handleToneSelect("Summarize")}
              style={{
                borderBottom:
                  selectedTone === "Summarize" ? "2px solid green" : "none",
              }}
            >
              Summarize
            </button>
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
      <div className="w-full md:h-[75%] h-full flex flex-col md:flex-row gap-1">
        <Textarea
          className="md:w-[50%] h-[50%] md:h-full w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Textarea
          className="md:w-[50%] h-[50%] md:h-full w-full"
          value={completion}
          readOnly={true}
        />
      </div>
      <div className="w-full flex items-center justify-center gap-10 pt-2">
        <Button className="bg-green-500" onClick={handleParaphrase}>
          Paraphrase
        </Button>
        <Button variant={"secondary"} onClick={handleClearAll}>
          Clear all
        </Button>
      </div>
    </div>
  );
};

export default TextBox;
