import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence, MotionConfig, motion, useMotionValueEvent, useReducedMotion,
  useScroll, useSpring, useTransform,
} from 'framer-motion'
import Lenis from 'lenis'
import {
  BlurText, Counter, Magnetic, Reveal, RiseWords, Spotlight, ease, item, stagger,
} from './motion.jsx'
import {
  certs, education, feature, jobs, journey, marquee, profile, projects, repos, stack, stats, timeline, tldr,
} from './data.js'

const NAV = [['about', 'About'], ['journey', 'Journey'], ['work', 'Work'], ['experience', 'Experience'], ['stack', 'Stack']]

/* ---------------- Smooth scroll (Lenis) shared with anchor links ---------------- */
let lenis = null
function scrollToId(id) {
  const el = id === 'top' ? document.body : document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: id === 'top' ? 0 : -70, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
function Anchor({ to, children, onClick, ...rest }) {
  return (
    <a href={`#${to}`} onClick={(e) => { e.preventDefault(); scrollToId(to); onClick?.() }} {...rest}>
      {children}
    </a>
  )
}

/* ---------------- Theme ---------------- */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('at-theme') || 'dark' } catch { return 'dark' }
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f4f2ec' : '#0b0c0e')
    try { localStorage.setItem('at-theme', theme) } catch { /* storage blocked: theme still applies this visit */ }
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))]
}

/* ---------------- Boot loader ---------------- */
const BOOT = [
  '$ ./anand --boot',
  '[ ok ] loading services ........ fastapi, celery',
  '[ ok ] connecting stores ........ postgres, mongo, redis',
  '[ ok ] attaching queues ......... sqs, kafka',
  '[ ok ] health check ............. 200 OK',
]
function Loader({ onDone }) {
  // Keep the latest callback in a ref so parent re-renders don't restart the timer
  const done = useRef(onDone)
  done.current = onDone
  useEffect(() => { const t = setTimeout(() => done.current(), 1500); return () => clearTimeout(t) }, [])
  return (
    <motion.div className="boot" aria-hidden="true"
      exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.9, ease }}
      style={{ clipPath: 'inset(0 0 0% 0)' }}>
      <motion.pre className="boot__log" variants={stagger(0.18)} initial="hidden" animate="show">
        {BOOT.map((l, i) => <motion.span key={i} variants={item} className={i === 4 ? 'ok' : ''}>{l}</motion.span>)}
      </motion.pre>
      <div className="boot__bar">
        <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease }} />
      </div>
    </motion.div>
  )
}

/* ---------------- Cursor + progress ---------------- */
function Cursor() {
  // Motion values only: no React re-render per mousemove
  const x = useSpring(-100, { stiffness: 500, damping: 40 })
  const y = useSpring(-100, { stiffness: 500, damping: 40 })
  const opacity = useSpring(0, { stiffness: 300, damping: 30 })
  const scale = useSpring(1, { stiffness: 300, damping: 25 })
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY); opacity.set(1)
      scale.set(e.target.closest?.('a, button, .card-hover, .chips li') ? 2 : 1)
    }
    const leave = () => opacity.set(0)
    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseleave', leave)
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseleave', leave) }
  }, [x, y, opacity, scale])
  return (
    <motion.div className="cursor" aria-hidden="true" style={{ x, y, opacity, scale }} />
  )
}
function Progress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
}

