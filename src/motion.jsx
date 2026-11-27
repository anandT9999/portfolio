// Reusable Framer Motion building blocks.
import { Fragment, useEffect, useRef } from 'react'
import {
  animate, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform,
} from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

// Fade + rise into view once. `delay` lets siblings stagger.
export function Reveal({ as = 'div', delay = 0, y = 28, className, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Container that staggers direct <motion.*> children using `item` variants.
export const stagger = (gap = 0.06, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})
export const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

// Letters blur in one by one (Gowtham-style name reveal).
export function BlurText({ text, className, delay = 0, step = 0.035 }) {
  return (
    <span className={className} aria-label={text}>
      {/* Letters are grouped per word so lines only wrap between words */}
      {text.split(' ').map((word, w, words) => {
        const offset = words.slice(0, w).join(' ').length + (w ? 1 : 0)
        return (
          <span key={w} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {Array.from(word).map((ch, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: '0.35em', filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease, delay: delay + (offset + i) * step }}
              >
                {ch}
              </motion.span>
            ))}
            {w < words.length - 1 && ' '}
          </span>
        )
      })}
    </span>
  )
}

// Words slide up from a mask when scrolled into view.
export function RiseWords({ text, className, delay = 0 }) {
  const words = text.split(' ')
  // In-view is tracked on the visible wrapper: the words start clipped by their
  // masks, so an observer on each word would never fire.
  return (
    <motion.span className={className} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="mask">
            <motion.span
              style={{ display: 'inline-block' }}
              variants={{ hidden: { y: '110%' }, show: { y: 0 } }}
              transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}
            >
              {w}
            </motion.span>
          </span>
          {/* Space lives outside the inline-block mask so it isn't collapsed */}
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </motion.span>
  )
}

// Element follows the pointer a little, springing back on leave.
export function Magnetic({ children, strength = 0.3, className, ...rest }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 })
  const y = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 })
  const onMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }
  return (
    <motion.span ref={ref} className={`magnetic ${className || ''}`} style={{ x, y }}
      onMouseMove={onMove} onMouseLeave={reset} {...rest}>
      {children}
    </motion.span>
  )
}

// Number counts up once visible; writes text directly (no re-render per frame).
export function Counter({ to, dec = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!inView || !ref.current) return
    if (reduce) { ref.current.textContent = to.toFixed(dec); return }
    const controls = animate(0, to, {
      duration: 1.6, ease,
      onUpdate: (v) => { if (ref.current) ref.current.textContent = v.toFixed(dec) },
    })
    return () => controls.stop()
  }, [inView, to, dec, reduce])
  return <span ref={ref}>{(0).toFixed(dec)}</span>
}

// Card with a radial spotlight that tracks the pointer.
export function Spotlight({ className, children, ...rest }) {
  const mx = useMotionValue(-999)
  const my = useMotionValue(-999)
  const bg = useTransform([mx, my], ([x, y]) =>
    `radial-gradient(520px circle at ${x}px ${y}px, var(--accent-soft), transparent 45%)`)
  return (
    <motion.article
      className={className}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left); my.set(e.clientY - r.top)
      }}
      onMouseLeave={() => { mx.set(-999); my.set(-999) }}
      {...rest}
    >
      <motion.span className="spot" style={{ background: bg }} aria-hidden="true" />
      {children}
    </motion.article>
  )
}
