"use client"
import React, { useState } from 'react'
import { Input } from '../../../components/input'
import {chatSession} from '../../../utils/GeminiApi'
import {db} from '../../../utils/db'
import { MockInterview } from '../../../utils/schema'
import { v4 as uuid4 } from 'uuid'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog'
import { LoaderCircle, Pointer } from 'lucide-react'
import { Textarea } from '../../../components/ui/textarea'
import { Button } from '../../../components/ui/button'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
  const [openDialog, setOpenDialog]=useState(false)
  const[jobPosition, setJobPosition]=useState("");
  const[jobDesc, setJobDesc]=useState("");
  const[jobExp, setJobExp]=useState("");
  const[loading,setloading]=useState(false);
  const[jsonresp,setjsonresp]=useState([]);
  const {user}=useUser();
  const router=useRouter();

  const onSubmit=async (e)=>{
    setloading(true)
    e.preventDefault()
    console.log(jobDesc,jobExp,jobPosition)
    const InputPrompt="Give me "+process.env.NEXT_PUBLIC_QUES_COUNT+" interview ques and answers in json format that can be asked in an interview the answer should include how the person should answer it personifiying the person ,the ques and ans should be based on information Job role: "+jobPosition+" , Job description: "+jobDesc+" ,years of experience : "+jobExp+" , also the json fields should be question and answers only"
    const result= await chatSession.sendMessage(InputPrompt);
    const MockJSonResp=(result.response.text()).replace('```json','').replace('```','')
    console.log(JSON.parse(MockJSonResp));
    setjsonresp(MockJSonResp);
    if(MockJSonResp){
    const resp=await db.insert(MockInterview)
    .values({
      mockId:uuid4(),
      jsonMockResp:MockJSonResp,
      jobDesc:jobDesc,
      jobExperience:jobExp,
      jobPosition:jobPosition,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD-MM-YYYY')

    }).returning({mockId:MockInterview.mockId});
    console.log("inserted id:",resp)
    if(resp){
      setOpenDialog(false);
      router.push('/dashboard/interview/'+resp[0]?.mockId)
    }
  }
  else{
    console.log(error);
  }
    setloading(false);
  }
 
  
  
  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale105 hover:shadow-md cursor-pointer transition-all'
      onClick={()=>setOpenDialog(true)} >
        <h2 className='text-lg text-center' >+Add New</h2>
      </div>
    
      <div>
      <Dialog open={openDialog}>
  
  <DialogContent  className='max-w-2xl'>
    <DialogHeader >
      <DialogTitle className='text-2xl'>Tell us more about the job you are interviewing for</DialogTitle>
      <DialogDescription>
        <div >
          Add details about your job position/role, Job Description
          
        </div>
      </DialogDescription>
      </DialogHeader >
      <form onSubmit={onSubmit}>
      <div className='mt-7 my-2'>
            <label required>Job Role/Position</label>
            <Input placeholder='Ex. Full Stack Developer'  required
            onChange={(event)=>setJobPosition(event.target.value)} />
          </div>
          <div className=' my-3'>
            <label>Job Description (in short)</label>
            <Textarea placeholder='Ex. React, Angular, Node.js,Next.js, MySQL etc.' required
             onChange={(event)=>setJobDesc(event.target.value)}/>
          </div>
          <div  className='my-2'>
            <label>Years of Experience</label>
            <Input placeholder='5' type='number' min='0' max='50' required
             onChange={(event)=>setJobExp(event.target.value)}/>
          </div>
          
      <div className='flex gap-5 justify-end'>
        <Button type='button' variant="ghost" onClick={()=>setOpenDialog(false) }>Cancel</Button>
        <Button type='submit' disabled={loading}>
          {loading?
          <> 
          <LoaderCircle className='animate-spin'/>Generating</>:'Start Interview' }
          </Button>
        </div>
        
    </form>
  </DialogContent>
</Dialog>

      </div>
     
    </div>
  )
}

export default AddNewInterview