import { useScroll, motion } from 'framer-motion'
import Hero from './components/Hero'
import Chapter from './components/Chapter'
import Celebration from './components/Celebration'
import story from './data/story'

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 6,
  size: 14 + Math.random() * 16,
  rotate: Math.random() * 360,
  drift: (Math.random() - 0.5) * 200,
}))

function Petal({ left, delay, duration, size, rotate, drift }) {
  return (
    <motion.div
      style={{
        position: 'fixed',
        left: `${left}%`,
        top: -40,
        zIndex: 0,
        pointerEvents: 'none',
        fontSize: size,
      }}
      animate={{
        y: ['0vh', '110vh'],
        x: [0, drift],
        rotate: [rotate, rotate + 360],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      🌸
    </motion.div>
  )
}

function App() {
  const { scrollYProgress } = useScroll()

  return (
    <main className="min-h-screen relative" style={{ background: '#FDFBFF' }}>

      {/* ورد طاير */}
      {PETALS.map(p => (
        <Petal key={p.id} {...p} />
      ))}

      {/* progress bar */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          transformOrigin: 'left',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(to right, #C4B5FD, #6EE7B7, #FBCFE8)',
          zIndex: 100,
        }}
      />

      <div className="relative z-10">
        <Hero />
        {story.chapters.map(chapter => (
          <Chapter key={chapter.id} data={chapter} />
        ))}
        <Celebration />
      </div>

    </main>
  )
}

export default App