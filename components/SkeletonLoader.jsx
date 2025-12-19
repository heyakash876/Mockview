"use client"
import React from 'react'
import { motion } from 'framer-motion'

const SkeletonLoader = ({ className, count = 1 }) => {
    return (
        <>
            {[...Array(count)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className={`bg-white/5 rounded-xl ${className}`}
                />
            ))}
        </>
    )
}

export default SkeletonLoader
