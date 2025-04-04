"use client"
import React, { useEffect,use, useState } from 'react'
import { db } from '../../../../utils/db';
import { MockInterview } from '../../../../utils/schema';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import Link from 'next/link';

function Interview({params}) {
    const[interviewData,setInterviewData]=useState("");
    const[webcamEnable,SetWebcamEnable]=useState(false);
    const unparam = use(params)
    useEffect(()=>{
         console.log(unparam.interviewId)
        GetInterviewDetails();
    },[])
    const GetInterviewDetails=async()=>{
        
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,unparam.interviewId))
        setInterviewData(result[0]);
        console.log(result[0]);
        
    }
  return (
    <div className='my-10 flex  flex-col items-center'>
        <h2 className='font-bold text-2xl'>Let's get started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

        <div className='flex flex-col my-5 gap-5 '>
            <div className='flex flex-col p-5 rounded-lg border gap-5'>
        <h2 className='text-lg'><strong>Job Role: </strong>{interviewData.jobPosition}</h2>
        <h2 className='text-lg'><strong>Job Description: </strong>{interviewData.jobDesc}</h2>
        <h2 className='text-lg'><strong>Years of Experience: </strong>{interviewData.jobExperience}</h2>
        </div>
        <div className='p-5 border rounded-lg border-amber-300 bg-amber-100'>
           <h2 className='flex gap-2 items-center text-yellow-500'> <Lightbulb/><strong>Information:</strong></h2>
           <h2 className='mt-3 text-yellow-600'>There will be a series of 5 questions which you have to answer based on job description. The result will be evaluated based on how you answered them.
            Note: We will never record your video through your webcam and you can withdraw the access to webcam anytime.
           </h2>
        </div>
       </div>
       <div>
        {webcamEnable? <Webcam
        onUserMedia={()=>SetWebcamEnable(true)}
        onUserMediaError={()=>SetWebcamEnable(false)}
        mirrored={true}
        style={{
            height:300,
            width:300
        }}
        
        />
        :
        <>
        <WebcamIcon className=' rounded-lg border h-72 w-full p-5 my-5 bg-secondary'/>
        <Button  variant='ghost' className='w-full' onClick={()=>SetWebcamEnable(true)}>Enable Web Cam & microphone</Button>
        </>
        }
       </div>

        </div>
        <div className='flex justify-end items-end'>
            <Link href={'/dashboard/interview/'+unparam.interviewId+'/start'}>
        <Button>Start Interview</Button>
        </Link>
        </div>

      
      
    </div>
  )
}

export default Interview