/* ---------------- Nav ---------------- */
function Clock() {
  const [t, setT] = useState('')
  useEffect(() => {
    const f = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })
    const tick = () => setT(f.format(new Date()))
    tick(); const id = setInterval(tick, 15000); return () => clearInterval(id)
  }, [])
  return <span>{t}</span>
}
function Nav({ theme, toggleTheme, ready }) {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(!open && y > prev && y > 400)
  })
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-40% 0px -55% 0px' })
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (open) lenis?.stop(); else lenis?.start()
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', esc); return () => document.removeEventListener('keydown', esc)
  }, [open])

  return (
    <>
      <motion.header className="nav"
        initial={{ y: -90, x: '-50%', opacity: 0 }}
        animate={{ y: hidden && !open ? -100 : 0, x: '-50%', opacity: ready ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
        <Anchor to="top" className="nav__brand" aria-label="Back to top">
          <span className="nav__prompt">&gt;_</span><span>anand</span>
        </Anchor>
        <div className="nav__status" title="Local time in Hyderabad">
          <span className="pulse" /><Clock /><span className="dim">IST</span>
        </div>
        <nav className="nav__links" aria-label="Primary">
          {NAV.map(([id, label], i) => (
            <Anchor key={id} to={id} className={active === id ? 'is-active' : ''}>
              {active === id && <motion.span layoutId="nav-pill" className="nav__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              {/* Label in its own element so it stacks above the sliding pill */}
              <em>0{i + 1}</em><span>{label}</span>
            </Anchor>
          ))}
        </nav>
        <div className="nav__actions">
          <motion.button className="icon-btn" onClick={toggleTheme} aria-label="Toggle colour theme" whileTap={{ scale: 0.85 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                {theme === 'dark'
                  ? <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
                  : <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>}
              </motion.span>
            </AnimatePresence>
          </motion.button>
          <Anchor to="contact" className="btn btn--sm btn--accent nav__cta">Let's talk</Anchor>
          <button className="icon-btn nav__menu" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <motion.path initial={false} d="M4 8L20 8" animate={{ d: open ? 'M6 6L18 18' : 'M4 8L20 8' }} />
              <motion.path initial={false} d="M4 16L20 16" animate={{ d: open ? 'M6 18L18 6' : 'M4 16L20 16' }} />
            </svg>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div className="sheet"
            initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease }}>
            <motion.div variants={stagger(0.06, 0.2)} initial="hidden" animate="show">
              {[...NAV, ['contact', 'Contact']].map(([id, label]) => (
                <motion.div key={id} variants={item}><Anchor to={id} onClick={() => setOpen(false)}>{label}</Anchor></motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ---------------- Hero ---------------- */
function FlowDiagram() {
  const [p95, setP95] = useState(42)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setP95(36 + Math.round(Math.random() * 14)), 1800)
    return () => clearInterval(id)
  }, [reduce])
  const nodes = [
    [20, 105, 100, 50, 'client', 'HTTPS'], [240, 100, 120, 60, 'FastAPI', 'async · pydantic', true],
    [470, 105, 120, 50, 'queue', 'SQS · Kafka'], [700, 35, 120, 50, 'workers', 'Celery · Lambda'],
    [700, 175, 120, 50, 'embed', 'chunk · vector'],
  ]
  const wires = ['M120 130 H240', 'M360 130 H470', 'M590 130 C640 130 640 60 700 60', 'M590 130 C640 130 640 200 700 200',
    'M820 60 C860 60 860 130 880 130', 'M820 200 C860 200 860 130 880 130']
  return (
    <Reveal as="figure" className="flow" delay={0.2}>
      <figcaption className="flow__head">
        <span>request.trace</span>
        <span className="flow__status"><span className="pulse" />p95 · {p95}ms<span className="flow__sim">simulated</span></span>
      </figcaption>
      <div className="flow__scroll">
        <svg className="flow__svg" viewBox="0 0 960 260" role="img" aria-label="A request flowing from client through FastAPI, a queue and workers into data stores">
          <g className="wires">
            {wires.map((d, i) => (
              <motion.path key={i} id={`w${i}`} d={d}
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.9, ease, delay: 0.4 + i * 0.12 }} />
            ))}
            <motion.path id="w6" d="M300 160 V215 H700" className="wire-dim"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease, delay: 1 }} />
          </g>
          {!reduce && (
            <g className="packets">
              {wires.map((_, i) => (
                <circle key={i} r="4"><animateMotion dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite"><mpath href={`#w${i}`} /></animateMotion></circle>
              ))}
              <circle r="3" className="p2"><animateMotion dur="3.2s" begin=".3s" repeatCount="indefinite"><mpath href="#w6" /></animateMotion></circle>
            </g>
          )}
          <g className="nodes">
            {nodes.map(([x, y, w, h, t, s, hi], i) => (
              <motion.g key={t} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.1 }}>
                <g transform={`translate(${x},${y})`}>
                  <rect width={w} height={h} rx="10" className={hi ? 'hi' : ''} />
                  <text x={w / 2} y={h / 2 - 3}>{t}</text><text className="sub" x={w / 2} y={h / 2 + 13}>{s}</text>
                </g>
              </motion.g>
            ))}
            <motion.g initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.9 }} style={{ originX: '915px', originY: '130px' }}>
              <g transform="translate(880,95)"><rect width="70" height="70" rx="35" /><text x="35" y="33">store</text><text className="sub" x="35" y="49">pg · os</text></g>
            </motion.g>
            <text className="sub cache" x="312" y="204">cache · redis</text>
          </g>
        </svg>
      </div>
    </Reveal>
  )
}

