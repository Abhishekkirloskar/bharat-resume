import { useState, useRef, useEffect } from 'react'
import { playTudum, unlockAudio } from './sound'

// public/ assets resolve against Vite's base path (works on GitHub Pages too)
const asset = (f) => `${import.meta.env.BASE_URL}photos/${f}`
const RESUME_PDF = `${import.meta.env.BASE_URL}Bharat-Banavalikar-Resume.pdf`
const PHOTO = {
  portrait: asset('bharat-2.jpeg'),
  // billboard slideshow — each photo has its own focal point so the subject
  // stays in frame when the hero is cropped (especially on narrow phones)
  hero: [
    { src: asset('bharat-hero.jpeg'), pos: '50% 32%' },
    { src: asset('bharat-3.jpeg'), pos: '38% 62%' },
    { src: asset('bharat-4.jpeg'), pos: '50% 48%' },
    { src: asset('bharat-5.jpeg'), pos: '50% 40%' },
    { src: asset('bharat-2.jpeg'), pos: '55% 42%' },
  ],
}

const DATA = {
  name: 'BHARAT BANAVALIKAR',
  title: 'Full Stack Developer',
  years: '7+ Years',
  location: 'Bengaluru, India',
  email: 'bharatbanavalikar@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bharat-banavalikar-363ab8106/',
  summary:
    'Full-stack developer with 7+ years of experience delivering scalable enterprise applications using Java, Spring Boot, and Angular. Proven track record in performance optimisation, accessibility enhancements, and end-to-end feature development.',
  experience: [
    {
      id: 'beckman',
      company: 'Beckman Coulter India Pvt. Ltd.',
      role: 'Full Stack Developer',
      period: '09/2021 – Present',
      place: 'Bengaluru, Karnataka',
      match: '98% Match',
      maturity: 'Enterprise',
      art: { from: '#0ea5e9', to: '#0c1f4a', icon: '🔬' },
      tags: ['Java', 'Spring Boot', 'Angular', 'Jasper Reports'],
      points: [
        'Designed and implemented new features to enhance application functionality and user experience.',
        'Developed an Angular-based on-screen keyboard supporting 18 languages, improving accessibility for diverse users.',
        'Built a feature allowing the application to run in the background during tests, reducing support wait times and saving costs.',
        'Resolved complex challenges: memory management, Java heap issues, network drives, physical barcode scanners and data optimisation.',
        'Migrated legacy databases (Dx, Xpertise) to new Cepheid OS, updating internal tools to ensure compatibility.',
        'Facilitated seamless migration from COS 2.0 to COS 2.1 by updating the InstallShield-based installer.',
        'Achieved 100% code coverage by addressing bugs identified by Coverity for a robust, maintainable codebase.',
        'Guided interns across projects and departments, accelerating their onboarding and productivity.',
      ],
    },
    {
      id: 'bosch',
      company: 'Bosch Global Software Technologies',
      role: 'Full Stack Web Developer',
      period: '08/2018 – 08/2021',
      place: 'Bengaluru, Karnataka',
      match: '96% Match',
      maturity: 'Enterprise',
      art: { from: '#ef4444', to: '#3b0a0a', icon: '⚙️' },
      tags: ['Java', 'Spring MVC', 'Angular', 'GraphQL', 'Neo4j', 'Docker'],
      points: [
        'Designed, analyzed, and developed application modules across frontend and backend.',
        'Migrated Angular 4 code and deprecated libraries to Angular 7, improving page load speed by 30%.',
        'Streamlined a lighter version of the application, achieving a 60% reduction in request processing time.',
        'Transferred XML and JSON data to MongoDB, reducing processing time by 75%.',
        'Processed data from XML/JSON files, presenting it through dynamic tables, graphs, and reports.',
        'Implemented single sign-on and authorization using Identity Management API, Active Directory, and LDAP.',
        'Contributed to Docker containerization and setup using Dockerfiles and Docker Compose.',
        'Developed a GraphQL-based proof-of-concept interacting with Neo4j datasets, securing a key client.',
      ],
    },
  ],
  // "Netflix Originals" — featured achievements
  projects: [
    { id: 'p1', title: '18-Language On-Screen Keyboard', meta: 'Accessibility · Angular', icon: '⌨️', from: '#6366f1', to: '#1e1b4b', blurb: 'A multilingual on-screen keyboard supporting 18 languages, improving accessibility for a global user base.' },
    { id: 'p2', title: 'Angular 4 → 7 Migration', meta: 'Performance · +30% load speed', icon: '🚀', from: '#f43f5e', to: '#4c0519', blurb: 'Migrated a large legacy codebase and deprecated libraries to Angular 7, improving page load speed by 30%.' },
    { id: 'p3', title: 'MongoDB Data Pipeline', meta: 'Data · −75% processing time', icon: '🍃', from: '#10b981', to: '#052e1a', blurb: 'Re-architected XML/JSON ingestion into MongoDB, cutting processing time by 75%.' },
    { id: 'p4', title: 'GraphQL + Neo4j PoC', meta: 'Innovation · Won a key client', icon: '🕸️', from: '#d946ef', to: '#3b0764', blurb: 'Built a GraphQL proof-of-concept over Neo4j graph datasets that helped secure a key enterprise client.' },
    { id: 'p5', title: 'Background Test Runner', meta: 'Reliability · Cost savings', icon: '⚙️', from: '#f59e0b', to: '#451a03', blurb: 'Enabled the app to run in the background during tests, reducing support wait times and organisational cost.' },
  ],
  skills: [
    'Java', 'Spring Boot', 'Spring MVC', 'Hibernate', 'SQL', 'Angular', 'Python',
    'GraphQL', 'Neo4j', 'MongoDB', 'Docker', 'REST', 'Git', 'Perforce', 'SVN',
    'Jira', 'Agile', 'Data Structures & Algorithms',
  ],
  education: [
    {
      id: 'edu1',
      school: 'B. V. Bhoomaraddi College of Engineering & Technology',
      degree: 'B.E. Information Science and Engineering',
      period: '2014 – 2018',
      place: 'Hubli, Karnataka',
      extra: 'CGPA: 8.52 / 10',
    },
  ],
}

