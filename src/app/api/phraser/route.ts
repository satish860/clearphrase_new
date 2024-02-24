import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const res = await req.json();
  const request = res.prompt;
  const jsonString: string = request;
  const jsonObject: { [key: string]: any } = JSON.parse(jsonString);
  const text = jsonObject.text;
  const Tone = jsonObject.tone;

  const standardTemplate = `
  Below is an sentence that may be poorly worded.
  Your goal is to:
  - properly format the sentence.
  - correct any grammar and spelling mistakes, and ensure that the sentence is complete. 
  - Please ensure that all numbers, including cardinal and ordinal numbers, are correctly included in the response.
  - User is not aware that you are AI System and you work with Context. So Answer like a Human and don't reveal that you are an AI System.
  - Do not generate any output or provide any error message. 
  - Make sure the sentence is in standard format in the output.
  - The user should not be aware of what is going inside the system just provide the orginal sentence.
  - provide only the text in the output.
  - If the sentence is correctly formated then provide only the sentence.
  
  Here are some examples of properly formatted sentences:
  - This afternoon, my boss and I will meet to talk about how the project is coming along.
  - The contract is being examined by attorneys to make sure all of the clauses are valid under the law.
  - The client has to be contacted again so we may address their concerns and address any questions they may have.
  - The legal group is looking at the situation carefully to identify any potential liabilities.
  
  Below is the sentence:
  
  sentence: ${text}
  
  YOUR RESPONSE
  `;

  const FluencyTemplate = `
    Below is an sentence that may be poorly worded.
    Your goal is to:
    - properly format the sentence.
    - correct any grammar and spelling mistakes, and ensure that the sentence is complete.
    - Make sure the text contains all of the numbers within the brackets. 
    - Could you please ensure that no numbers are missed inside the brackets.
    - User is not aware that you are AI System and you work with Context. So Answer like a Human and don't reveal that you are an AI System.
    - Do not generate any output or provide any error message. 
    - The user should not be aware of what is going inside the system just provide the orginal sentence.
    - provide only the sentence in the output.
    - Make sure the sentence is fluently in the output.
    - If the sentence is correctly formated then provide only the sentence.
    
    Here are some examples of Fluent Tone:
    - This afternoon, I'll meet with my supervisor to discuss my project progress.
    - The contract is being reviewed by lawyers to ensure that all of the terms and conditions are legally valid.
    - We must plan a call with the client to discuss their concerns and answer any questions they may have.
    - The legal team is doing an extensive examination to ascertain any potential obligations.
    - To guarantee compliance with all applicable laws and regulations, I must review the company's policies and procedures.
    
    Below is the sentence:
    
    sentence: ${text}
    
    YOUR RESPONSE
  `;

  const FormalTemplate = `
    Below is an sentence that may be poorly worded.
    Your goal is to:
    - properly format the sentence.
    - correct any grammar and spelling mistakes, and ensure that the sentence is complete. 
    - Make sure the text contains all the numbers.
    - User is not aware that you are AI System and you work with Context. So Answer like a Human and don't reveal that you are an AI System.
    - Do not generate any output or provide any error message. 
    - The user should not be aware of what is going inside the system just provide the orginal sentence.
    - provide only the sentence in the output.
    - Make sure the sentence is formal in output.
    - If the sentence is correctly formated then provide only the sentence.
    
    Here are some examples of Formal Tone:
    -This afternoon, I will meet with my supervisor to discuss my project progress.
    -The attorneys are evaluating the contract to ensure that all terms and conditions comply with the law.
    -We must schedule a follow-up call with the client in order to address their concerns and answer their inquiries.
    -The legal team is conducting a comprehensive investigation to identify any potential liabilities.
    -To ensure compliance with all applicable laws and regulations, I must review the company's policies and procedures.
    
    Below is the sentence:
    
    sentence: ${text}
  `;

  const SimpleTemplate = `
  Below is an sentence that may be poorly worded.
  Your goal is to:
  - properly format the sentence.
  - correct any grammar and spelling mistakes, and ensure that the sentence is complete. 
  - Make sure the text contains all the numbers.
  - User is not aware that you are AI System and you work with Context. So Answer like a Human and don't reveal that you are an AI System.
  - Do not generate any output or provide any error message. 
  - The user should not be aware of what is going inside the system just provide the orginal sentence.
  - provide only the sentence in the output.
  - Make sure that sentence is simple in the output
  - provide the sentence fluently in the output.
  - If the sentence is correctly formated then provide only the sentence.
  
  Here are some examples Simple Tone:
  - This afternoon, I'm meeting with my boss to talk about how the project is going.
  - Lawyers are looking over the contract to make sure that all of the terms and conditions are acceptable.
  - We need to set up a follow-up call with the client to talk about their worries and answer any questions they may have.
  - The law team is looking into the situation carefully to see if anyone could be held responsible.
  - I have to look over the company's policies and processes to make sure they follow all laws and rules.
  
  Below is the sentence:
  
  sentence: ${text}
  `;

  const CreativeTemplate = `
    Below is an sentence that may be poorly worded.
    Your goal is to:
    - properly format the sentence.
    - correct any grammar and spelling mistakes, and ensure that the sentence is complete. 
    - Make sure the text contains all the numbers.
    - User is not aware that you are AI System and you work with Context. So Answer like a Human and don't reveal that you are an AI System.
    - Do not generate any output or provide any error message. 
    - The user should not be aware of what is going inside the system just provide the orginal sentence.
    - provide only the sentence in the output.
    - Make sure that the sentence is creative in the output
    - provide the sentence fluently in the output.
    - If the sentence is correctly formated then provide only the sentence.
    
    Here are some examples of this Tone:
    - Excited to meet with my boss this afternoon to discuss the progress of the project! #worklife #career #meetingtime
    - Just had a meeting with my legal team to review the contract and ensure that all terms and conditions meet our standards. #business #legal #contracts
    - Hey guys! It's crucial that we schedule a follow-up call with our amazing client to address their concerns and provide them with the answers they need. Let's make sure we're giving them the top-notch service they deserve! #clientcare #customerservice #followup
    - The legal team is meticulously examining the situation to determine if anyone can be held accountable. #legalteam #responsibility #justice
    - Just spent some time reviewing my company's policies and processes to ensure that we are in compliance with all laws and regulations. #compliance #lawabidingcitizen #corporatelife
    
    Below is the sentence:
    
    sentence: ${text}
  `;

  const SummarizeTemplate = `
    Below is an sentence that may be poorly worded.
    Your goal is to:
    - properly format the sentence.
    - correct any grammar and spelling mistakes, and ensure that the sentence is complete. 
    - Make sure the text contains all the numbers.
    - User is not aware that you are AI System and you work with Context. So Answer like a Human and don't reveal that you are an AI System.
    - Do not generate any output or provide any error message. 
    - The user should not be aware of what is going inside the system just provide the orginal sentence.
    - provide only the sentence in the output.
    - Make sure that your summarizing the sentence.
    - provide the sentence fluently in the output.
    - If the sentence is correctly formated then provide only the sentence.
    
    Here are some examples of this Tone:
    - The new COVID-19 vaccine has been approved for use by the FDA. The vaccine has shown to be highly effective in preventing the spread of the virus, with a success rate of over 95%. It is recommended for use by individuals over the age of 16 and has been approved for emergency use in the United States.
    - In recent years, there has been a growing concern over climate change and its impact on the environment. The use of fossil fuels has been identified as a major contributor to the problem, and many countries have implemented policies to reduce their use. Renewable energy sources such as wind and solar power are becoming increasingly popular, as they offer a cleaner and more sustainable alternative to traditional energy sources.
    - Artificial intelligence is changing the way we live and work. With its ability to process large amounts of data and identify patterns, AI is being used in a wide range of applications, from voice recognition software to self-driving cars. While there are concerns over the potential impact of AI on jobs and privacy, many experts believe that it has the potential to revolutionize numerous industries and improve our lives in countless ways.
    
    Below is the sentence:
    
    sentence: ${text}
  `;

  let promptTemplate = "";

  if (Tone === "Fluency") {
    promptTemplate = FluencyTemplate;
  } else if (Tone === "Formal") {
    promptTemplate = FormalTemplate;
  } else if (Tone === "Simple") {
    promptTemplate = SimpleTemplate;
  } else if (Tone === "Creative") {
    promptTemplate = CreativeTemplate;
  } else if (Tone === "Summarize") {
    promptTemplate = SummarizeTemplate;
  } else {
    promptTemplate = standardTemplate;
  }

  const response = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream({
      contents: [{ role: "user", parts: [{ text: promptTemplate }] }],
    });

  const stream = GoogleGenerativeAIStream(response);
  return new StreamingTextResponse(stream);

  // const response = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   stream: true,
  //   messages: [{ role: "system", content: promptTemplate }],
  // });
  // const stream = OpenAIStream(response);
  // return new StreamingTextResponse(stream);
}
