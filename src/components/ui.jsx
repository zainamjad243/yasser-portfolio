import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { brand } from '../data.js'
import { EASE, pillPrimary, pillSecondary } from '../theme.js'

// Arrow used on buttons and rows (the ↗ glyph from the design brief)
export function ArrowUpRight({ className = 'h-4 w-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  )
}

// Social icons. Add a new network by adding a case here and an entry in data.js.
export function SocialIcon({ name, className = 'h-4 w-4' }) {
  const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  const svgProps = { className, viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false' }

  switch (name) {
    case 'dribbble':
      return (
        <svg {...svgProps} {...stroke}>
          <circle cx="12" cy="12" r="9" />
          <path d="M4.5 8.2c2.7 1.3 8.7 1.5 14 .2M3.3 14c5-1.1 11-.6 15.4 2M8.6 3.4c2.4 3.3 3.9 8.2 3.4 17.2" />
        </svg>
      )
    case 'behance':
      return (
        <svg {...svgProps} {...stroke}>
          <rect x="2.5" y="7" width="9" height="10" rx="2" />
          <path d="M2.5 11.5h9M14.5 13.6c0-1.6 1.3-2.9 3-2.9 1.7 0 3 1.3 3 2.9v.3h-6zM14.5 13.9c0 2.3 1.5 3.6 3.3 3.6 1.3 0 2.2-.5 2.9-1.4M14 7h5.5" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...svgProps} {...stroke}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg {...svgProps} {...stroke}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 11v5M8 8v.01M12 16v-5M12 13c0-1.2.9-2 2-2s2 .8 2 2v3" />
        </svg>
      )
    case 'youtube':
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" />
          <path d="M10 9.5v5l4.5-2.5z" fill="#ffffff" />
        </svg>
      )
    default:
      return null
  }
}

// Primary (black) or secondary (white) pill. Hover scales up, press scales down.
export function PillLink({ variant = 'primary', arrow = true, className = '', children, ...props }) {
  const base = variant === 'primary' ? pillPrimary : pillSecondary
  return (
    <motion.a
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={`${base} ${className}`}
      {...props}
    >
      {children}
      {arrow && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </motion.a>
  )
}

export function AvailablePill({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm font-medium text-[#111111] shadow-[0_6px_18px_-8px_rgba(0,0,0,0.25)] ${className}`}
    >
      <span aria-hidden="true" className="dot-pulse h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
      {brand.availability}
    </span>
  )
}

// Follows the mouse with a spring. Only mounts on devices with a fine pointer.
export function CustomCursor() {
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  const [interactive, setInteractive] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 35, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 500, damping: 35, mass: 0.3 })

  useEffect(() => {
    if (!enabled) return undefined
    const root = document.documentElement
    root.classList.add('custom-cursor')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => setInteractive(Boolean(e.target.closest?.('a, button, [data-cursor]')))
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    return () => {
      root.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100]" style={{ x: sx, y: sy }}>
      <motion.span
        animate={{ scale: interactive ? 1.6 : 1 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="absolute -left-[18px] -top-[18px] flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#111111] mix-blend-difference"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M4.04 4.69a.5.5 0 0 1 .65-.65l16 6.5a.5.5 0 0 1-.06.95l-6.12 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.12a.5.5 0 0 1-.95.06z" />
        </svg>
      </motion.span>
    </motion.div>
  )
}

// Device mockup placeholder. Uses `image` when set, otherwise draws a CSS screen.
// To use real screenshots, set `image` in data.js (e.g. '/projects/roast.png').
const MOCK_BARS = [62, 38, 80, 54, 70, 44, 58, 30]

export function Mockup({ image = '', gradient = 'from-[#3a3a3a] to-[#111111]', alt = '', className = '' }) {
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }
  return (
    <div role="img" aria-label={alt} className={`relative h-full w-full overflow-hidden bg-linear-to-br ${gradient} ${className}`}>
      <div className="absolute inset-x-[10%] top-[12%] bottom-0 rounded-t-[14px] bg-[#0b0b0b]/85 p-[5%] shadow-2xl ring-1 ring-white/10">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-white/25" />
          ))}
        </div>
        <div className="mt-[7%] flex flex-col gap-[7%]">
          {MOCK_BARS.map((w, i) => (
            <span
              key={i}
              className="block h-2 rounded-full"
              style={{ width: `${w}%`, background: i % 3 === 0 ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.14)' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Large rounded section card that slides up and scales in on scroll.
export function Card({ id, className = '', children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 90, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE }}
      className={`relative overflow-hidden rounded-[20px] px-6 py-12 md:px-12 md:py-16 lg:px-16 ${className}`}
    >
      {children}
    </motion.section>
  )
}

// Slash-prefixed title with a faint oversized watermark that drifts on scroll.
export function SectionHeader({ title, dark = false, aside }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const word = title.replace('/', '')

  return (
    <div ref={ref} className="relative mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
      <motion.span
        aria-hidden="true"
        style={{ y: parallaxY }}
        className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 font-display text-[clamp(64px,11vw,180px)] leading-none font-extrabold whitespace-nowrap uppercase select-none ${
          dark ? 'text-white/[0.05]' : 'text-black/[0.05]'
        }`}
      >
        {word}
      </motion.span>
      <h2
        className={`relative z-10 text-[28px] font-semibold tracking-tight uppercase md:text-[40px] ${
          dark ? 'text-white' : 'text-[#111111]'
        }`}
      >
        {title}
      </h2>
      {aside && (
        <p className={`relative z-10 text-sm md:text-base ${dark ? 'text-[#9A9A9A]' : 'text-[#6B6B6B]'}`}>{aside}</p>
      )}
    </div>
  )
}
