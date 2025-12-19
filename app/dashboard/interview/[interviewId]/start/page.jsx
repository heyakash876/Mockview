"use client"
import React, { use, useEffect, useState } from 'react'
import { db } from '../../../../../utils/db';
import { eq } from 'drizzle-orm';
import { MockInterview } from '../../../../../utils/schema';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection'
import { Button } from '../../../../../components/ui/button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, StopCircle, RefreshCcw } from 'lucide-react';

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewques, setmockInterviewques] = useState();
  const [activeQuesIndex, setActiveQuesIndex] = useState(0);
  const unparam = use(params);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, unparam.interviewId))
    const jsonMockresp = JSON.parse(result[0].jsonMockResp);
    setmockInterviewques(jsonMockresp);
    setInterviewData(result[0]);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='p-5 md:p-10'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/*Ques*/}
        <QuestionsSection mockInterviewques={mockInterviewques}
          activeQuestionIndex={activeQuesIndex} />

        {/* Video/audio recording*/}
        <AnimatePresence mode='wait'>
          {interviewData && (
            <motion.div
              key="recording-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <RecordAnswerSection
                mockInterviewques={mockInterviewques}
                activeQuesIndex={activeQuesIndex}
                interviewData={interviewData}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className='flex justify-between items-center mt-10 p-5 glass-card rounded-xl'>
        <div className='flex gap-3'>
          <Button
            variant="ghost"
            onClick={() => setActiveQuesIndex(activeQuesIndex - 1)}
            disabled={activeQuesIndex === 0}
            className='hover:bg-white/5'
          >
            <ChevronLeft className='w-4 h-4 mr-2' />
            Previous
          </Button>
        </div>

        <div className='flex gap-3'>
          {activeQuesIndex < mockInterviewques?.length - 1 && (
            <Button
              onClick={() => setActiveQuesIndex(activeQuesIndex + 1)}
              className='glass-button bg-primary hover:bg-primary/90 min-w-[120px]'
            >
              Next Question
              <ChevronRight className='w-4 h-4 ml-2' />
            </Button>
          )}

          {activeQuesIndex === mockInterviewques?.length - 1 && (
            <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
              <Button className='glass-button bg-destructive hover:bg-destructive/90 min-w-[140px]'>
                <StopCircle className='w-4 h-4 mr-2' />
                End Interview
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default StartInterview
