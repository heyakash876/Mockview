"use client"
import React, { useEffect, useState } from 'react'
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import { desc, eq } from 'drizzle-orm';
import InterviewItemCard from './InterviewItemCard';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

function InterviewList() {

  const { user } = useAuth();
  const [InterviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && GetInterviewList();
  }, [user])

  const GetInterviewList = async () => {
    setLoading(true);
    const result = await db.select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.email))
      .orderBy(desc(MockInterview.id));
    setInterviewList(result);
    setLoading(false);
  }

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-2xl text-gradient mb-6'>
        Previous Sessions
      </h2>

      {loading ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {[1, 2, 3].map((item, index) => (
            <div key={index} className='h-[200px] w-full bg-white/5 rounded-xl animate-pulse-slow' />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          {InterviewList && InterviewList.map((interview, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <InterviewItemCard
                interview={interview}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {!loading && InterviewList.length === 0 && (
        <div className='text-center py-10 glass-card rounded-xl'>
          <p className='text-muted-foreground'>No interviews found. Start your first session above!</p>
        </div>
      )}
    </div>
  )
}

export default InterviewList