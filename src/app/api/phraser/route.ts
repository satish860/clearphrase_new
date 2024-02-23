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
    
    Here are some examples of properly formatted sentences:
    - This afternoon, my boss and I will meet to talk about how the project is coming along.
    - The contract is being examined by attorneys to make sure all of the clauses are valid under the law.
    - The client has to be contacted again so we may address their concerns and address any questions they may have.
    - The legal group is looking at the situation carefully to identify any potential liabilities.
    
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
    
    Here are some examples of properly formatted sentences:
    - This afternoon, my boss and I will meet to talk about how the project is coming along.
    - The contract is being examined by attorneys to make sure all of the clauses are valid under the law.
    - The client has to be contacted again so we may address their concerns and address any questions they may have.
    - The legal group is looking at the situation carefully to identify any potential liabilities.
    
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
  
  Here are some examples of properly formatted sentences:
  - This afternoon, my boss and I will meet to talk about how the project is coming along.
  - The contract is being examined by attorneys to make sure all of the clauses are valid under the law.
  - The client has to be contacted again so we may address their concerns and address any questions they may have.
  - The legal group is looking at the situation carefully to identify any potential liabilities.
  
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
    
    Here are some examples of properly formatted sentences:
    - This afternoon, my boss and I will meet to talk about how the project is coming along.
    - The contract is being examined by attorneys to make sure all of the clauses are valid under the law.
    - The client has to be contacted again so we may address their concerns and address any questions they may have.
    - The legal group is looking at the situation carefully to identify any potential liabilities.
    
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
    
    Here are some examples of properly formatted sentences:
    - This afternoon, my boss and I will meet to talk about how the project is coming along.
    - The contract is being examined by attorneys to make sure all of the clauses are valid under the law.
    - The client has to be contacted again so we may address their concerns and address any questions they may have.
    - The legal group is looking at the situation carefully to identify any potential liabilities.
    
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
