"use client";
import useSpeechToText from "react-hook-speech-to-text";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../../../../../../components/ui/button";
import { Mic, StopCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "../../../../../../utils/GeminiApi";
import { db } from "../../../../../../utils/db";
import { UserAnswer } from "../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnswerSection(
 { mockInterviewques,
  activeQuesIndex,
  interviewData}
) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setloading] = useState(false);
  

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults

  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);
  useEffect(()=>{
    if(!isRecording&&userAnswer.length>10){
      UpdateUserAnswer();
    }
    

  },[userAnswer]);

 
  const StartStopRecording = async () => {
    if (isRecording) {
     
      console.log(userAnswer?.length);
      await stopSpeechToText();
     
     
     
    } else {
      startSpeechToText();
    }
  };
  
  const UpdateUserAnswer=async()=>{
    setloading(true);
    try {
    const feedbackPrompt =
    "Question:" +
    mockInterviewques[activeQuesIndex]?.question +
    ", User Answer" +
    userAnswer +
    "Depends on question and user answer for given interview question" +
    "please give us rating for answer and feedback for area of improvement if any" +
    "in just 3 to 5 lines to improve it in JSON format with rating field and feedback. Do follow strict json format and dont include fraction rating like 3/5.This is text to speech so avoid considering spell mistakes and answer structure ";
  const result = await chatSession.sendMessage(feedbackPrompt);
  const mockJsonResp = result.response
  .text()
  .replace('```json', '')
  .replace('```', '')
  .trim();
console.log(mockJsonResp);
  
  const JsonFeedbackResp = JSON.parse(mockJsonResp);
  const resp = await db.insert(UserAnswer).values({
    mockIdRef: interviewData?.mockId,
    question: mockInterviewques[activeQuesIndex]?.question,
    correctAns: mockInterviewques[activeQuesIndex]?.answer,
    userAns: userAnswer,
    feedback: JsonFeedbackResp?.feedback,
    rating: JsonFeedbackResp?.rating,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    createdAt: moment().format("DD-MM-YYYY"),
  });
  if (resp) {
    toast.success("Answer recorded ✅");
    setUserAnswer("");
    setResults([]);
  }
} catch (err) {
  console.error("Failed to record answer or parse JSON:", err);
  toast.error("Failed to record answer. Please try again.");
} finally {
  setloading(false);
}
  };
  return (
    <div className="flex items-center justify-center flex-col">
      <div className=" mt-20 flex flex-col justify-center items-center bg-secondary  rounded-lg p-5">
        <Image
          src={"/214713.png"}
          alt="webcam"
          width={200}
          height={200}
          className="absolute"
        ></Image>
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10 cursor-pointer"
        onClick={StartStopRecording}
      >
        {isRecording ?(
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircleIcon />
            Stop Recording
          </h2>
        ) : (
          "Start Record "
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
