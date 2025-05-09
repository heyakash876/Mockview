import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function dashboard() {
  return (
    <div >
      <h2 className='font-bold text-2xl'>Dashboard</h2>
      <h2 className='text-gray-600'>Create and Start your AI Mockup</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>
      <InterviewList/>
    </div>
  )
}

export default dashboard