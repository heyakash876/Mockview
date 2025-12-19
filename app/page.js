"use client"
import React from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  BrainCircuit,
  Target,
  Rocket,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import LandingHeader from './_components/LandingHeader'
import InteractiveBackground from '@/components/InteractiveBackground'

export default function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  const features = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-primary" />,
      title: "AI-Powered Analysis",
      description: "Our advanced models analyze your responses in real-time, providing instant feedback on clarity and content."
    },
    {
      icon: <Target className="w-6 h-6 text-purple-500" />,
      title: "Role-Specific Prep",
      description: "Get tailored questions for software engineering, product management, design, and more."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-yellow-500" />,
      title: "Reality Check",
      description: "Simulate real interview conditions with camera recording and speech-to-text processing."
    }
  ]

  return (
    <div className='min-h-screen selection:bg-primary/30'>
      <InteractiveBackground />
      <LandingHeader />

      <main className='px-8 md:px-20 lg:px-32 py-20 space-y-32'>
        {/* Hero Section */}
        <section className='flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto'>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest'
          >
            <Zap className='w-4 h-4' />
            The Future of Interview Prep
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='text-5xl md:text-7xl lg:text-8xl font-black text-gradient leading-tight tracking-tight'
          >
            Master Your Next <br />
            <span className='inline-block transform hover:scale-105 transition-transform cursor-default'>Tech Interview</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className='text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed'
          >
            Mockview uses AI to simulate high-stakes interviews, providing you with
            personalized feedback and insights to land your dream job.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='flex flex-wrap items-center justify-center gap-4 pt-4'
          >
            <Link href='/sign-up'>
              <button className='group relative h-14 px-10 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_20px_40px_-10px_rgba(var(--primary-rgb),0.5)]'>
                Start Training Now
                <ChevronRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </button>
            </Link>
            <Link href='/dashboard'>
              <button className='h-14 px-10 rounded-2xl bg-white/5 border border-white/10 text-foreground font-bold text-lg hover:bg-white/10 transition-all'>
                View Dashboard
              </button>
            </Link>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className='space-y-16'>
          <div className='text-center space-y-4'>
            <h2 className='text-3xl md:text-4xl font-bold'>Built for Modern Professionals</h2>
            <p className='text-muted-foreground'>Everything you need to sharpen your skills and gain confidence.</p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className='grid grid-cols-1 md:grid-cols-3 gap-8'
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className='glass-card p-10 rounded-3xl border-white/5 hover:border-primary/20 transition-all group'
              >
                <div className='w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-bold mb-4'>{feature.title}</h3>
                <p className='text-muted-foreground leading-relaxed'>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Trust/Proof Section */}
        <section className='py-20 border-y border-white/5'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-12 text-center'>
            {[
              { label: 'Interviews Prep', value: '10k+' },
              { label: 'Success Rate', value: '94%' },
              { label: 'AI Accuracy', value: '99%' },
              { label: 'Expert Roles', value: '50+' }
            ].map((stat, i) => (
              <div key={i} className='space-y-1'>
                <p className='text-4xl font-black text-primary'>{stat.value}</p>
                <p className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className='relative rounded-[3rem] p-12 md:p-20 overflow-hidden text-center space-y-8 bg-gradient-to-br from-primary/20 to-purple-500/10 border border-white/10'
          >
            <div className='absolute inset-0 bg-primary/5 blur-[100px] -z-10' />
            <h2 className='text-4xl md:text-5xl font-black'>Ready to crush your next interview?</h2>
            <p className='text-lg text-muted-foreground max-w-xl mx-auto'>
              Join thousands of applicants who have used Mockview to secure their roles at top tech companies.
            </p>
            <div className='flex flex-wrap justify-center gap-4 pt-4'>
              <Link href='/sign-up'>
                <button className='h-14 px-10 rounded-2xl bg-white text-black font-bold text-lg hover:bg-neutral-200 transition-all flex items-center gap-2'>
                  <Rocket className='w-5 h-5' />
                  Create Your Account
                </button>
              </Link>
              <div className='flex items-center gap-3 px-6 py-4 rounded-2xl bg-black/20 border border-white/5'>
                <CheckCircle2 className='w-5 h-5 text-green-500' />
                <span className='text-sm font-medium'>No credit card required</span>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className='py-12 px-8 text-center border-t border-white/5'>
        <div className='flex items-center justify-center gap-2 mb-4'>
          <Image src='/logo.svg' width='120' height='30' alt='logo' className='opacity-50 grayscale brightness-200' />
        </div>
        <p className='text-muted-foreground text-sm flex items-center justify-center gap-4'>
          <span>© 2025 Mockview AI</span>
          <span className='w-1 h-1 bg-white/20 rounded-full' />
          <Link href='#' className='hover:text-primary transition-colors'>Privacy Policy</Link>
          <span className='w-1 h-1 bg-white/20 rounded-full' />
          <Link href='#' className='hover:text-primary transition-colors'>Terms of Service</Link>
        </p>
      </footer>
    </div>
  )
}