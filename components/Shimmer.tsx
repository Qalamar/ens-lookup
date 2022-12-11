import { motion } from 'framer-motion'
import React from 'react'
import 'twin.macro'

const Shimmer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      tw="animate-shimmer mx-auto mt-7 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%] h-[29rem] w-full max-w-7xl rounded-lg"
    />
  )
}

export default Shimmer