const PROFILES = [
  { name: 'Bharat', color: 'from-red-500 to-red-800', emoji: '👨‍💻', photo: PHOTO.portrait },
  { name: 'Recruiter', color: 'from-sky-500 to-blue-800', emoji: '🧑‍💼' },
  { name: 'Engineer', color: 'from-emerald-500 to-green-800', emoji: '🛠️' },
  { name: 'Guest', color: 'from-amber-500 to-orange-800', emoji: '🎬' },
]

/* ------------------------------- ENTER --------------------------------- */
// A tap/click here unlocks audio AND fires the TUDUM in the same user
// gesture — the only way mobile browsers (iOS Safari especially) will
// allow the sound to play.
function EnterScreen({ onEnter }) {
  const start = () => {
    unlockAudio()
    playTudum()
    onEnter()
  }
  return (
    <div
      onClick={start}
      className="fixed inset-0 z-[90] bg-black flex flex-col items-center justify-center cursor-pointer select-none px-6"
    >
      <span className="font-display text-red-600 text-6xl md:text-8xl tracking-wider drop-shadow-[0_0_30px_rgba(177,6,15,0.6)] mb-8">
        BHARAT
      </span>
      <div className="flex items-center gap-3 border border-white/30 rounded-full px-6 py-3 text-white/90 hover:bg-white/10 transition-colors">
        <span className="text-xl">🔊 ▶</span>
        <span className="text-sm md:text-base tracking-wide">Tap to enter</span>
      </div>
      <p className="text-gray-500 text-xs mt-6">with sound</p>
    </div>
  )
}

/* ------------------------------- INTRO --------------------------------- */
// TUDUM ident: the wordmark zooms in with sweeping light bars and a shine,
// then hands off to the profile gate. (Sound was fired on the enter tap.)
function Intro({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      className="tudum-screen fixed inset-0 z-[80] bg-black flex items-center justify-center cursor-pointer overflow-hidden"
      onClick={onDone}
      title="Skip"
    >
      <div className="intro-zoom relative flex items-center justify-center w-full h-full">
        {/* ribbon bars rising behind the wordmark */}
        <div className="absolute inset-0 flex justify-center items-stretch gap-[3px] md:gap-1.5 px-6 md:px-24 opacity-50">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="tudum-bar flex-1 max-w-[14px] bg-gradient-to-t from-[#3d0709] via-[#b1060f] to-[#ff5a5f]"
              style={{ animationDelay: `${i * 0.03}s, ${1.1 + (i % 6) * 0.1}s` }}
            />
          ))}
        </div>
        {/* the wordmark with a light sweeping through it */}
        <h1 className="word-in relative z-10 select-none">
          <span className="shine-text font-display text-[16vw] md:text-[12rem] leading-none tracking-wider drop-shadow-[0_0_40px_rgba(177,6,15,0.6)]">
            BHARAT
          </span>
        </h1>
      </div>
    </div>
  )
}

