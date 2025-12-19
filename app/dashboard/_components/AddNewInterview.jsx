import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { chatSession } from '@/utils/GeminiApi'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuid4 } from 'uuid'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoaderCircle, Plus } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false)
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExp, setJobExp] = useState("");
  const [loading, setloading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const onSubmit = async (e) => {
    setloading(true)
    e.preventDefault()

    const InputPrompt = "Give me " + process.env.NEXT_PUBLIC_QUES_COUNT + " interview ques and answers in json format that can be asked in an interview the answer should include how the person should answer it personifiying the person ,the ques and ans should be based on information Job role: " + jobPosition + " , Job description: " + jobDesc + " ,years of experience : " + jobExp + " , also the json fields should be question and answers only. Please follow strict json formatting rules."

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJSonResp = (result.response.text()).replace('```json', '').replace('```', '')

      if (MockJSonResp) {
        const resp = await db.insert(MockInterview)
          .values({
            mockId: uuid4(),
            jsonMockResp: MockJSonResp,
            jobDesc: jobDesc,
            jobExperience: jobExp,
            jobPosition: jobPosition,
            createdBy: user?.email,
            createdAt: moment().format('DD-MM-YYYY')
          }).returning({ mockId: MockInterview.mockId });

        if (resp) {
          setOpenDialog(false);
          router.push('/dashboard/interview/' + resp[0]?.mockId)
        }
      }
    } catch (error) {
      console.error("Error generating interview:", error);
    } finally {
      setloading(false);
    }
  }

  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.02, translateY: -5 }}
        whileTap={{ scale: 0.98 }}
        className='p-10 border rounded-xl glass-card flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 group neon-border'
        onClick={() => setOpenDialog(true)}
      >
        <div className='bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors'>
          <Plus className='text-primary w-8 h-8' />
        </div>
        <h2 className='text-lg font-semibold text-foreground/80 group-hover:text-primary transition-colors' >Add New Interview</h2>
      </motion.div>

      <AnimatePresence>
        {openDialog && (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className='max-w-2xl glass-card border-white/5'>
              <DialogHeader>
                <DialogTitle className='text-2xl font-bold text-gradient'>Tailor Your AI Mock Interview</DialogTitle>
                <DialogDescription className='text-muted-foreground'>
                  Provide the details below to generate a hyper-realistic interview experience.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={onSubmit} className='space-y-6 mt-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-foreground/70'>Job Role/Position</label>
                  <Input
                    placeholder='Ex. Senior Frontend Lead'
                    required
                    className='bg-white/5 border-white/10 focus:border-primary/50 transition-all'
                    onChange={(event) => setJobPosition(event.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-foreground/70'>Job Description & Tech Stack</label>
                  <Textarea
                    placeholder='Ex. React, Next.js, System Design, Team Management...'
                    required
                    className='bg-white/5 border-white/10 focus:border-primary/50 transition-all min-h-[120px]'
                    onChange={(event) => setJobDesc(event.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-foreground/70'>Years of Experience</label>
                  <Input
                    placeholder='5'
                    type='number'
                    min='0'
                    max='50'
                    required
                    className='bg-white/5 border-white/10 focus:border-primary/50 transition-all'
                    onChange={(event) => setJobExp(event.target.value)}
                  />
                </div>

                <div className='flex gap-4 justify-end pt-4'>
                  <Button
                    type='button'
                    variant="ghost"
                    className='hover:bg-white/5'
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    disabled={loading}
                    className='glass-button bg-primary hover:bg-primary/90 min-w-[140px]'
                  >
                    {loading ? (
                      <span className='flex items-center gap-2'>
                        <LoaderCircle className='animate-spin w-4 h-4' />
                        Generating...
                      </span>
                    ) : 'Start Session'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AddNewInterview
