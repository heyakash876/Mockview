"use client"
import React, { use, useEffect, useState } from 'react'
import { UserAnswer } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import { db } from '../../../../../utils/db'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../../../../components/ui/collapsible'
import { ChevronDown, Home, Star, CheckCircle2, MessageSquare, Target } from 'lucide-react'
import { Button } from '../../../../../components/ui/button'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

function Feedback({ params }) {
  const unparam = use(params);
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetFeedback();
  }, [])

  const GetFeedback = async () => {
    setLoading(true);
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, unparam.interviewId))
      .orderBy(UserAnswer.id);
    setFeedbackList(result)
    setLoading(false);
  }

  const totalRating = feedbackList.reduce((acc, curr) => acc + Number(curr.rating), 0);
  const averageRating = (totalRating / feedbackList.length).toFixed(1);

  return (
    <div className='p-10 md:px-20 lg:px-40 min-h-screen'>
      {feedbackList?.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 glass-card rounded-2xl border-white/5'>
          <MessageSquare className='w-16 h-16 text-muted-foreground/30 mb-4' />
          <h2 className='text-muted-foreground text-xl font-medium'>No feedback found for this session.</h2>
          <Button onClick={() => router.replace('/dashboard')} className='mt-6 glass-button bg-primary'>
            Return to Dashboard
          </Button>
        </div>
      ) : (
        <div className='space-y-10'>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className='space-y-4'
          >
            <div className='flex items-center gap-3 text-primary bg-primary/10 w-fit px-4 py-1 rounded-full border border-primary/20'>
              <CheckCircle2 className='w-4 h-4' />
              <span className='text-xs font-bold uppercase tracking-widest'>Interview Completed</span>
            </div>
            <h2 className='text-4xl md:text-5xl font-extrabold text-gradient'>Performance Analysis</h2>
            <p className='text-muted-foreground text-lg max-w-2xl'>We've analyzed your responses. Review the detailed feedback below to identify strengths and areas for growth.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className='grid grid-cols-1 md:grid-cols-3 gap-6'
          >
            <div className='glass-card p-6 rounded-2xl border-white/5 flex flex-col items-center justify-center gap-2 relative overflow-hidden group'>
              <Star className='w-8 h-8 text-yellow-500 absolute -top-2 -right-2 opacity-10 group-hover:scale-150 transition-transform' />
              <p className='text-xs text-muted-foreground uppercase tracking-widest'>Average Score</p>
              <h2 className='text-4xl font-black text-foreground'>{averageRating}<span className='text-xl text-muted-foreground font-medium'>/10</span></h2>
            </div>
            <div className='glass-card p-6 rounded-2xl border-white/5 flex flex-col items-center justify-center gap-2'>
              <p className='text-xs text-muted-foreground uppercase tracking-widest'>Total Questions</p>
              <h2 className='text-4xl font-black text-foreground'>{feedbackList.length}</h2>
            </div>
            <div className='flex items-center justify-center'>
              <Button onClick={() => router.replace('/dashboard')} className='h-14 px-8 rounded-xl glass-button bg-primary/10 border-primary/20 hover:bg-primary/20 text-primary font-bold w-full'>
                <Home className='w-5 h-5 mr-3' />
                Back to Dashboard
              </Button>
            </div>
          </motion.div>

          <div className='space-y-6'>
            <h3 className='text-2xl font-bold flex items-center gap-3'>
              <Target className='w-6 h-6 text-primary' />
              Detailed Breakdown
            </h3>

            <div className='space-y-4'>
              {feedbackList.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Collapsible className='group'>
                    <CollapsibleTrigger className='w-full text-left'>
                      <div className='glass-card p-4 rounded-xl border-white/5 hover:border-primary/30 transition-all flex justify-between items-center cursor-pointer'>
                        <div className='flex items-center gap-4'>
                          <span className='w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-xs font-bold text-muted-foreground'>
                            {index + 1}
                          </span>
                          <span className='font-medium text-foreground/90 group-data-[state=open]:text-primary transition-colors line-clamp-1'>
                            {item.question}
                          </span>
                        </div>
                        <ChevronDown className='w-5 h-5 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform' />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className='mt-2'>
                      <div className='glass-card p-6 rounded-xl border-white/5 space-y-6 bg-white/[0.02]'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div className='space-y-4'>
                            <div className='space-y-2'>
                              <div className='flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary'>
                                <MessageSquare className='w-3 h-3' />
                                Your Answer
                              </div>
                              <div className='p-4 rounded-lg bg-primary/5 border border-primary/10 text-sm text-foreground/80 leading-relaxed italic border-l-4 markdown-content'>
                                <ReactMarkdown>
                                  {item.userAns}
                                </ReactMarkdown>
                              </div>
                            </div>
                            <div className='space-y-2'>
                              <div className='flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-500'>
                                <CheckCircle2 className='w-3 h-3' />
                                Model Answer
                              </div>
                              <div className='p-4 rounded-lg bg-green-500/5 border border-green-500/10 text-sm text-foreground/80 leading-relaxed border-l-4 border-green-500 markdown-content'>
                                <ReactMarkdown>
                                  {item.correctAns}
                                </ReactMarkdown>
                              </div>
                            </div>
                          </div>

                          <div className='p-6 rounded-xl bg-white/[0.03] border border-white/5 space-y-4'>
                            <div className='flex justify-between items-center'>
                              <span className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>AI Rating</span>
                              <span className='text-2xl font-black text-primary'>{item.rating}</span>
                            </div>
                            <div className='space-y-2'>
                              <span className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>AI Feedback</span>
                              <div className='text-sm text-foreground/70 leading-relaxed markdown-content'>
                                <ReactMarkdown>
                                  {item.feedback}
                                </ReactMarkdown>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Feedback
