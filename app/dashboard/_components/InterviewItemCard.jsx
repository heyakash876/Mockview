import React from 'react'
import { Button } from '../../../components/ui/button'
import { useRouter } from 'next/navigation'

function InterviewItemCard({interview})
 {
    const router =useRouter();
    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }
    const onFeedbackPress=()=>{
        router.push('/dashboard/interview/'+interview.mockId+'/feedback');
    }

  return (
    <div className='border shadow-sm rounded-lg p-3'>
    <h2 className='font-bold text-blue-600'>{interview?.jobPosition}</h2>
    <h2 className='text=sm text-gray-600'>{interview?.jobExperience} Year Experience</h2>
    <h2 className='text=xsm text-gray-400'>Created On: {interview.createdAt}</h2>
    <div className='flex justify-between gap-5 mt-2'>
        
        <Button size='sm' variant='outline' className='w-full cursor-pointer' onClick={onFeedbackPress}>Feedback</Button>
        <Button  onClick={onStart} size='sm'  className='w-full cursor-pointer'>start</Button>
    </div>
    </div>
  )
}

export default InterviewItemCard