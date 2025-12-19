"use client";
import useSpeechToText from "react-hook-speech-to-text";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Mic, StopCircleIcon, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiApi";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useAuth } from "@/context/AuthContext";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";

function RecordAnswerSection({ mockInterviewques, activeQuesIndex, interviewData }) {
  const { user } = useAuth();
  const [loading, setloading] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  const {
    error,
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
    const combinedTranscript = results.map(res => res.transcript).join(' ');
    setUserAnswer(combinedTranscript);
  }, [results]);

  useEffect(() => {
    if (isRecording) {
      stopSpeechToText();
    }
    setUserAnswer("");
    setResults([]);
  }, [activeQuesIndex]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [isRecording]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
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
      const mockJsonResp = result.response.text().replace('```json', '').replace('```', '').trim();

      const JsonFeedbackResp = JSON.parse(mockJsonResp);
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewques[activeQuesIndex]?.question,
        correctAns: mockInterviewques[activeQuesIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.email,
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
    <div className="flex items-center justify-center flex-col gap-10">
      <div className="relative group">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col justify-center items-center bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 overflow-hidden shadow-2xl"
        >
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            {isRecording && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full border border-red-500/50"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Live</span>
              </motion.div>
            )}
          </div>

          <div className="relative z-10 w-full max-w-[500px] aspect-video flex items-center justify-center">
            <Image
              src={"/214713.png"}
              alt="webcam"
              width={200}
              height={200}
              className="absolute opacity-20 pointer-events-none"
            />
            <Webcam
              mirrored={true}
              className="rounded-xl w-full h-full object-cover"
              style={{ zIndex: 10 }}
            />
          </div>
        </motion.div>

        {/* Floating background effects */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button
          disabled={loading}
          onClick={StartStopRecording}
          className={`h-16 px-10 rounded-full text-lg font-bold transition-all duration-300 glass-button
            ${isRecording
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]'
              : 'bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]'}`}
        >
          {isRecording ? (
            <span className="flex items-center gap-3">
              <StopCircleIcon className="w-6 h-6" />
              Stop Recording
            </span>
          ) : (
            <span className="flex items-center gap-3">
              <Mic className="w-6 h-6" />
              Record Answer
            </span>
          )}
        </Button>

        {userAnswer && !isRecording && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-muted-foreground text-sm italic max-w-md text-center"
          >
            " {userAnswer.slice(0, 100)}... "
          </motion.p>
        )}
      </div>
    </div>
  );
}

export default RecordAnswerSection;