/* ---------------- Resume as an API call: terminal streams the response, then a file card ---------------- */
const RESUME_BYTES = 571936
function resumeUrl() {
  // Real absolute URL of the PDF on whatever host serves the site
  try { return new URL(profile.resume, window.location.href).href } catch { return profile.resume }
}
const HEADERS = [
  ['HTTP/2', '200', 'status'],
  ['content-type:', 'application/pdf'],
  ['content-length:', String(RESUME_BYTES)],
  ['x-role:', 'backend-engineer; lead=true'],
  ['x-stack:', 'python, fastapi, postgres, aws'],
  ['x-cache:', 'HIT', 'warn'],
]

function useResumeRun(open, reduce) {
  const [s, setS] = useState({ typed: 0, lines: 0, pct: 0, done: false })
  const skip = useRef(false)
  const cmd = useMemo(() => `curl -i ${resumeUrl()}`, [])
  useEffect(() => {
    skip.current = false
    if (!open) { setS({ typed: 0, lines: 0, pct: 0, done: false }); return }
    let cancelled = false
    const fast = () => reduce || skip.current
    const sleep = (ms) => new Promise((r) => setTimeout(r, fast() ? 0 : ms))
    ;(async () => {
      await sleep(150)
      for (let i = 1; i <= cmd.length; i++) {
        if (cancelled) return
        if (fast()) { setS((p) => ({ ...p, typed: cmd.length })); break }
        setS((p) => ({ ...p, typed: i })); await sleep(12)
      }
      for (let l = 1; l <= HEADERS.length; l++) {
        if (cancelled) return
        setS((p) => ({ ...p, lines: l })); await sleep(110)
      }
      for (let pct = 10; pct <= 100; pct += 10) {
        if (cancelled) return
        setS((p) => ({ ...p, pct })); await sleep(45)
      }
      if (!cancelled) setS((p) => ({ ...p, done: true }))
    })()
    return () => { cancelled = true }
  }, [open, reduce, cmd])
  return { ...s, cmd, skip: () => { skip.current = true } }
}

