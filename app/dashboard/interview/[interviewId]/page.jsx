"use client"
import React, { useEffect, use, useState } from 'react'
import { db } from '../../../../utils/db';
import { MockInterview } from '../../../../utils/schema';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon, Briefcase, Info, PlayCircle, ShieldCheck, Sparkles, Target, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState("");
    const [webcamEnable, SetWebcamEnable] = useState(false);
    const unparam = use(params)

    useEffect(() => {
        GetInterviewDetails();
    }, [])

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, unparam.interviewId))
        setInterviewData(result[0]);
    }

    return (
        <div className='min-h-screen py-10 px-5 md:px-20 lg:px-40 space-y-12 relative overflow-hidden'>
            {/* Background Decorations */}
            <div className='absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none' />
            <div className='absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none' />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-center space-y-4 max-w-2xl mx-auto'
            >
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em]'>
                    <Sparkles className='w-3 h-3' />
                    Ready to shine
                </div>
                <h2 className='font-black text-4xl md:text-5xl lg:text-6xl text-gradient tracking-tight'>Session Setup</h2>
                <p className='text-muted-foreground text-lg leading-relaxed'>Configure your environment and review the target role before we launch your AI session.</p>
            </motion.div>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>
                {/* Left Column: Job & Info (5/12) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className='lg:col-span-5 space-y-6'
                >
                    <div className='glass-card p-8 rounded-[2rem] border-white/5 space-y-8 relative overflow-hidden group'>
                        <div className='absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity'>
                            <Briefcase className='w-24 h-24 text-primary' />
                        </div>

                        <div className='flex items-center gap-3 text-primary'>
                            <div className='p-2.5 rounded-xl bg-primary/10 border border-primary/20'>
                                <Briefcase className='w-5 h-5' />
                            </div>
                            <h2 className='text-xl font-bold tracking-tight'>Job Overview</h2>
                        </div>

                        <div className='space-y-6'>
                            <div className='space-y-1.5'>
                                <p className='text-[10px] text-muted-foreground font-black uppercase tracking-widest'>Target Position</p>
                                <p className='text-2xl font-bold text-foreground'>{interviewData.jobPosition || "..."}</p>
                            </div>
                            <div className='space-y-1.5'>
                                <p className='text-[10px] text-muted-foreground font-black uppercase tracking-widest'>Job Description</p>
                                <p className='text-sm text-foreground/70 leading-relaxed font-medium'>{interviewData.jobDesc || "..."}</p>
                            </div>
                            <div className='flex items-center gap-2 p-3 px-4 rounded-xl bg-white/5 border border-white/10 w-fit'>
                                <Target className='w-4 h-4 text-primary' />
                                <span className='text-xs font-bold'>{interviewData.jobExperience ? `${interviewData.jobExperience} Years Experience` : "..."}</span>
                            </div>
                        </div>
                    </div>

                    <div className='p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-purple-500/5 border border-white/5 relative overflow-hidden group'>
                        <div className='flex items-center gap-3 text-primary font-bold mb-5'>
                            <div className='p-2 rounded-lg bg-primary/20'>
                                <Lightbulb className='w-4 h-4' />
                            </div>
                            <span className='tracking-tight'>Preparation Tips</span>
                        </div>
                        <ul className='space-y-4 font-medium'>
                            <li className='flex gap-3 text-sm text-muted-foreground'>
                                <CheckCircle2 className='w-4 h-4 text-green-500 mt-0.5 shrink-0' />
                                <span>Answer naturally as you would in a real interview.</span>
                            </li>
                            <li className='flex gap-3 text-sm text-muted-foreground'>
                                <CheckCircle2 className='w-4 h-4 text-green-500 mt-0.5 shrink-0' />
                                <span>Ensure your environment is well-lit and quiet.</span>
                            </li>
                            <li className='flex gap-3 text-sm text-muted-foreground'>
                                <ShieldCheck className='w-4 h-4 text-primary mt-0.5 shrink-0' />
                                <span>Recordings are used for AI analysis only and never stored.</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Right Column: Webcam & Start (7/12) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className='lg:col-span-7 flex flex-col gap-8'
                >
                    <div className='w-full aspect-video glass-card rounded-[2rem] border-white/5 relative flex items-center justify-center overflow-hidden bg-black/40 shadow-2xl'>
                        {webcamEnable ? (
                            <Webcam
                                onUserMedia={() => SetWebcamEnable(true)}
                                onUserMediaError={() => SetWebcamEnable(false)}
                                mirrored={true}
                                className='absolute inset-0 w-full h-full object-cover'
                            />
                        ) : (
                            <div className='flex flex-col items-center gap-6 p-10 text-center animate-in fade-in zoom-in duration-500'>
                                <div className='relative'>
                                    <div className='absolute inset-0 bg-primary/20 rounded-full blur-[30px] animate-pulse' />
                                    <div className='relative bg-white/5 p-8 rounded-full border border-white/10'>
                                        <WebcamIcon className='w-16 h-16 text-muted-foreground/40' />
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <h3 className='font-bold text-lg'>Camera & Microphone</h3>
                                    <p className='text-sm text-muted-foreground max-w-[250px]'>Please enable media access to begin the simulated session.</p>
                                </div>
                                <Button
                                    className='h-12 px-8 rounded-xl glass-button bg-primary/10 border-primary/20 hover:bg-primary/20 text-primary font-bold transition-all'
                                    onClick={() => SetWebcamEnable(true)}
                                >
                                    Enable Access
                                </Button>
                            </div>
                        )}

                        {webcamEnable && (
                            <div className='absolute bottom-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 z-20'>
                                <div className='w-2 h-2 bg-red-500 rounded-full animate-pulse' />
                                <span className='text-[10px] font-black uppercase tracking-[0.2em] text-white'>Preview Live</span>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col sm:flex-row items-center justify-between gap-6 p-6 px-8 rounded-3xl bg-white/[0.02] border border-white/5'>
                        <div className='flex items-center gap-4 text-muted-foreground'>
                            <Info className='w-5 h-5 text-primary' />
                            <p className='text-sm font-medium'>Take a deep breath. You've got this!</p>
                        </div>
                        <Link href={'/dashboard/interview/' + unparam.interviewId + '/start'} className='w-full sm:w-auto'>
                            <Button className='w-full sm:w-[220px] h-16 text-lg font-black glass-button bg-primary hover:bg-primary/90 shadow-[0_15px_40px_-10px_rgba(var(--primary-rgb),0.5)] rounded-2xl'>
                                Start Interview
                                <PlayCircle className='w-6 h-6 ml-3' />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Interview
