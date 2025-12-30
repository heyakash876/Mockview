"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogIn, Mail, Lock, LoaderCircle, ChevronRight, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();
  const { refreshUser } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        await refreshUser();
        toast.success('Welcome back!');
        router.push('/dashboard');
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none' />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-[450px] z-10'
      >
        <div className='glass-card p-10 rounded-3xl border-white/5 shadow-2xl space-y-8 relative overflow-hidden'>
          <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent' />

          <div className='text-center space-y-2'>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className='inline-block bg-primary/10 p-4 rounded-2xl mb-4 group'
            >
              <LogIn className='w-8 h-8 text-primary group-hover:scale-110 transition-transform' />
            </motion.div>
            <h1 className='text-3xl font-black text-gradient'>Welcome Back</h1>
            <p className='text-muted-foreground text-sm'>Enter your credentials to access your dashboard</p>
          </div>

          <form onSubmit={onSubmit} className='space-y-5'>
            <div className='space-y-2'>
              <label className='text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1'>Email Address</label>
              <div className='relative group'>
                <Mail className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors' />
                <input
                  type='email'
                  name='email'
                  id='email'
                  autoComplete='email'
                  required
                  placeholder='name@example.com'
                  className='w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-sm'
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between items-center px-1'>
                <label className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>Password</label>
                <Link href='#' className='text-[11px] text-primary hover:underline'>Forgot Password?</Link>
              </div>
              <div className='relative group'>
                <Lock className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors' />
                <input
                  type='password'
                  name='password'
                  id='password'
                  autoComplete='current-password'
                  required
                  placeholder='••••••••'
                  className='w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-sm'
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <Button
              type='submit'
              disabled={loading}
              className='w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all duration-300 glass-button shadow-[0_10px_30px_-10px_rgba(var(--primary-rgb),0.5)]'
            >
              {loading ? (
                <span className='flex items-center gap-2'>
                  <LoaderCircle className='w-5 h-5 animate-spin' />
                  Authenticating...
                </span>
              ) : (
                <span className='flex items-center gap-2'>
                  Sign In
                  <ChevronRight className='w-4 h-4' />
                </span>
              )}
            </Button>
          </form>

          <div className='pt-4 text-center'>
            <p className='text-sm text-muted-foreground'>
              Don't have an account?{' '}
              <Link href='/sign-up' className='text-primary font-bold hover:underline inline-flex items-center gap-1'>
                Create Account
                <UserPlus className='w-3 h-3' />
              </Link>
            </p>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='text-center mt-8 text-muted-foreground/40 text-[10px] uppercase tracking-widest font-medium'
        >
          Secure • Encrypted • AI Powered
        </motion.p>
      </motion.div>
    </div>
  );
}

// Simple internal Button component since we are in a sub-route and might have import path issues
function Button({ children, className, ...props }) {
  return (
    <button className={`flex items-center justify-center gap-2 px-4 py-2 transition-all ${className}`} {...props}>
      {children}
    </button>
  )
}
