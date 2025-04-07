"use client"
import React, { use, useEffect, useState } from 'react'
import { UserAnswer } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import { db } from '../../../../../utils/db'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../../../../components/ui/collapsible'
import { index } from 'drizzle-orm/gel-core'
import { ChevronDown, ChevronDownCircleIcon, ChevronLastIcon, ChevronsDownUp, ChevronsUpDown } from 'lucide-react'

import { Button } from '../../../../../components/ui/button'
import { useRouter } from 'next/navigation'


function Feedback({params}) {
     const unparam = use(params);
     const router = useRouter();
     const[feedbackList,setFeedbackList]=useState([]);
    useEffect(()=>{
        GetFeedback();
    },[])
    const GetFeedback=async()=>{
        const result=await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef,unparam.interviewId))
        .orderBy(UserAnswer.id);
        console.log(result);
setFeedbackList(result)

    }
    const totalRating = feedbackList.reduce((acc, curr) => acc + Number(curr.rating), 0);
const averageRating = (totalRating / feedbackList.length).toFixed(1);

    return(
    <div className='p-10'>
        <h2 className='text-3xl font-bold text-green-600'>Congratulations! You successfully completed the mock interview.</h2>
        <h2 className='font-semibold text-2xl'>Here is your feedback...</h2>
       <h2 className='text-blue-600 text-lg my-3'>Your overall rating:  <strong>{averageRating}/5</strong></h2>
       <h2 className='text-sm text-gray-500' >Find below the interview questions with their correct answer and how you answered them:</h2>
       {feedbackList&&feedbackList.map((item,index)=>( <Collapsible className='mt-7' key={index}>
  <CollapsibleTrigger className='p-2 gap-7 w-full bg-secondary rounded-2xl my-2 text-left flex justify-between'>{item.question}<ChevronDown className='h-5 w-7'/></CollapsibleTrigger>
  <CollapsibleContent>
   <div className='flex flex-col gap-2'>
    <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: </strong>{item.rating}</h2>
    <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-700'><strong> Your Answer:</strong>  {item.userAns}</h2>
    <h2 className='p-2 border rounded-lg bg-green-100 text-sm text-green-700'><strong> Correct Answer:</strong>  {item.correctAns}</h2>
    <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-700'><strong> Feedback:</strong>  {item.feedback}</h2>
   </div>
  </CollapsibleContent>
</Collapsible>))}
      <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>

    </div>
  )
}

export default Feedback