/* ----------------------------- PROFILE GATE ----------------------------- */
function ProfileGate({ onPick }) {
  const [picked, setPicked] = useState(null)

  const choose = (p) => {
    if (picked) return
    setPicked(p)
    // let the zoom animation play, then reveal the browse page
    setTimeout(() => onPick(p.name), 950)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className={`flex flex-col items-center transition-opacity duration-500 ${picked ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-3xl md:text-5xl text-white/90 font-light mb-12">Who's hiring?</h1>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {PROFILES.map((p) => (
            <button key={p.name} onClick={() => choose(p)} className="profile-tile group flex flex-col items-center gap-3">
              <div className={`w-24 h-24 md:w-36 md:h-36 rounded-md overflow-hidden bg-gradient-to-br ${p.color} flex items-center justify-center text-5xl md:text-7xl group-hover:ring-4 ring-white`}>
                {p.photo
                  ? <img src={p.photo} alt={p.name} className="w-full h-full object-cover object-[50%_25%]" />
                  : p.emoji}
              </div>
              <span className="text-gray-400 group-hover:text-white text-lg md:text-xl">{p.name}</span>
            </button>
          ))}
        </div>
        <p className="text-gray-500 mt-12 text-sm">Select a profile to view Bharat's portfolio</p>
      </div>

      {/* the selected avatar zooms up to fill the screen, Netflix-style */}
      {picked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414]">
          <div className={`profile-zoom w-36 h-36 rounded-md overflow-hidden bg-gradient-to-br ${picked.color} flex items-center justify-center text-7xl`}>
            {picked.photo
              ? <img src={picked.photo} alt={picked.name} className="w-full h-full object-cover object-[50%_25%]" />
              : picked.emoji}
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------------------- NAVBAR -------------------------------- */
function Navbar({ profile }) {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`fixed top-0 inset-x-0 z-40 transition-colors ${solid ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-3">
        <div className="flex items-center gap-8">
          <span className="font-display text-2xl md:text-3xl text-red-600 tracking-wider">BHARAT</span>
          <div className="hidden md:flex gap-5 text-sm text-gray-300">
            <a href="#experience" className="hover:text-white">Experience</a>
            <a href="#projects" className="hover:text-white">Featured Work</a>
            <a href="#skills" className="hover:text-white">Skills</a>
            <a href="#education" className="hover:text-white">Education</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span className="hidden sm:inline">{profile}</span>
          <div className="w-8 h-8 rounded overflow-hidden bg-gradient-to-br from-red-500 to-red-800 flex items-center justify-center">
            <img src={PHOTO.portrait} alt="profile" className="w-full h-full object-cover object-[50%_25%]" />
          </div>
        </div>
      </div>
    </nav>
  )
}

/* -------------------------------- HERO --------------------------------- */
function Hero({ onPlay, onInfo }) {
  const [idx, setIdx] = useState(0)

  // rotate the billboard photo every 5s
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PHOTO.hero.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <header className="group relative h-[88vh] min-h-[560px] flex items-end overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3a0d12] via-[#141414] to-black" />
      {/* billboard slideshow on the right — crossfades, brightens & zooms on hover */}
      {PHOTO.hero.map((photo, i) => (
        <img
          key={photo.src}
          src={photo.src}
          alt="Bharat Banavalikar"
          aria-hidden={i !== idx}
          decoding="async"
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchpriority={i === 0 ? 'high' : 'low'}
          style={{ objectPosition: photo.pos }}
          className={`absolute right-0 top-0 h-full w-full md:w-[60%] object-cover transition-all duration-1000 group-hover:scale-105 group-hover:brightness-110 ${
            i === idx ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {/* fades so the photo melts into the page (left + bottom); they recede on hover to reveal the photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 md:via-[#141414]/40 to-transparent transition-opacity duration-700 group-hover:opacity-20" />
      <div className="absolute inset-0 hero-fade transition-opacity duration-700 group-hover:opacity-50" />

      <div className="relative px-4 md:px-12 pb-24 max-w-3xl fade-up">
        {/* text blurs & dims on hover so the photo takes the spotlight */}
        <div className="transition-all duration-500 group-hover:blur-sm group-hover:opacity-30">
          <p className="text-red-600 font-semibold tracking-widest mb-3 text-sm">B&nbsp;·&nbsp;ORIGINAL</p>
          <h1 className="font-display text-5xl md:text-8xl leading-none mb-4">{DATA.name}</h1>
          <div className="flex items-center gap-3 text-sm md:text-base text-gray-300 mb-4">
            <span className="text-green-500 font-semibold">98% Match</span>
            <span>{DATA.years}</span>
            <span className="border border-gray-500 px-1 text-xs">HD</span>
            <span>{DATA.title}</span>
            <span>📍 {DATA.location}</span>
          </div>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl">{DATA.summary}</p>
        </div>
        <div className="flex flex-wrap gap-3 mt-6">
          <button onClick={onPlay} className="flex items-center gap-2 bg-white text-black font-semibold px-6 md:px-8 py-2.5 rounded hover:bg-white/80 transition-colors">
            ▶ Play
          </button>
          <button onClick={onInfo} className="flex items-center gap-2 bg-gray-500/40 text-white font-semibold px-6 md:px-8 py-2.5 rounded hover:bg-gray-500/30 transition-colors">
            ⓘ More Info
          </button>
          <a
            href={RESUME_PDF}
            download
            className="group flex items-center gap-2.5 bg-white/10 backdrop-blur border border-white/30 text-white font-semibold px-6 md:px-8 py-2.5 rounded hover:bg-white/20 hover:border-white/60 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 transition-transform group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v12" />
              <path d="m7 12 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Résumé
          </a>
        </div>
      </div>

      {/* slideshow indicator dots */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-2">
        {PHOTO.hero.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Show photo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === idx ? 'w-6 bg-red-600' : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </header>
  )
}

/* ------------------------------- ROW ----------------------------------- */
function Row({ id, title, children }) {
  const ref = useRef(null)
  const scroll = (dir) => {
    if (ref.current) ref.current.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' })
  }
  return (
    <section id={id} className="relative px-4 md:px-12 mb-12 scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-semibold mb-3">{title}</h2>
      <div className="group relative">
        <button onClick={() => scroll(-1)} className="hidden md:flex absolute -left-12 top-0 bottom-0 z-30 w-10 items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-2xl">‹</button>
        <div ref={ref} className="row-scroll flex gap-3 overflow-x-auto pb-4">
          {children}
        </div>
        <button onClick={() => scroll(1)} className="hidden md:flex absolute -right-12 top-0 bottom-0 z-30 w-10 items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-2xl">›</button>
      </div>
    </section>
  )
}

/* ------------------------------- CARDS --------------------------------- */
function ExperienceCard({ job, onClick }) {
  return (
    <button onClick={onClick} className="nf-card shrink-0 w-72 md:w-80 text-left rounded-md overflow-hidden bg-[#1f1f1f]">
      <div className="relative h-32 overflow-hidden flex items-end p-4">
        <div
          className="absolute inset-0 anim-gradient"
          style={{ backgroundImage: `linear-gradient(120deg, ${job.art.from}, ${job.art.to}, ${job.art.from})` }}
        />
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <span className="float-icon absolute right-3 top-2 text-5xl drop-shadow-lg">{job.art.icon}</span>
        <span className="relative font-display text-2xl drop-shadow">{job.company.split(' ')[0]}</span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs mb-2">
          <span className="text-green-500 font-semibold">{job.match}</span>
          <span className="border border-gray-500 px-1 text-gray-300">{job.maturity}</span>
          <span className="text-gray-400">{job.period.split(' – ')[1] || job.period}</span>
        </div>
        <h3 className="font-semibold">{job.role}</h3>
        <p className="text-gray-400 text-sm">{job.company}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {job.tags.slice(0, 4).map((t) => (
            <span key={t} className="text-[11px] text-gray-300 bg-white/10 px-2 py-0.5 rounded">{t}</span>
          ))}
        </div>
      </div>
    </button>
  )
}

function ProjectCard({ p, onClick }) {
  return (
    <button onClick={onClick} className="nf-card shrink-0 w-60 md:w-72 text-left rounded-md overflow-hidden bg-[#1f1f1f]">
      <div className="relative h-36 overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 anim-gradient"
          style={{ backgroundImage: `linear-gradient(120deg, ${p.from}, ${p.to}, ${p.from})` }}
        />
        <div className="absolute inset-0 grid-overlay opacity-25" />
        <span className="float-icon relative text-5xl drop-shadow-lg">{p.icon}</span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold leading-snug">{p.title}</h3>
        <p className="text-red-500 text-xs mt-1">{p.meta}</p>
      </div>
    </button>
  )
}

function SkillCard({ skill }) {
  return (
    <div className="nf-card shrink-0 w-40 md:w-48 h-24 rounded-md bg-gradient-to-br from-[#262626] to-[#1a1a1a] flex items-center justify-center text-center px-3 border border-white/5">
      <span className="font-semibold text-sm md:text-base">{skill}</span>
    </div>
  )
}

/* ------------------------------- MODAL --------------------------------- */
function Modal({ job, onClose }) {
  useEffect(() => {
    if (!job) return // only lock scroll while a modal is actually open
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [job, onClose])
  if (!job) return null
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-start md:items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-[#181818] rounded-lg max-w-2xl w-full my-8 overflow-hidden fade-up" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-40 bg-gradient-to-br from-red-700/70 to-[#181818] flex items-end p-6">
          <span className="font-display text-4xl">{job.company}</span>
          <button onClick={onClose} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black flex items-center justify-center text-xl">✕</button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 text-sm mb-4">
            <span className="text-green-500 font-semibold">{job.match}</span>
            <span className="text-gray-300">{job.period}</span>
            <span className="border border-gray-500 px-1 text-xs">HD</span>
            <span className="text-gray-400">{job.place}</span>
          </div>
          <h3 className="text-xl font-semibold mb-4">{job.role}</h3>
          <ul className="space-y-2 mb-5">
            {job.points.map((pt, i) => (
              <li key={i} className="text-gray-300 text-sm flex gap-2">
                <span className="text-red-500">▸</span><span>{pt}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((t) => (
              <span key={t} className="text-xs text-gray-200 bg-white/10 px-2 py-1 rounded">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------- APP ----------------------------------- */
function App() {
  const [entered, setEntered] = useState(false)
  const [intro, setIntro] = useState(true)
  const [profile, setProfile] = useState(null)
  const [modal, setModal] = useState(null)

  if (!entered) return <EnterScreen onEnter={() => setEntered(true)} />
  if (intro) return <Intro onDone={() => setIntro(false)} />
  if (!profile) return <ProfileGate onPick={setProfile} />

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="pb-16 page-reveal">
      <Navbar profile={profile} />
      <Hero onPlay={() => scrollTo('experience')} onInfo={() => setModal(DATA.experience[0])} />

      <main className="relative z-10 -mt-16">
        <Row id="experience" title="Experience">
          {DATA.experience.map((job) => (
            <ExperienceCard key={job.id} job={job} onClick={() => setModal(job)} />
          ))}
        </Row>

        <Row id="projects" title="Featured Work — B Originals">
          {DATA.projects.map((p) => (
            <ProjectCard key={p.id} p={p} onClick={() => setModal({
              company: p.title, role: p.meta, period: '', place: '', match: 'Featured',
              tags: [], points: [p.blurb],
            })} />
          ))}
        </Row>

        <Row id="skills" title="Top Skills">
          {DATA.skills.map((s) => <SkillCard key={s} skill={s} />)}
        </Row>

        <Row id="education" title="Education">
          {DATA.education.map((ed) => (
            <div key={ed.id} className="nf-card shrink-0 w-80 rounded-md bg-[#1f1f1f] p-5 text-left">
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="font-semibold">{ed.degree}</h3>
              <p className="text-gray-400 text-sm mt-1">{ed.school}</p>
              <p className="text-gray-500 text-sm mt-2">{ed.period} · {ed.place}</p>
              <p className="text-green-500 text-sm mt-1">{ed.extra}</p>
            </div>
          ))}
        </Row>

        {/* CONTACT */}
        <section id="contact" className="px-4 md:px-12 mt-16 scroll-mt-24">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Get in touch</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            <a href={`mailto:${DATA.email}`} className="nf-card bg-[#1f1f1f] rounded-md p-5 text-left">
              <div className="text-2xl mb-2">✉️</div>
              <p className="text-sm text-gray-300 break-all">{DATA.email}</p>
            </a>
            <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="nf-card bg-[#1f1f1f] rounded-md p-5 text-left">
              <div className="text-2xl mb-2">💼</div>
              <p className="text-sm text-gray-300">LinkedIn Profile</p>
            </a>
          </div>
        </section>

        <footer className="px-4 md:px-12 mt-16 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} {DATA.name} · Built in the style of Netflix · Not affiliated with Netflix.</p>
        </footer>
      </main>

      <Modal job={modal} onClose={() => setModal(null)} />
    </div>
  )
}

export default App
