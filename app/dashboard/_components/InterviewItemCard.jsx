import React from 'react'
import { Button } from '../../../components/ui/button'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, Briefcase, ChevronRight, Trash2, Loader2 } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview, UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { useState } from 'react'

function InterviewItemCard({ interview, refreshData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onStart = () => {
    router.push('/dashboard/interview/' + interview?.mockId)
  }
  const onFeedbackPress = () => {
    router.push('/dashboard/interview/' + interview.mockId + '/feedback');
  }

  const onDeletePress = async () => {
    setLoading(true);
    try {
      // Delete associated answers first (foreign key reference logic)
      await db.delete(UserAnswer).where(eq(UserAnswer.mockIdRef, interview.mockId));
      // Delete the interview session
      await db.delete(MockInterview).where(eq(MockInterview.mockId, interview.mockId));

      toast.success('Interview deleted successfully');
      refreshData && refreshData();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete interview');
    } finally {
      setLoading(false);
    }
  }

  const onDelete = (e) => {
    e.stopPropagation();
    toast.warning('Are you sure?', {
      description: 'This will permanently delete this interview session.',
      action: {
        label: 'Delete',
        onClick: onDeletePress
      },
    });
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className='border border-white/5 glass-card rounded-xl p-5 flex flex-col gap-3 group transition-all duration-300'
    >
      <div className='flex justify-between items-start'>
        <div className='bg-primary/10 p-2 rounded-lg'>
          <Briefcase className='w-5 h-5 text-primary' />
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-[10px] text-muted-foreground bg-white/5 px-2 py-1 rounded-full'>
            ID: {interview?.mockId?.slice(0, 8)}
          </span>
          <button
            onClick={onDelete}
            disabled={loading}
            className='p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500/70 hover:text-red-500 transition-all border border-red-500/10'
          >
            {loading ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <Trash2 className='w-4 h-4' />
            )}
          </button>
        </div>
      </div>

      <h2 className='font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1'>
        {interview?.jobPosition}
      </h2>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <Calendar className='w-4 h-4' />
          <span>{interview?.jobExperience} Years Experience</span>
        </div>
        <div className='flex items-center gap-2 text-[12px] text-muted-foreground/60'>
          <span>Created: {interview.createdAt}</span>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3 mt-4'>
        <Button
          size='sm'
          variant='outline'
          className='w-full border-white/10 hover:bg-white/5 text-xs h-9'
          onClick={onFeedbackPress}
        >
          Feedback
        </Button>
        <Button
          onClick={onStart}
          size='sm'
          className='w-full glass-button bg-primary hover:bg-primary/90 text-xs h-9 font-semibold'
        >
          Start Session
          <ChevronRight className='w-3 h-3 ml-1' />
        </Button>
      </div>
    </motion.div>
  )
}

export default InterviewItemCard