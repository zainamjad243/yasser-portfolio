import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  brand,
  contact,
  experience,
  hero,
  portrait,
  projects,
  services,
  socials,
  whatsappUrl,
} from '../data.js'
import {
  ArrowUpRight,
  AvailablePill,
  Card,
  Mockup,
  PillLink,
  SectionHeader,
  SocialIcon,
} from './ui.jsx'
import { EASE, chip, pillSecondary } from '../theme.js'

// ---------------------------------------------------------------------------
// Navbar (lives inside the hero card on desktop; full-screen menu on mobile)
// ---------------------------------------------------------------------------
const NAV = [
  { id: 'work', label: 'Work', count: projects.length },
  { id: 'service', label: 'Service', count: services.length },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  // Highlight the link whose section is currently in the middle of the viewport
  useEffect(() => {
    const targets = NAV.map(({ id }) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        }),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  // Lock scroll and close on Escape while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-30 flex items-center justify-between gap-4 px-4 pt-4 md:px-8 md:pt-6"
      >
        <a href="#top" className="text-sm font-bold tracking-tight text-[#111111] md:hidden">
          {brand.name}
        </a>
        <div className="hidden md:block">
          <AvailablePill />
        </div>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`text-sm transition-colors duration-300 hover:text-[#111111] ${
                    active === item.id ? 'font-semibold text-[#111111]' : 'font-medium text-[#6B6B6B]'
                  }`}
                >
                  {item.label}
                  {item.count !== undefined && (
                    <sup className="ml-0.5 text-[10px] text-[#6B6B6B]">[{item.count}]</sup>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <PillLink href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5">
            Let&apos;s Talk
          </PillLink>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          className={`${pillSecondary} h-11 w-11 px-0 md:hidden`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </motion.header>

      {/* Portalled so position: fixed is not trapped by the card's transform */}
      {createPortal(
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="fixed inset-0 z-50 flex flex-col bg-[#F5F5F5] px-6 py-5 md:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#111111]">{brand.name}</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className={`${pillSecondary} h-11 w-11 px-0`}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <nav aria-label="Mobile" className="mt-16">
                <ul className="flex flex-col gap-6">
                  {NAV.map((item, i) => (
                    <motion.li key={item.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: EASE }}>
                      <a
                        href={`#${item.id}`}
                        onClick={() => setMenuOpen(false)}
                        className="text-5xl font-semibold tracking-tight text-[#111111] uppercase"
                      >
                        {item.label}
                        {item.count !== undefined && <sup className="ml-1 text-xs text-[#6B6B6B]">[{item.count}]</sup>}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <PillLink href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="mt-auto self-start">
                Let&apos;s Talk
              </PillLink>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
// Each letter fades and slides up with a stagger. Outline letters get a stroke.
function HeroWord({ text, outline = false, delay = 0 }) {
  return (
    <span className="block md:inline">
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0, y: '0.6em' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: delay + i * 0.045 }}
          className={`inline-block ${outline ? 'text-outline' : 'text-[#111111]'}`}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

// Placeholder silhouette. Replace by setting `portrait` in data.js to your cut-out PNG.
function PortraitPlaceholder() {
  return (
    <svg
      viewBox="0 0 400 520"
      role="img"
      aria-label="Portrait placeholder"
      className="aspect-[400/520] h-full w-auto max-w-full"
    >
      <defs>
        <linearGradient id="portrait-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a5a5a" />
          <stop offset="1" stopColor="#1c1c1c" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="150" r="88" fill="url(#portrait-fill)" />
      <path d="M20 520c0-190 90-280 180-280s180 90 180 280z" fill="url(#portrait-fill)" />
    </svg>
  )
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-[20px] bg-linear-to-b from-white to-[#F5F5F5] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] md:min-h-[calc(100svh-3rem)]"
    >
      <Navbar />

      <div className="relative flex min-h-[560px] flex-1 flex-col items-center md:min-h-[640px]">
        <h1
          aria-label={`${brand.heroOutline} ${brand.heroSolid}`}
          className="relative z-0 mt-4 w-full px-4 text-center font-display text-[clamp(44px,9.4vw,150px)] leading-[0.82] font-extrabold tracking-[-0.045em] uppercase md:mt-10 md:whitespace-nowrap"
        >
          <HeroWord text={brand.heroOutline} outline delay={0.1} />{' '}
          <HeroWord text={brand.heroSolid} delay={0.1 + brand.heroOutline.length * 0.045} />
        </h1>

        {/* Bottom row: absolute on desktop (overlays the card's bottom edge), in flow on mobile/tablet */}
        <div className="relative z-20 grid w-full grid-cols-1 items-end gap-8 px-5 pt-6 pb-6 md:px-10 md:pb-10 lg:absolute lg:inset-x-0 lg:bottom-0 lg:grid-cols-[1fr_auto_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
            className="max-w-[360px]"
          >
            <p className="text-2xl font-bold text-[#111111]">{brand.tagline}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B] md:text-[15px]">{hero.description}</p>
            <PillLink href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-5">
              {hero.ctaLabel}
            </PillLink>
          </motion.div>

          <div aria-hidden="true" className="hidden lg:block" />

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.35 }}
            className="flex flex-wrap justify-center gap-3 lg:flex-col lg:items-end"
          >
            {socials.map((s) => (
              <li key={s.label}>
                <PillLink
                  variant="secondary"
                  arrow={false}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label}: ${s.handle}`}
                  className="justify-start pr-6 pl-4"
                >
                  <SocialIcon name={s.icon} />
                  {s.label}
                </PillLink>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Portrait sits in front of the headline on desktop, feet cropped by the card edge.
            Below lg it flows after the CTA/socials instead of overlapping them. */}
        <motion.div
          initial={{ opacity: 0, y: '35%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
          className="pointer-events-none relative z-10 mt-8 flex h-[240px] justify-center sm:h-[300px] lg:absolute lg:inset-x-0 lg:top-[18%] lg:bottom-0 lg:mt-0 lg:h-auto"
        >
          {portrait ? (
            <img
              src={portrait}
              alt="Portrait of the developer"
              className="h-full w-auto max-w-none object-contain object-bottom grayscale"
              decoding="async"
            />
          ) : (
            <PortraitPlaceholder />
          )}
        </motion.div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Selected Work
// ---------------------------------------------------------------------------
function WorkCard({ project, onOpen }) {
  const buttonRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  // Spring-smoothed cursor position, offset by half the 56px arrow badge
  const badgeX = useSpring(pointerX, { stiffness: 260, damping: 26, mass: 0.4 })
  const badgeY = useSpring(pointerY, { stiffness: 260, damping: 26, mass: 0.4 })
  const left = useTransform(badgeX, (v) => v - 28)
  const top = useTransform(badgeY, (v) => v - 28)

  const handleMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect()
    pointerX.set(e.clientX - rect.left)
    pointerY.set(e.clientY - rect.top)
  }

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={() => onOpen(project, buttonRef.current)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
      aria-label={`View project: ${project.title}`}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="group relative flex w-full flex-col overflow-hidden rounded-[20px] border border-black/[0.06] bg-white p-3 text-left shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] transition-shadow duration-500 ease-premium hover:shadow-[0_28px_56px_-24px_rgba(0,0,0,0.4)] md:p-4"
    >
      <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#111111]">
        <span className="block h-full w-full transition-transform duration-[1200ms] ease-premium group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <Mockup image={project.image} gradient={project.gradient} alt={`${project.title} preview`} />
        </span>
      </span>

      <span className="flex flex-col gap-3 px-2 pt-4 pb-2">
        <span className="text-lg font-semibold text-[#111111] md:text-xl">{project.title}</span>
        <span className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className={chip}>
              {tag}
            </span>
          ))}
        </span>
      </span>

      <motion.span
        aria-hidden="true"
        style={{ left, top }}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="pointer-events-none absolute z-20 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#111111] shadow-[0_12px_30px_-8px_rgba(0,0,0,0.5)]"
      >
        <ArrowUpRight className="h-5 w-5" />
      </motion.span>
    </motion.button>
  )
}

export function Work({ onOpen }) {
  return (
    <Card id="work" className="bg-[#F5F5F5]">
      <SectionHeader title="/SELECTED WORK" />
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {projects.map((project) => (
          <WorkCard key={project.id} project={project} onOpen={onOpen} />
        ))}
      </div>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Service (light card)
// ---------------------------------------------------------------------------
const REVEAL_START = [0.15, 0.35, 0.55]

export function Services() {
  return (
    <Card id="service" className="bg-linear-to-b from-white to-[#F5F5F5]">
      <SectionHeader title="/SERVICE" />
      <ul className="border-t border-black/[0.08]">
        {services.map((service, i) => (
          <motion.li
            key={service.title}
            initial={{ opacity: REVEAL_START[i] ?? 0.2, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.15 }}
            className="border-b border-black/[0.08]"
          >
            <a
              href={service.href}
              className="group flex items-center justify-between gap-6 py-6 md:py-9"
            >
              <span className="flex flex-col gap-2">
                <span className="text-[28px] leading-tight font-medium text-[#6B6B6B] uppercase transition-all duration-500 ease-premium group-hover:translate-x-3 group-hover:text-[#111111] md:text-[44px]">
                  {service.title}
                </span>
                <span className="text-sm text-[#6B6B6B] transition-transform duration-500 ease-premium group-hover:translate-x-3 md:text-base">
                  {service.description}
                </span>
              </span>
              <ArrowUpRight className="h-7 w-7 shrink-0 text-[#6B6B6B] transition-all duration-500 ease-premium group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#111111] md:h-9 md:w-9" />
            </a>
          </motion.li>
        ))}
      </ul>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Experience (dark card) with hover-follow preview
// ---------------------------------------------------------------------------
export function Experience() {
  const wrapperRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  const [lastHovered, setLastHovered] = useState(0)
  const [openIndex, setOpenIndex] = useState(null) // mobile tap-to-reveal details
  const [canHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )

  // Lerp the preview toward the cursor each frame for a soft, floaty follow
  const previewX = useMotionValue(0)
  const previewY = useMotionValue(0)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  useAnimationFrame(() => {
    current.current.x += (target.current.x - current.current.x) * 0.15
    current.current.y += (target.current.y - current.current.y) * 0.15
    previewX.set(current.current.x)
    previewY.set(current.current.y)
  })

  const handleMove = (e) => {
    const rect = wrapperRef.current.getBoundingClientRect()
    target.current = { x: e.clientX - rect.left + 28, y: e.clientY - rect.top - 90 }
  }

  const previewItem = experience.items[lastHovered]

  return (
    <Card id="experience" className="on-dark bg-linear-to-b from-[#222222] to-[#262626] text-white">
      <SectionHeader title="/EXPERIENCE" dark aside={experience.tagline} />

      <div ref={wrapperRef} onMouseMove={handleMove} onMouseLeave={() => setHovered(null)} className="relative">
        <ul className="fade-list">
          {experience.items.map((item, i) => {
            const open = openIndex === i
            return (
              <li key={item.name} className="border-t border-white/[0.12] last:border-b">
                <motion.button
                  type="button"
                  onMouseEnter={() => {
                    setHovered(i)
                    setLastHovered(i)
                  }}
                  onFocus={() => {
                    setHovered(i)
                    setLastHovered(i)
                  }}
                  onBlur={() => setHovered(null)}
                  onClick={() => !canHover && setOpenIndex(open ? null : i)}
                  aria-expanded={!canHover ? open : undefined}
                  animate={{ opacity: hovered === null || hovered === i ? 1 : 0.4 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
                >
                  <span className="flex flex-col">
                    <span className="text-xl font-semibold text-white md:text-3xl">{item.name}</span>
                    <span className="mt-1 text-sm text-[#9A9A9A] md:text-base">{item.role}</span>
                  </span>
                  <span className="shrink-0 text-sm text-[#9A9A9A] tabular-nums">{item.period}</span>
                </motion.button>

                {!canHover && (
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden pb-6 text-sm text-[#9A9A9A]"
                      >
                        {item.details}
                      </motion.p>
                    )}
                  </AnimatePresence>
                )}
              </li>
            )
          })}
        </ul>

        {canHover && (
          <motion.div
            aria-hidden="true"
            style={{ x: previewX, y: previewY, rotate: -6 }}
            animate={{ opacity: hovered === null ? 0 : 1, scale: hovered === null ? 0.85 : 1 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="pointer-events-none absolute top-0 left-0 z-30 h-[160px] w-[240px] overflow-hidden rounded-lg shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
          >
            {previewItem.preview ? (
              <img src={previewItem.preview} alt="" loading="lazy" className="h-full w-full object-cover" />
            ) : (
              <Mockup gradient={previewItem.gradient} />
            )}
          </motion.div>
        )}
      </div>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Project detail (slides over the page)
// ---------------------------------------------------------------------------
const TOOL_LABELS = {
  Figma: 'Fi', // swap for a real logo image if you like
  'Adobe XD': 'XD',
  Webflow: 'Wf',
  Protopie: 'Pp',
  Framer: 'Fr',
}

export function ProjectDetail({ project, onClose, onNavigate }) {
  const backRef = useRef(null)
  const gallery = project.gallery?.length ? project.gallery : ['', '']

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    backRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="sky-bg fixed inset-0 z-50 overflow-y-auto p-3 md:p-6"
    >
      <motion.article
        initial={{ opacity: 0, y: 90, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 90, scale: 0.96 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto flex w-full max-w-[1320px] flex-col rounded-[20px] bg-linear-to-b from-white to-[#F5F5F5] px-5 py-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)] md:px-12 md:py-10 lg:px-16"
      >
        <div className="flex items-center justify-between gap-4">
          <button ref={backRef} type="button" onClick={onClose} className={`${pillSecondary} px-5 py-2.5`}>
            ← Back
          </button>
          <div className="hidden sm:block">
            <AvailablePill />
          </div>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className={chip}>{project.category}</span>
              <span className={chip}>{project.client}</span>
            </div>
            <h1 id="project-title" className="mt-6 text-[36px] leading-[1.05] font-bold tracking-tight text-[#111111] md:text-[56px]">
              {project.title}
            </h1>
            <p className="mt-3 text-sm font-medium tracking-[0.2em] text-[#6B6B6B] uppercase">/Real Project</p>
            <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-[#6B6B6B] md:text-lg">{project.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live Preview
              </PillLink>
              <PillLink
                variant="secondary"
                arrow={false}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate('contact')
                }}
              >
                Contact Me
              </PillLink>
            </div>
          </div>

          <dl className="flex flex-col gap-6 lg:items-end lg:text-right">
            <div>
              <dt className="text-xs font-medium tracking-[0.18em] text-[#6B6B6B] uppercase">Service</dt>
              <dd className="mt-1 text-lg font-semibold text-[#111111]">{project.services}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-[0.18em] text-[#6B6B6B] uppercase">Timeline</dt>
              <dd className="mt-1 text-lg font-semibold text-[#111111]">{project.timeline}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-[0.18em] text-[#6B6B6B] uppercase">Tools</dt>
              <dd className="mt-2 flex gap-2 lg:justify-end">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    role="img"
                    aria-label={tool}
                    title={tool}
                    className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-black/[0.08] bg-white text-sm font-bold text-[#111111] shadow-[0_6px_16px_-8px_rgba(0,0,0,0.3)]"
                  >
                    {TOOL_LABELS[tool] ?? tool.slice(0, 2)}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        {/* Main device mockup, then supporting screenshots */}
        <div className="mt-12 rounded-[20px] border border-black/[0.08] bg-white/60 p-3 md:p-6">
          <div className="aspect-[16/10] overflow-hidden rounded-[14px] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]">
            <Mockup image={project.image} gradient={project.gradient} alt={`${project.title} main screenshot`} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {gallery.map((image, i) => (
            <div key={i} className="aspect-[4/3] overflow-hidden rounded-[18px] shadow-[0_20px_40px_-24px_rgba(0,0,0,0.4)]">
              <Mockup image={image} gradient={project.gradient} alt={`${project.title} screenshot ${i + 2}`} />
            </div>
          ))}
        </div>
      </motion.article>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Contact / CTA (light card) and footer
// ---------------------------------------------------------------------------
export function Contact() {
  return (
    <Card id="contact" className="bg-linear-to-b from-white to-[#F5F5F5] text-center">
      <div className="flex flex-col items-center">
        <AvailablePill />
        <h2 className="mt-8 max-w-[14ch] font-display text-[clamp(40px,7vw,96px)] leading-[0.95] font-extrabold tracking-[-0.02em] text-[#111111] uppercase">
          {contact.heading}
        </h2>
        <PillLink href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-10 px-7 py-3.5">
          {contact.cta}
        </PillLink>

        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          <li>
            <PillPlain href={`mailto:${brand.email}`}>{brand.email}</PillPlain>
          </li>
          {socials.map((s) => (
            <li key={s.label}>
              <PillPlain href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label}: ${s.handle}`}>
                <SocialIcon name={s.icon} className="h-4 w-4" />
                {s.label}
              </PillPlain>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

function PillPlain({ children, className = '', ...props }) {
  return (
    <a {...props} className={`${pillSecondary} ${className}`}>
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1320px] px-6 py-8 text-center text-sm text-[#111111]/75">
      <p>{brand.copyright}</p>
    </footer>
  )
}
