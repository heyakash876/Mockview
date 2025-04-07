"use client"
import React, { use, useEffect, useState } from 'react'
import { db } from '../../../../../utils/db';
import { eq } from 'drizzle-orm';
import { MockInterview } from '../../../../../utils/schema';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection'
import dynamic from 'next/dynamic';
import { Button } from '../../../../../components/ui/button';
import Link from 'next/link';


function StartInterview({params}) {
  const [interviewData,setInterviewData]=useState();
  const[mockInterviewques,setmockInterviewques]=useState();
  const [activeQuesIndex,setActiveQuesIndex]=useState(0);
  const mockId= useState() ;
  const unparam = use(params);
  
  
  useEffect(()=>{
    GetInterviewDetails();

  },[]);
  
  const GetInterviewDetails=async()=>{
      
    const result = await db.select().from(MockInterview)
    .where(eq(MockInterview.mockId,unparam.interviewId))
    const jsonMockresp=JSON.parse(result[0].jsonMockResp);
    setmockInterviewques(jsonMockresp);
    setInterviewData(result[0]);
   
    
   
  }
  console.log(interviewData)

 return (
  <div>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
      {/*Ques*/} 
      <QuestionsSection mockInterviewques={mockInterviewques} 
      activeQuestionIndex={activeQuesIndex}/>
      
      


      {/* Video/audio recording*/}
      {interviewData && (
      <RecordAnswerSection
        mockInterviewques={mockInterviewques}
        activeQuesIndex={activeQuesIndex}
        interviewData={interviewData}
      />
    
    )}
    
    </div>
    <div className='flex justify-end gap-6'>
      {activeQuesIndex>0&&<Button onClick={()=>setActiveQuesIndex(activeQuesIndex-1)} >
        Previous Ques</Button>}
      {activeQuesIndex!=mockInterviewques?.length-1&&<Button onClick={()=>setActiveQuesIndex(activeQuesIndex+1)}>
        Next Ques</Button>}
     {activeQuesIndex==mockInterviewques?.length-1&&
     <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}> <Button>
      End Interview</Button> </Link>}
    </div>

    </div>
    

  
  )
}

export default StartInterview