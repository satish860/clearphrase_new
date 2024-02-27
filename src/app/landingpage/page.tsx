"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import TextBox from "../phraser/components/Textarea";

export default function Home() {
  const words = [
    {
      text: "Summarize",
    },
    {
      text: "Any",
    },
    {
      text: "Document",
    },
  ];
  return (
    <div className="h-full w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-20 bg-clip-text w-full">
        <div className="flex justify-between w-full items-center p-4">
          <div>
            <span className="font-bold text-xl">Clearpharse.io</span>
          </div>
          <div className="flex gap-8">
            <a href="#Features">Features</a>
            <a href="#Pricing">Pricing</a>
            <a href="#Products">Products</a>
          </div>
          <div className="flex gap-4">
            {/* <Button>Sign in</Button>
            <Button>Sign up</Button> */}
            <div></div>
          </div>
        </div>
        <div className="h-screen w-full flex flex-col justify-center items-center">
          <TypewriterEffectSmooth words={words} />

          <h1 className="font-bold text-5xl">In a click</h1>
          <a
            className="mt-8 w-28 h-10 bg-black text-white flex justify-center items-center rounded-md "
            href="#startdiv"
          >
            Start for free
          </a>
        </div>
        <div
          className="h-[400px] w-full flex justify-center items-center mb-10"
          id="startdiv"
        >
          <Tabs defaultValue="account" className="w-[500px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="file">Upload File</TabsTrigger>
              <TabsTrigger value="Text">Add Text</TabsTrigger>
            </TabsList>
            <TabsContent value="file">
              <Card className="w-full h-60 flex flex-col justify-center items-center">
                <CardContent className="space-y-2 flex flex-col justify-center items-center">
                  <p className="font-bold text-xl">Select or drop a file</p>
                  <p>We Support pdf,doc,docx</p>
                  <p>file upto 25 MB</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-[500px]">SUMMARIZE THIS</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent
              value="Text"
              className="flex justify-center items-center"
            >
              <Card className="w-[600px] h-80">
                <CardContent className="space-y-2 ">
                  <Textarea className="w-full h-60 mt-2" />
                </CardContent>
                <CardFooter>
                  <Button className="w-full">SUMMARIZE THIS</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div
          className="w-full h-[600px] flex flex-col justify-center items-center space-y-2"
          id="Features"
        >
          <span className="font-bold text-3xl">Features</span>
          <div className="w-[80%] h-[80%] bg-white rounded-xl  border border-black"></div>
        </div>
        <div
          className="w-full h-[600px] flex flex-col justify-center items-center  space-y-2"
          id="Pricing"
        >
          <span className="font-bold text-3xl">Pricing</span>
          <div className="w-[80%] h-[80%] bg-white rounded-xl border border-black"></div>
        </div>
        <div
          className="w-full h-[600px] flex flex-col justify-center items-center space-y-2"
          id="Products"
        >
          <span className="font-bold text-3xl">Products</span>
          <div className="w-[80%] h-[80%] bg-white rounded-xl border border-black"></div>
        </div>
      </div>
    </div>
  );
}
