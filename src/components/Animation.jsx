import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

export default function Animation({isVisible}) {
  return (
    <AnimatePresence>
    {isVisible && (
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    )}
  </AnimatePresence>
  )
}