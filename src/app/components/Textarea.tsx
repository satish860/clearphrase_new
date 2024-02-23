"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import axios from "axios";

const TextArea = () => {
  const [text1, setText1] = useState("");

  const handleParaphrase = async () => {
    const response = await axios.post("api/Textarea", {
        Question : text1,
    });
    console.log(response.data)
  };

  return (
    <div className="w-full md:h-[75%] h-full">
      <div className="w-full h-full flex flex-col md:flex-row gap-1">
        <Textarea
          className="md:w-[50%] h-[50%] md:h-full w-full"
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
