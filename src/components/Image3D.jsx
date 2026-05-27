import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTilt from '../hooks/useTilt'

function Image3D({ src, caption, tall, wide }) {
  const { ref, tilt, handleMouseMove, handleMouseLeave } = useTilt()
  const [expanded, setExpanded] = useState(false)

const heightClass = tall
  ? 'h-[500px]'
  : wide
  ? 'h-[500px]'
  : 'h-[500px]'

  return (
    <>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setExpanded(true)}
        style={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          transformStyle: 'preserve-3d',
          perspective: 1000,
          height: '100%',
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative rounded-2xl overflow-hidden cursor-pointer shadow-md w-full"
      >
        <img
          src={src}
          alt={caption}
          className={`w-full object-cover ${heightClass}`}
        />
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-3 text-sm font-medium text-white"
          style={{ background: 'rgba(0,0,0,0.35)' }}
        >
          {caption}
        </div>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: 'rgba(0,0,0,0.7)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          >
            <motion.img
              src={src}
              alt={caption}
              className="max-w-2xl w-full rounded-3xl shadow-2xl"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
export default Image3D