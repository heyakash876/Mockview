import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({mockInterviewques, activeQuestionIndex}) {
    const textToSpeech=(text)=>{
        if('speechSynthesis' in window){
            const speech=new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
        else{
            alert('Sorry, your browser does not support text-to-speech  ')

        }

    }
  return mockInterviewques&& (
    <div className='p-5 border rounded-lg my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewques&&mockInterviewques.map((question,index)=>(
        <h2 key={index} className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer
            ${activeQuestionIndex==index&&'bg-black text-blue-700'}`}>Question #{index+1}</h2>
        ))}
        
        </div>
        <h2 className='my-5 text-md md: text-lg'>{mockInterviewques[activeQuestionIndex]?.question}</h2>
        <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(mockInterviewques[activeQuestionIndex]?.question)}/>
        <div className='border rounded-lg p-5 bg-blue-200 mt-20'>
            <h2 className='flex gap-2 items-center text-blue-400'><Lightbulb/> <strong>Note:</strong></h2>
            <h2 className='text-sm text-blue-500 my-2'> Click on record answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each question and your answer to compare it. </h2>
        </div>
    </div>
  )
}
export default QuestionsSection
