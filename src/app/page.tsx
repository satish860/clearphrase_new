import {
  Copyright,
  LayoutDashboard,
  Chrome,
  Tv2,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";
import { UserButton, auth, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();
  return (
    <div className="w-full h-full p-2">
      <div className="flex justify-between items-center">
        <span className="w-20 h-10">Clearphraser.io</span>
        {userId ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <div className="w-28 h-10 bg-green-400 rounded-full flex justify-center items-center text-white">
            <SignUpButton afterSignUpUrl="/" afterSignInUrl="/"></SignUpButton>
          </div>
        )}
      </div>
      <div className="flex flex-col h-[600px]  justify-center items-center space-y-10">
        <div className="space-y-2 text-center">
          <h1 className="text-6xl font-sans">Try Clearphrase today</h1>
          <h1 className="text-6xl font-sans text-green-400">
            Take control of your
          </h1>
          <h1 className="text-6xl font-sans text-green-400">
            writing&#39;s tone!
          </h1>
        </div>
        <div className="text-center pt-5 space-y-1">
          <p>
            Elevate your writing to the next level with Clearphrase. Transform
            your tone and effortlessly and create
          </p>
          <p>content that captivates your audience.</p>
        </div>
        <div className="flex flex-col space-y-2 justify-center items-center mt-2">
          <a className="w-28 h-10 bg-green-400 text-white rounded-full flex justify-center items-center" href="/phraser">
            Get started
          </a>
          <a>learn more</a>
        </div>
      </div>
      <div className="h-52 w-full flex justify-center items-center pt-2 gap-8">
        <div className="h-full w-[30%] space-y-4">
          <LayoutDashboard className="text-green-400 w-10 h-10" />
          <h1>Web Interface</h1>
          <h2>
            Clearphrase&#39;s intuitive web interface makes it easy to adjust
            the tone of your writing from any device with an internet
            connection.
          </h2>
        </div>
        <div className="h-full w-[30%] space-y-4">
          <Chrome className="text-green-400 w-10 h-10" />
          <h1>Web Interface</h1>
          <h2>
            With Clearphrase&#39;s Chrome extension, you can seamlessly edit
            your tone without ever leaving your browser.
          </h2>
        </div>
        <div className="h-full w-[30%] space-y-4">
          <Tv2 className="text-green-400 w-10 h-10" />
          <h1>Web Interface</h1>
          <h2>
            Clearphrase&#39;s context menu integration on Windows lets you
            quickly adjust your tone within your favourite writing apps.
          </h2>
        </div>
      </div>
      <div className="w-full h-[450px] flex flex-col justify-center items-center pt-4 space-y-16 bg-gray-100">
        <div className="space-y-2 flex flex-col items-center">
          <h1 className="text-4xl font-bold">Our Users Speak</h1>
          <p className="text-base">
            We have been working with users from various fields
          </p>
        </div>
        <div className="flex justify-center items-center w-full h-full gap-8">
          <div className="w-[30%] h-full flex flex-col justify-center items-center space-y-6">
            <div className="w-full h-[60%] flex flex-col justify-center items-center bg-white rounded-md text-sm">
              <h1 className="font-bold text-lg pb-4">Great Job!</h1>
              <p>The mode option appears to be a cool</p>
              <p>feature that allows for customized user</p>
              <p>preferences.</p>
            </div>
            <img
              src="/blank-profile-picture-973460_1280.webp"
              className="rounded-full h-10 w-10"
            ></img>
          </div>
          <div className="w-[30%] h-full flex flex-col justify-center items-center space-y-6">
            <div className="w-full h-[60%] flex flex-col justify-center items-center bg-white rounded-md text-sm">
              <h1 className="font-bold  text-lg  pb-4">
                Intuitive Replacement
              </h1>
              <p>This works so well, this paraphrases a not so good</p>
              <p>sentence, a very good alternattive to grammarly.</p>
              <p>Works like bliss</p>
            </div>
            <img
              src="/blank-profile-picture-973460_1280.webp"
              className="rounded-full h-10 w-10"
            ></img>
          </div>
          <div className="w-[30%] h-full flex flex-col justify-center items-center space-y-6">
            <div className="w-full h-[60%] flex flex-col justify-center items-center bg-white rounded-md text-sm">
              <h1 className="font-bold  text-lg  pb-4">
                Confident Communication
              </h1>
              <p>ClearPhrase makes it easier for anyone to communicate</p>
              <p>effectively and efficiently, regardless of their writing</p>
              <p>experience or proficiency.</p>
            </div>
            <img
              src="/blank-profile-picture-973460_1280.webp"
              className="rounded-full h-10 w-10"
            ></img>
          </div>
        </div>
      </div>
      <div className="h-20 w-full flex justify-between items-center pl-4 pr-4">
        <div className="flex items-center justify-center">
          <Copyright className="w-4 h-4" />
          <span>2023 Clearphrase.io . All rights reserved</span>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex justify-center items-center">
            <Twitter />
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex justify-center items-center">
            <Facebook />
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex justify-center items-center">
            <Linkedin />
          </div>
        </div>
      </div>
    </div>
  );
}
