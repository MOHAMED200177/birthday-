import Image3D from './Image3D'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
}

function FactsChapter({ data }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
      {data.items.map((item, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          whileHover={{ scale: 1.05, rotate: 1 }}
          className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-sm"
          style={{ background: data.color + '33' }}
        >
          <span className="text-4xl mb-3">{item.emoji}</span>
          <p className="text-sm font-medium text-center" style={{ color: '#3B3054' }}>
            {item.text}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

function GalleryChapter({ data }) {
  const [current, setCurrent] = useState(0)
  const total = data.images.length

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % total)
    }, 3000)
    return () => clearInterval(timer)
  }, [total])

  return (
    <>
      {/* موبيل — carousel */}
      <div className="md:hidden mt-10">
        <div className="relative overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Image3D
                src={data.images[current].src}
                caption={data.images[current].caption}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrent(i => (i - 1 + total) % total)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ background: data.color }}
          >
            ←
          </motion.button>

          <div className="flex gap-2">
            {data.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  background: i === current ? data.color : data.color + '44',
                  transform: i === current ? 'scale(1.4)' : 'scale(1)',
                }}
              />
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrent(i => (i + 1) % total)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ background: data.color }}
          >
            →
          </motion.button>
        </div>

        <p className="text-center text-sm mt-2" style={{ color: '#9CA3AF' }}>
          {current + 1} / {total}
        </p>
      </div>

      {/* ديسكتوب — grid ديناميكي */}
      <div className={`hidden md:grid gap-4 mt-10 ${
        total <= 2 ? 'grid-cols-2' :
        total <= 3 ? 'grid-cols-3' :
        'grid-cols-3'
      }`}>
        {data.images.map((img, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className={total === 4 && i === 0 ? 'row-span-2' : ''}
          >
            <Image3D
              src={img.src}
              caption={img.caption}
              tall={total === 4 && i === 0}
            />
          </motion.div>
        ))}
      </div>
    </>
  )
}

function TimelineChapter({ data }) {
  return (
    <div className="mt-10 flex flex-col gap-6 max-w-lg mx-auto">
      {data.events.map((event, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          className="flex items-center gap-6"
        >
          <div
            className="text-lg font-bold w-16 shrink-0 text-center py-2 rounded-xl"
            style={{ background: data.color + '44', color: '#3B3054' }}
          >
            {event.year}
          </div>
          <div
            className="h-px flex-1"
            style={{ background: data.color }}
          />
          <p className="text-sm font-medium w-48 text-right" style={{ color: '#3B3054' }}>
            {event.text}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

function MessagesChapter({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {data.messages.map((msg, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          whileHover={{ y: -6 }}
          className="p-6 rounded-2xl shadow-sm"
          style={{ background: data.color + '22' }}
        >
          <p className="text-base mb-4 italic" style={{ color: '#3B3054' }}>
            "{msg.text}"
          </p>
          <p className="text-sm font-semibold" style={{ color: data.color }}>
            — {msg.from}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

const chapterMap = {
  facts: FactsChapter,
  gallery: GalleryChapter,
  timeline: TimelineChapter,
  messages: MessagesChapter,
}

function Chapter({ data }) {
  const Content = chapterMap[data.type]

  return (
    <>
      <div
        className="w-full h-px mx-auto max-w-2xl"
        style={{ background: `linear-gradient(to right, transparent, ${data.color}, transparent)` }}
      />

      <motion.section
        className="py-24 px-6 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.div variants={fadeUp} className="text-center">
          <span
            className="text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full"
            style={{ background: data.color + '33', color: data.color }}
          >
            Chapter {data.id}
          </span>
          <h2 className="text-4xl font-bold mt-4" style={{ color: '#3B3054' }}>
            {data.title}
          </h2>
        </motion.div>

        {Content && <Content data={data} />}
      </motion.section>
    </>
  )
}
export default Chapter