function ResumeTerminal({ open, run, onClose }) {
  useEffect(() => {
    if (!open) return
    const esc = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [open, onClose])
  const kb = Math.round((RESUME_BYTES / 1024) * (run.pct / 100))
  return (
    <AnimatePresence>
      {open && (
        <motion.div id="resume-terminal" className="rterm-wrap" key="rterm"
          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease }}>
          <div className="rterm" aria-live="polite">
            <div className="rterm__top"><i /><i /><i /><span>~/anand · resume</span></div>
            <pre className="rterm__body">
              <span className="t-g">$</span> <span className="t-w">{run.cmd.slice(0, run.typed)}</span>
              {run.typed < run.cmd.length && <span className="t-caret" />}
              {run.lines > 0 && '\n'}
              {HEADERS.slice(0, run.lines).map(([k, v, kind]) => (
                <span key={k}>
                  {kind === 'status'
                    ? <><span className="t-b">{k}</span> <span className="t-g">{v}</span></>
                    : <><span className="t-c">{k}</span> <span className={kind === 'warn' ? 't-y' : ''}>{v}</span></>}
                  {'\n'}
                </span>
              ))}
              {run.pct > 0 && (
                <span>
                  {'\n'}<span className="t-c">downloading</span> <span className="t-bar"><i style={{ width: `${run.pct}%` }} /></span> {kb} KB
                  {run.done && <span className="t-g">  ✓ 200 OK</span>}
                </span>
              )}
              {run.done && <>{'\n'}<span className="t-g">$</span> <span className="t-caret" /></>}
            </pre>
          </div>
          <AnimatePresence>
            {run.done && (
              <motion.div className="rfile" key="rfile"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}>
                <div className="rfile__ico" aria-hidden="true">PDF</div>
                <div className="rfile__meta">
                  <b>Anand_Torati_Resume.pdf</b>
                  <small>200 OK · {Math.round(RESUME_BYTES / 1024)} KB · 2 pages</small>
                </div>
                <div className="rfile__actions">
                  {/* `download` saves the file in place: no new tab, no navigation */}
                  <a href={profile.resume} download="Anand_Torati_Resume.pdf" className="btn btn--accent btn--sm">
                    Download
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 4v12M6 11l6 6 6-6M5 20h14" /></svg>
                  </a>
                  <motion.button type="button" className="icon-btn" onClick={onClose} aria-label="Close resume" whileTap={{ scale: 0.88 }} whileHover={{ rotate: 90 }}>
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Hero({ ready }) {
  const [resumeOpen, setResumeOpen] = useState(false)
  const reduce = useReducedMotion()
  const run = useResumeRun(resumeOpen, reduce)
  const closeResume = useCallback(() => setResumeOpen(false), [])
  // First click runs the request; a click mid-run skips to the result; a click after closes
  const onResume = () => {
    if (!resumeOpen) setResumeOpen(true)
    else if (!run.done) run.skip()
    else setResumeOpen(false)
  }
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Gentle parallax only; no fade, so the printed resume stays readable while scrolling
  const lift = useTransform(scrollYProgress, [0, 1], [0, -60])
  return (
    <section className="hero" ref={ref} id="top">
      <div className="grid-bg" aria-hidden="true" />
      <div className="hero__inner container">
        <div className="hero__grid hero__grid--solo">
          <motion.div style={{ y: lift }}>
            {ready && (
              <>
                <motion.div className="hero__meta" variants={stagger(0.08)} initial="hidden" animate="show">
                  <motion.span variants={item}><span className="dot" />{profile.role}</motion.span>
                  <motion.span variants={item}>{profile.location}</motion.span>
                  <motion.span variants={item}>{profile.current}</motion.span>
                </motion.div>
                <h1 className="hero__title">
                  <BlurText className="hello serif" text="Hello," />
                  <span className="hero__name">
                    <BlurText text="I'm Anand Torati" delay={0.25} />
                    <motion.span className="wave" aria-hidden="true"
                      initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, rotate: [0, 18, -8, 18, -4, 10, 0] }}
                      transition={{ opacity: { delay: 0.9 }, scale: { delay: 0.9, type: 'spring' }, rotate: { delay: 1.1, duration: 1.6 } }}>
                      👋
                    </motion.span>
                  </span>
                </h1>
                <motion.p className="hero__lede" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.8 }}>
                  Backend engineer and <span className="pill">Project Lead at Arcitech</span>. I build the parts of software you don't see:
                  {' '}<strong>APIs, queues, pipelines and data stores</strong> that keep working at scale. Four and a half years in Python
                  backends, now growing toward <span className="serif hl">system design &amp; backend architecture.</span>
                </motion.p>
                <motion.div className="hero__cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 1 }}>
                  <Magnetic><Anchor to="contact" className="btn btn--soft">Say hi <span aria-hidden="true">👋</span></Anchor></Magnetic>
                  <Magnetic>
                    <button type="button" className="btn btn--accent" onClick={onResume}
                      aria-expanded={resumeOpen} aria-controls="resume-terminal">
                      Resume
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 17l6-5-6-5M12 19h8" /></svg>
                    </button>
                  </Magnetic>
                  <Magnetic><a href={profile.github} target="_blank" rel="noopener" className="btn btn--ghost">GitHub ↗</a></Magnetic>
                </motion.div>
                <ResumeTerminal open={resumeOpen} run={run} onClose={closeResume} />
              </>
            )}
          </motion.div>
        </div>

        <FlowDiagram />

        <motion.dl className="stats" variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {stats.map((s) => (
            <motion.div key={s.label} variants={item}>
              <dt><Counter to={s.to} dec={s.dec} />{s.suffix}{s.sup && <sup>{s.sup}</sup>}</dt>
              <dd>{s.label}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}

/* ---------------- Marquee (scroll-velocity aware) ---------------- */
function Marquee() {
  const row = [...marquee, ...marquee]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map(([w, it], i) => (
          <span key={i} className="marquee__item"><span className={it ? 'serif' : ''}>{w}</span><b>✦</b></span>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Manifesto: scroll-linked word reveal ---------------- */
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return <motion.span style={{ opacity }} className="mf-word">{children} </motion.span>
}
function Manifesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const text = 'Good backends are quiet. They take the spike, retry the failure, and keep the data honest, so nobody has to think about them.'
  const words = text.split(' ')
  return (
    <section className="manifesto container" ref={ref}>
      <Reveal className="manifesto__lead">
        <span className="serif">Sometimes</span> I start with one request.<br />
        Then I <span className="serif">zoom out.</span>
      </Reveal>
      <p className="manifesto__body">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
        ))}
      </p>
    </section>
  )
}

/* ---------------- Section heading ---------------- */
function Head({ n, label, title, accent, sub }) {
  return (
    <header className="section__head">
      <Reveal as="span" className="label">({n}) {label}</Reveal>
      <h2><RiseWords text={title} /> <RiseWords className="serif muted" text={accent} delay={0.15} /></h2>
      {sub && <Reveal as="p" className="section__sub" delay={0.2}>{sub}</Reveal>}
    </header>
  )
}

/* ---------------- About with Story / TL;DR / Timeline ---------------- */
const TABS = ['Story', 'TL;DR', 'Timeline']
function About() {
  const [tab, setTab] = useState(0)
  const onKey = (e) => {
    if (['ArrowRight', 'ArrowDown'].includes(e.key)) { e.preventDefault(); setTab((t) => (t + 1) % 3) }
    if (['ArrowLeft', 'ArrowUp'].includes(e.key)) { e.preventDefault(); setTab((t) => (t + 2) % 3) }
  }
  return (
    <section className="section container" id="about">
      <Head n="01" label="About" title="Hi, I'm Anand." accent="I like systems that hold up." />
      <div className="about">
        <Reveal className="tabs" role="tablist" aria-label="About views" onKeyDown={onKey}>
          {TABS.map((t, i) => (
            <button key={t} role="tab" aria-selected={tab === i} tabIndex={tab === i ? 0 : -1} onClick={() => setTab(i)}>
              {tab === i && <motion.span layoutId="tab-pill" className="tabs__pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <span>{t}</span>
            </button>
          ))}
        </Reveal>
        <div className="panels">
          <AnimatePresence mode="wait">
            <motion.div key={tab} role="tabpanel" className="panel"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease }}>
              {tab === 0 && (
                <>
                  <p>I studied Computer Science with a Data Science focus at Lovely Professional University, and started my career at <strong>iLink Digital</strong> writing REST APIs with FastAPI and Flask for clients like ISOutsource and AECOM. That's where I first wired services to <strong>Kafka</strong>, shipped containers on <strong>Kubernetes</strong>, and learned that tests are the cheapest insurance you can buy.</p>
                  <p>At <strong>Amunik</strong> I widened out: React interfaces, DigitalOcean CI/CD, schema design and SQL tuning. Seeing a whole product end to end changed how I write the backend.</p>
                  <p>Today at <strong>Arcitech</strong> I lead the engineering team on Aufgang, an AI platform for an architecture firm. My days mix async FastAPI services, queue-driven pipelines over a million-file share, LLM agents and release management across four environments. The question I keep asking now is less "how do I build this endpoint?" and more <span className="serif hl">"how should this whole system be shaped?"</span></p>
                </>
              )}
              {tab === 1 && (
                <motion.ul className="tldr" variants={stagger(0.05)} initial="hidden" animate="show">
                  {tldr.map(([k, v]) => <motion.li key={k} variants={item}><span>{k}</span>{v}</motion.li>)}
                </motion.ul>
              )}
              {tab === 2 && (
                <motion.ol className="mini-tl" variants={stagger(0.08)} initial="hidden" animate="show">
                  {timeline.map(([y, t, next]) => <motion.li key={y} variants={item} className={next ? 'next' : ''}><time>{y}</time><p>{t}</p></motion.li>)}
                </motion.ol>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Journey with scroll-linked rail ---------------- */
function Journey() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })
  return (
    <section className="section container" id="journey">
      <Head n="02" label="The journey" title="From endpoints" accent="to architecture."
        sub={'Each stage widened the question from "does it work?" to "does it scale, recover and stay simple?"'} />
      <div className="journey" ref={ref}>
        <div className="journey__rail" aria-hidden="true"><motion.i style={{ scaleY }} /></div>
        {journey.map((s) => (
          <motion.article key={s.n} className={`stage card-hover ${s.next ? 'stage--next' : ''}`}
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            whileHover={{ x: 8 }} transition={{ type: 'spring', stiffness: 120, damping: 20 }}>
            <span className="stage__dot" aria-hidden="true" />
            <span className="stage__n">{s.n}</span>
            <div>
              <h3>{s.title}{s.next && <span className="tag">current focus</span>}</h3>
              <p className="stage__q">{s.q}</p>
              <p>{s.body}</p>
              <motion.ul className={`chips ${s.next ? 'chips--outline' : ''}`} variants={stagger(0.04, 0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                {s.chips.map((c) => <motion.li key={c} variants={item}>{c}</motion.li>)}
              </motion.ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Work ---------------- */
function Bullets({ list }) {
  return <ul className="bullets">{list.map((b) => <li key={b}>{b}</li>)}</ul>
}
function Chips({ list }) {
  return (
    <motion.ul className="chips" variants={stagger(0.04)} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {list.map((c) => <motion.li key={c} variants={item}>{c}</motion.li>)}
    </motion.ul>
  )
}
function Work() {
  return (
    <section className="section container" id="work">
      <Head n="03" label="Selected work" title="Systems," accent="not just screens." />

      <Reveal>
        <Spotlight className="project project--feature card-hover">
          <div className="project__body">
            <div className="project__top"><span className="label">{feature.label}</span><span className="label">{feature.when}</span></div>
            <h3>{feature.title}</h3>
            <p className="project__lede">{feature.lede}</p>
            <Bullets list={feature.bullets} />
            <Chips list={feature.chips} />
          </div>
          <div className="pipe">
            <div className="pipe__head">ingest.pipeline</div>
            <motion.ol variants={stagger(0.12, 0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.span className="pipe__line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease, delay: 0.2 }} />
              {feature.pipeline.map(([b, s, loop]) => (
                <motion.li key={b} variants={item} className={loop ? 'loop' : ''}><b>{b}</b><span>{s}</span></motion.li>
              ))}
            </motion.ol>
          </div>
        </Spotlight>
      </Reveal>

      <div className="project-grid">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <Spotlight className="project card-hover" whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
              <div className="project__top"><span className="label">{p.label}</span><span className="label">{p.when}</span></div>
              <h3>{p.title}</h3>
              <p className="project__lede">{p.body}</p>
              <Bullets list={p.bullets} />
              <Chips list={p.chips} />
            </Spotlight>
          </Reveal>
        ))}
      </div>

      <div className="oss">
        <Reveal className="oss__head">
          <span className="label">From my GitHub</span>
          <a href={`${profile.github}?tab=repositories`} target="_blank" rel="noopener" className="link">All repositories ↗</a>
        </Reveal>
        <motion.ul className="oss__list" variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {repos.map(([name, desc, tech, slug]) => (
            <motion.li key={slug} variants={item}>
              <motion.a href={`${profile.github}/${slug}`} target="_blank" rel="noopener" whileHover="hover" initial="rest" animate="rest">
                <motion.span className="oss__bg" variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }} transition={{ duration: 0.4, ease }} />
                <motion.span className="oss__name" variants={{ rest: { x: 0 }, hover: { x: 12 } }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>{name}</motion.span>
                <span className="oss__desc">{desc}</span>
                <span className="oss__tech">{tech}</span>
                <motion.span className="arrow" variants={{ rest: { x: 0, y: 0, rotate: 0 }, hover: { x: 3, y: -3, rotate: 0 } }}>↗</motion.span>
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

/* ---------------- Experience ---------------- */
function Experience() {
  return (
    <section className="section container" id="experience">
      <Head n="04" label="Experience" title="Shipping," accent="then leading." />
      <div className="xp">
        {jobs.map((j) => (
          <Reveal key={j.company} className="job">
            <div className="job__when"><time>{j.when}</time>{j.current && <span className="badge"><span className="pulse" />Current</span>}</div>
            <div className="job__body">
              <h3>{j.company} <span>· {j.sub}</span></h3>
              {j.roles ? j.roles.map((r) => (
                <div className="role" key={r.title}>
                  <h4>{r.title} <time>{r.when}</time></h4>
                  <Bullets list={r.bullets} />
                </div>
              )) : <Bullets list={j.bullets} />}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Stack ---------------- */
function Stack() {
  return (
    <section className="section container" id="stack">
      <Head n="05" label="Stack" title="The toolbox" accent="behind the systems." />
      <motion.div className="stack" variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {stack.map(([title, list], i) => (
          <motion.div key={title} className="stack__group" variants={item}>
            <h3><span>0{i + 1}</span>{title}</h3>
            <ul className="chips">{list.map((c) => <motion.li key={c} whileHover={{ y: -3 }}>{c}</motion.li>)}</ul>
          </motion.div>
        ))}
      </motion.div>
      <div className="creds">
        <Reveal className="creds__col">
          <span className="label">Certifications</span>
          <ul>{certs.map(([c, e]) => <li key={c}>{c}{e && <em>{e}</em>}</li>)}</ul>
        </Reveal>
        <Reveal className="creds__col" delay={0.1}>
          <span className="label">Education</span>
          <ul>{education.map(([c, e]) => <li key={c}>{c}<em>{e}</em></li>)}</ul>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Contact ---------------- */
function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true) } catch { setCopied(false); window.location.href = `mailto:${profile.email}` }
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <section className="contact" id="contact">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container">
        <Reveal as="span" className="label">(06) Get in touch</Reveal>
        <h2 className="contact__title"><RiseWords text="Let's build something" /> <RiseWords className="serif" text="that scales." delay={0.25} /></h2>
        <Reveal as="p" className="contact__sub">Open to backend, platform and architecture conversations.</Reveal>
        <Reveal className="contact__mail" delay={0.1}>
          <Magnetic strength={0.2}><a href={`mailto:${profile.email}`} className="mail">{profile.email}</a></Magnetic>
          <motion.button className="btn btn--ghost btn--sm" onClick={copy} whileTap={{ scale: 0.92 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={copied ? 'y' : 'n'} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.2 }}>
                {copied ? 'Copied ✓' : 'Copy'}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </Reveal>
        <Reveal className="contact__links" delay={0.2}>
          <a href={profile.linkedin} target="_blank" rel="noopener" className="link">LinkedIn ↗</a>
          <a href={profile.github} target="_blank" rel="noopener" className="link">GitHub ↗</a>
          <a href={profile.resume} download="Anand_Torati_Resume.pdf" className="link">Resume ↓</a>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- App ---------------- */
export default function App() {
  const [theme, toggleTheme] = useTheme()
  const reduce = useReducedMotion()
  // Show the boot loader once per browser session
  const [booting, setBooting] = useState(() => {
    try { return !reduce && !sessionStorage.getItem('at-booted') } catch { return !reduce }
  })
  const ready = !booting

  useEffect(() => {
    if (reduce) return
    lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, smoothWheel: true, syncTouch: false })
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenis = null }
  }, [reduce])

  useEffect(() => {
    if (booting) { lenis?.stop(); document.documentElement.style.overflow = 'hidden' }
    else { lenis?.start(); document.documentElement.style.overflow = '' }
  }, [booting])

  const finishBoot = () => {
    try { sessionStorage.setItem('at-booted', '1') } catch { /* ignore */ }
    setBooting(false)
  }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{booting && <Loader key="boot" onDone={finishBoot} />}</AnimatePresence>
      <Progress />
      <Cursor />
      <Nav theme={theme} toggleTheme={toggleTheme} ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Manifesto />
        <About />
        <Journey />
        <Work />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <footer className="footer container">
        <span>© {new Date().getFullYear()} {profile.first} {profile.last}</span>
        <span className="footer__mid">Designed &amp; built with React + Framer Motion</span>
        <Anchor to="top" className="link">Back to top ↑</Anchor>
      </footer>
    </MotionConfig>
  )
}
