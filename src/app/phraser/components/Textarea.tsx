"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { CheckIcon, Copy } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useCompletion } from "ai/react";
import { ChevronsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";

const TextBox = () => {
  const [text, setText] = useState("");
  const [selectedTone, setSelectedTone] = useState("Standard");
  const [text2, setText2] = useState("");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [isCopied, setIsCopied] = useState(false);
  const { complete, completion, isLoading, setCompletion } = useCompletion({
    api: "/api/phraser",
  });

  const onPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text/plain");
    console.log(pastedText);
    setText(pastedText);
  };

  const handleToneSelect = (tone: string) => {
    setSelectedTone(tone);
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
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
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
          <div className="flex items-center gap-4">
            <button
              className="w-10 h-10 bg-gray-200 flex justify-center items-center rounded-md"
              onClick={handleCopyText}
            >
              {isCopied ? <Check /> : <Copy />}
            </button>
            <Button
              variant={"secondary"}
              onClick={handleClearAll}
              className="border border-black w-22 h-10 flex justify-center items-center"
            >
              Clear all
            </Button>
          </div>
        </div>
        <Separator className="w-full mt-4" />
      </div>

      <div className="block md:hidden">
        <div className="flex flex-row justify-center items-center p-2 gap-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? toneOptions.find((framework) => framework.value === value)
                      ?.label
                  : "Select tone..."}
                <ChevronsDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search tone..." className="h-9" />
                <CommandEmpty>No tone found.</CommandEmpty>
                <CommandGroup>
                  {toneOptions.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                        handleToneSelect(currentValue);
                      }}
                    >
                      {framework.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === framework.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 bg-gray-100 flex justify-center items-center rounded-md"
              onClick={handleCopyText}
            >
              <Copy />
            </div>
            <Button
              variant={"secondary"}
              onClick={handleClearAll}
              className="border border-black w-22 h-10 flex justify-center items-center"
            >
              Clear all
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full h-[75%] flex flex-col md:flex-row gap-1 p-2">
        <Textarea
          className="md:w-[50%] h-[50%] md:h-full w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPaste={onPaste}
        />
        <Textarea
          className="md:w-[50%] h-[40%] md:h-full w-full"
          value={completion}
          readOnly={true}
          onChange={(e) => setText2(e.target.value)}
        />
      </div>
      <div className="w-full flex items-center justify-center gap-10 pt-2">
        <Button
          className="bg-green-500 w-22 h-10 flex justify-center items-center"
          onClick={() => handleParaphrase(selectedTone)}
          disabled={isLoading}
        >
          {isLoading ? (
            <img
              src="/Rolling-1s-200px.svg"
              alt="Loading..."
              className="w-full h-6"
            />
          ) : (
            <>
              <span className="w-full text-center">Paraphrase</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default TextBox;
