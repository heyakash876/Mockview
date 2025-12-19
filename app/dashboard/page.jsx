"use client"
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
import { motion } from 'framer-motion'

function Dashboard() {
  return (
    <div className='p-10 md:px-20 lg:px-32 min-h-screen'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='font-bold text-4xl text-gradient'>Dashboard</h2>
        <h2 className='text-muted-foreground mt-2 text-lg'>Transform your preparation with AI-powered mock interviews</h2>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-3 my-10 gap-5'>
        <AddNewInterview />
      </div>

      <InterviewList />
    </div>
  )
}

export default Dashboard