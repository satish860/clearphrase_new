import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const res = await req.json();
    const Question = res.Question;
    console.log(Question)
return NextResponse.json("created")
}