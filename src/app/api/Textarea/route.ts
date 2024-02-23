import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const res = await req.json();
    const Question = res.Question;
    const Tone = res.Tones;
    console.log(Question)
    console.log(Tone)
return NextResponse.json("created")
}