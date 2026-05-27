import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import story from '../data/story'

function Celebration() {
  const { celebration } = story
  const [fired, setFired] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          fireConfetti()
          setFired(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [fired])

  function fireConfetti() {
    const colors = ['#C4B5FD', '#6EE7B7', '#FBCFE8', '#FDE68A']

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors,
    })

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.6 },
        colors,
      })
    }, 400)

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.6 },
        colors,
      })
    }, 700)
  }

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
      style={{ background: '#FDF2F8' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-8xl"
        >
          🎂
        </motion.div>

        <h2 className="text-5xl font-bold" style={{ color: '#3B3054' }}>
          {celebration.title}
        </h2>

        <p className="text-xl max-w-md" style={{ color: '#9CA3AF' }}>
          {celebration.wish}
        </p>

        <motion.button
          onClick={fireConfetti}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-8 py-4 rounded-full text-white font-semibold text-lg"
          style={{ background: '#C4B5FD' }}
        >
          🎉 Celebrate Again!
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Celebration