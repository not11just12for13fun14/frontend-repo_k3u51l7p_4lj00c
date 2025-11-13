import React, { useEffect, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import './winplus.css'

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav">
        <a href="#" className="brand">
          <div className="brand-logo">W+</div>
          <div className="brand-name">WinPlus Software Solutions</div>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <div className="dropdown" onMouseLeave={(e)=>e.currentTarget.classList.remove('open')}>
            <div className="dropdown-btn" onMouseEnter={(e)=>e.currentTarget.parentElement.classList.add('open')}>
              Solutions
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div className="dropdown-menu" role="menu">
              <a href="#industries">Power Systems</a>
              <a href="#industries">Process Automation</a>
              <a href="#services">Instrumentation</a>
              <a href="#services">SCADA & IIoT</a>
            </div>
          </div>
          <a href="#clients">Clients</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className={`hamburger ${open ? 'active' : ''}`} aria-label="Toggle menu" onClick={()=>setOpen(!open)}>
          <span></span>
        </button>
      </div>
      {open && (
        <div className="mobile-menu">
          <a href="#services" onClick={()=>setOpen(false)}>Services</a>
          <a href="#about" onClick={()=>setOpen(false)}>About</a>
          <a href="#industries" onClick={()=>setOpen(false)}>Solutions</a>
          <a href="#clients" onClick={()=>setOpen(false)}>Clients</a>
          <a href="#contact" onClick={()=>setOpen(false)}>Contact</a>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="home" aria-label="Hero">
      <Spline scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="kicker">Industrial Automation Experts</div>
        <h1>Electrical Systems, Instrumentation, and Automation at Global Scale</h1>
        <p>
          WinPlus delivers turnkey solutions for power systems, process control, SCADA, and IIoT. We help factories, energy, and infrastructure leaders build resilient, data-driven operations.
        </p>
        <div className="cta-row">
          <a className="btn" href="#contact">Request a consultation</a>
          <a className="btn secondary" href="#services">Explore services</a>
        </div>
      </div>
      <div className="floaters" aria-hidden>
        <div className="chip">PLC & DCS</div>
        <div className="chip">SCADA/IIoT</div>
        <div className="chip">Electrical Safety</div>
      </div>
    </section>
  )
}

function Services() {
  const items = [
    { title:'Electrical Systems', desc:'Design, switchgear, protection, and commissioning for LV/MV/HV systems.', icon:'⚡' },
    { title:'Instrumentation', desc:'Smart sensors, transmitters, analyzers and calibration for precise control.', icon:'📟' },
    { title:'Industrial Automation', desc:'PLC, DCS, SCADA, HMI with standards-driven programming and validation.', icon:'🤖' },
    { title:'Drives & Motion', desc:'VFDs, servo, robotics integration for efficient motion control.', icon:'🛠️' },
    { title:'Energy Management', desc:'Power quality, metering, dashboards, and sustainability reporting.', icon:'📈' },
    { title:'Cybersecurity', desc:'IEC 62443-aligned architectures and hardening for OT networks.', icon:'🔒' },
  ]
  return (
    <section className="section" id="services">
      <div className="container">
        <p className="eyebrow">What we do</p>
        <h2>Services built for modern industry</h2>
        <p className="lead">From brownfield upgrades to greenfield plants, our multidisciplinary teams deliver end-to-end electrical and automation solutions.</p>
        <div className="grid grid-3 mt-6">
          {items.map((it, i) => (
            <article key={i} className="card reveal" style={{transitionDelay:`${i*60}ms`}}>
              <div className="icon" aria-hidden>{it.icon}</div>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  const counters = [
    { label:'Projects Delivered', value: 1200 },
    { label:'Global Clients', value: 300 },
    { label:'Years of Expertise', value: 18 },
  ]
  useEffect(() => {
    const els = document.querySelectorAll('[data-counter]')
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el = entry.target
          const target = parseInt(el.getAttribute('data-counter')||'0',10)
          let cur = 0
          const step = Math.max(1, Math.round(target/60))
          const int = setInterval(()=>{
            cur += step
            if(cur >= target){cur = target; clearInterval(int)}
            el.textContent = cur.toLocaleString()
          }, 16)
          obs.unobserve(el)
        }
      })
    },{threshold:0.4})
    els.forEach(el=>obs.observe(el))
    return ()=>obs.disconnect()
  }, [])

  return (
    <section className="section" id="about">
      <div className="container about">
        <div>
          <p className="eyebrow">About us</p>
          <h2>Engineering reliability into every system</h2>
          <p className="lead">We combine domain expertise with rigorous project management to deliver on-time, on-budget outcomes across power, process, and discrete manufacturing.</p>
          <div className="stats mt-6">
            {counters.map((c,i)=> (
              <div className="stat reveal" key={i} style={{transitionDelay:`${i*80}ms`}}>
                <div className="num" aria-live="polite" data-counter={c.value}>0</div>
                <div className="label">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1742112125554-fdb788faedaa?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxFbmdpbmVlcnMlMjBjb2xsYWJvcmF0aW5nJTIwaW4lMjBhfGVufDB8MHx8fDE3NjMwMTM5NDJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Engineers collaborating in a control room" style={{borderRadius:16}}/>
        </div>
      </div>
    </section>
  )
}

function Industries() {
  const list = [
    {name:'Oil & Gas', desc:'Process control, safety systems, and asset integrity.'},
    {name:'Energy & Utilities', desc:'Grid automation, substations, and metering.'},
    {name:'Water & Wastewater', desc:'SCADA, telemetry, and reliability engineering.'},
    {name:'Pharma', desc:'GxP compliant automation with data integrity.'},
    {name:'Food & Beverage', desc:'Line integration, OEE, and traceability.'},
    {name:'Metals & Mining', desc:'Drives, hoists, and electrical distribution.'},
  ]
  return (
    <section className="section" id="industries">
      <div className="container">
        <p className="eyebrow">Industries</p>
        <h2>Trusted across critical sectors</h2>
        <div className="grid grid-3 mt-6">
          {list.map((it,i)=> (
            <div className="industry reveal" key={i} style={{transitionDelay:`${i*70}ms`}}>
              <div className="i">{String.fromCodePoint(0x1F3ED + (i%6))}</div>
              <div>
                <h3 style={{margin:'4px 0'}}>{it.name}</h3>
                <p className="muted">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Clients() {
  const logos = new Array(12).fill(0).map((_,i)=>`https://dummyimage.com/200x100/ffffff/0b1220&text=Client+${i+1}`)
  return (
    <section className="section" id="clients">
      <div className="container">
        <p className="eyebrow">Clients</p>
        <h2>Partnering with industry leaders</h2>
        <div className="clients mt-6">
          {logos.map((src,i)=> (
            <img className="logo reveal" key={i} src={src} alt={`Client ${i+1} logo`} style={{transitionDelay:`${i*40}ms`}}/>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials(){
  const [index,setIndex] = useState(0)
  const items = [
    {name:'A. Kumar', role:'Plant Head, FMCG', quote:'WinPlus modernized our packaging lines with minimal downtime and measurable energy savings.', img:'https://randomuser.me/api/portraits/men/32.jpg', stars:5},
    {name:'L. Santos', role:'Utilities Manager, Pharma', quote:'Their validation-ready SCADA helped us pass audits with confidence.', img:'https://randomuser.me/api/portraits/women/65.jpg', stars:5},
    {name:'M. Chen', role:'Operations Director, Metals', quote:'Real-time insights improved throughput and reduced unplanned stops.', img:'https://randomuser.me/api/portraits/men/76.jpg', stars:4},
  ]
  useEffect(()=>{
    const id = setInterval(()=> setIndex((p)=> (p+1)%items.length), 5000)
    return ()=>clearInterval(id)
  },[])
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <p className="eyebrow">Testimonials</p>
        <h2>What our clients say</h2>
        <div className="carousel mt-6">
          <div className="carousel-track" style={{transform:`translateX(-${index*100}%)`}}>
            {items.map((t,i)=> (
              <article className="testimonial" key={i}>
                <img src={t.img} alt={`${t.name} photo`} />
                <div>
                  <div style={{fontWeight:800}}>{t.name}</div>
                  <div className="muted" style={{marginTop:2}}>{t.role}</div>
                  <p className="quote mt-3">“{t.quote}”</p>
                  <div className="stars mt-2">{'★'.repeat(t.stars)}{'☆'.repeat(5-t.stars)}</div>
                </div>
              </article>
            ))}
          </div>
          <div className="carousel-dots">
            {items.map((_,i)=> (
              <button key={i} className={`dot ${i===index?'active':''}`} aria-label={`Go to slide ${i+1}`} onClick={()=>setIndex(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact(){
  const [status,setStatus] = useState('idle')
  const [errors,setErrors] = useState({})
  function onSubmit(e){
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd.entries())
    const errs = {}
    if(!data.name) errs.name = 'Please enter your name'
    if(!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) errs.email = 'Enter a valid email'
    if(!data.message || String(data.message).length < 10) errs.message = 'Message must be at least 10 characters'
    setErrors(errs)
    if(Object.keys(errs).length===0){
      setStatus('loading')
      setTimeout(()=> setStatus('success'), 800)
    }
  }
  return (
    <section className="section" id="contact">
      <div className="container">
        <p className="eyebrow">Contact</p>
        <h2>Let’s build reliable, intelligent operations</h2>
        <form className="form mt-6" onSubmit={onSubmit} noValidate>
          <div className="input">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" placeholder="Jane Doe" aria-invalid={!!errors.name} />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="jane@company.com" aria-invalid={!!errors.email} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="input full">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} placeholder="Tell us about your project..." aria-invalid={!!errors.message} />
            {errors.message && <span className="error">{errors.message}</span>}
          </div>
          <div className="input full">
            <button className="btn orange" disabled={status==='loading'}>
              {status==='loading' ? 'Sending…' : 'Send message'}
            </button>
          </div>
          {status==='success' && <div className="full success">Thanks! We’ll get back to you soon.</div>}
        </form>
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer className="footer section-sm">
      <div className="container grid grid-4">
        <div>
          <a href="#" className="brand" style={{color:'#fff'}}>
            <div className="brand-logo">W+</div>
            <div className="brand-name">WinPlus</div>
          </a>
          <p className="mt-3" style={{maxWidth:420}}>WinPlus Software Solutions delivers electrical, instrumentation, and automation systems for critical industries worldwide.</p>
          <div className="mt-4" style={{display:'flex',gap:10}}>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Twitter">X</a>
            <a href="#" aria-label="YouTube">▶</a>
          </div>
        </div>
        <div>
          <h4>Company</h4>
          <ul style={{listStyle:'none',padding:0,margin:0}}>
            <li className="mt-2"><a href="#about">About</a></li>
            <li className="mt-2"><a href="#clients">Clients</a></li>
            <li className="mt-2"><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul style={{listStyle:'none',padding:0,margin:0}}>
            <li className="mt-2"><a href="#services">Electrical Systems</a></li>
            <li className="mt-2"><a href="#services">Instrumentation</a></li>
            <li className="mt-2"><a href="#services">Automation</a></li>
          </ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul style={{listStyle:'none',padding:0,margin:0}}>
            <li className="mt-2"><a href="#">Case Studies</a></li>
            <li className="mt-2"><a href="#">Certifications</a></li>
            <li className="mt-2"><a href="#">Careers</a></li>
          </ul>
        </div>
      </div>
      <div className="copyright mt-6">© {new Date().getFullYear()} WinPlus Software Solutions. All rights reserved.</div>
    </footer>
  )
}

function BackToTop(){
  useEffect(()=>{
    const btn = document.getElementById('backToTop')
    const onScroll = () => {
      if(window.scrollY > 400) btn?.classList.add('show'); else btn?.classList.remove('show')
    }
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])
  return (
    <button id="backToTop" aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑</button>
  )
}

function Preloader(){
  const [hide,setHide] = useState(false)
  useEffect(()=>{
    const id = setTimeout(()=> setHide(true), 700)
    return ()=> clearTimeout(id)
  },[])
  if(hide) return null
  return (
    <div className="preloader" role="status" aria-live="polite"><div className="loader"/></div>
  )
}

export default function App(){
  useScrollReveal()
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Industries />
        <Clients />
        <Testimonials />
        <Contact />
      </main>
      <BackToTop />
      <Footer />
    </>
  )
}
