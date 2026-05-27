import { useRef, useState } from 'react'

function useTilt() {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  function handleMouseMove(e) {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -12
    const rotateY = ((x - centerX) / centerX) * 12

    setTilt({ x: rotateX, y: rotateY })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
  }

  return { ref, tilt, handleMouseMove, handleMouseLeave }
}

export default useTilt