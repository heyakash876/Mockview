import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

function QuestionsSection({ mockInterviewques, activeQuestionIndex }) {
    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
        else {
            alert('Sorry, your browser does not support text-to-speech')
        }
    }

    return mockInterviewques && (
        <div className='p-8 glass-card rounded-xl border-white/5 my-10 flex flex-col gap-6'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {mockInterviewques && mockInterviewques.map((question, index) => (
                    <motion.h2
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer transition-all duration-300 border
                        ${activeQuestionIndex == index
                                ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)]'
                                : 'bg-white/5 text-muted-foreground border-white/5 hover:bg-white/10'}`}
                    >
                        Question #{index + 1}
                    </motion.h2>
                ))}
            </div>

            <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg md:text-xl font-semibold text-foreground/90 leading-relaxed'>
                        {mockInterviewques[activeQuestionIndex]?.question}
                    </h2>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className='bg-primary/10 p-2 rounded-full cursor-pointer hover:bg-primary/20 transition-colors'
                        onClick={() => textToSpeech(mockInterviewques[activeQuestionIndex]?.question)}
                    >
                        <Volume2 className='w-5 h-5 text-primary' />
                    </motion.div>
                </div>
            </div>

            <div className='mt-10 p-5 rounded-xl bg-primary/5 border border-primary/10 relative overflow-hidden group'>
                <div className='absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity'>
                    <Lightbulb className='w-12 h-12 text-primary' />
                </div>
                <h2 className='flex gap-2 items-center text-primary font-bold mb-2'>
                    <Lightbulb className='w-5 h-5' />
                    Pro Tip:
                </h2>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                    Click on "Record Answer" when you're ready to respond. We'll analyze your speech and provide tailored feedback, including sentiment analysis and technical accuracy comparisons, to help you improve.
                </p>
            </div>
        </div>
    )
}
export default QuestionsSection
