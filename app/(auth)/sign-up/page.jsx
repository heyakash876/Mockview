"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Mail, Lock, User, LoaderCircle, ChevronRight, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const router = useRouter();
  const { refreshUser } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        await refreshUser();
        toast.success('Account created! Welcome.');
        router.push('/dashboard');
      } else {
        toast.error(data.error || 'Registration failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden'>
      <div className='absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none' />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className='w-full max-w-[450px] z-10'
      >
        <div className='glass-card p-10 rounded-3xl border-white/5 shadow-2xl space-y-8 relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent' />

          <div className='text-center space-y-2'>
            <motion.div
              whileHover={{ rotate: 10 }}
              className='inline-block bg-primary/10 p-4 rounded-2xl mb-4'
            >
              <UserPlus className='w-8 h-8 text-primary' />
            </motion.div>
            <h1 className='text-3xl font-black text-gradient'>Get Started</h1>
            <p className='text-muted-foreground text-sm'>Join Mockview to accelerate your career</p>
          </div>

          <form onSubmit={onSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1'>Full Name</label>
              <div className='relative group'>
                <User className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors' />
                <input
                  type='text'
                  name='name'
                  id='name'
                  autoComplete='name'
                  required
                  placeholder='John Doe'
                  className='w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-sm'
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

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
              <label className='text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1'>Password</label>
              <div className='relative group'>
                <Lock className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors' />
                <input
                  type='password'
                  name='password'
                  id='password'
                  autoComplete='new-password'
                  required
                  placeholder='Create a secure password'
                  className='w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-sm'
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <Button
              type='submit'
              disabled={loading}
              className='w-full h-12 mt-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all duration-300 glass-button shadow-[0_10px_30px_-10px_rgba(var(--primary-rgb),0.5)]'
            >
              {loading ? (
                <span className='flex items-center gap-2'>
                  <LoaderCircle className='w-5 h-5 animate-spin' />
                  Creating Account...
                </span>
              ) : (
                <span className='flex items-center gap-2'>
                  Create Account
                  <ChevronRight className='w-4 h-4' />
                </span>
              )}
            </Button>
          </form>

          <div className='pt-2 text-center'>
            <p className='text-sm text-muted-foreground'>
              Already have an account?{' '}
              <Link href='/sign-in' className='text-primary font-bold hover:underline inline-flex items-center gap-1'>
                Sign In
                <LogIn className='w-3 h-3' />
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Button({ children, className, ...props }) {
  return (
    <button className={`flex items-center justify-center gap-2 px-4 py-2 transition-all ${className}`} {...props}>
      {children}
    </button>
  )
}
