import React, { useEffect, useMemo, useState } from 'react'

const weddingDate = new Date('2026-09-13T09:00:00')
const coords = '8.5337564,76.8783493'
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords}`
const mapsEmbedUrl = `https://www.google.com/maps?q=${coords}&z=16&output=embed`
const venueLabel = 'Al Saj Arena, Poundukadavu, Service Road, Thiruvananthapura, Kerala'
const whatsappNumber = '919633311964' // Replace with your WhatsApp number in international format

const galleryItems = [
  {
    image: 'image1.jpeg',
    caption: 'A soft beginning to our forever',
  },
  {
    image: 'image2.jpeg',
    caption: 'Kasavu dreams and golden light',
  },
  {
    image: 'image3.jpeg',
    caption: 'Blessings, jasmine, and joyful hearts',
  },
  {
    image: 'image4.jpeg',
    caption: 'A Pinterest frame for our favourite chapter',
  },
  {
    image: 'image2.jpeg',
    caption: 'Modern romance with Kerala warmth',
  },
  {
    image: 'image2.jpeg',
    caption: 'Moments that feel like poetry',
  },
]

const storyItems = [
  {
    title: 'The Beginning',
    text: 'What started as a simple connection slowly grew into laughter, trust, and a love that felt deeply meant to be.',
  },
  {
    title: 'The Journey',
    text: 'Through shared dreams, warm conversations, and beautiful little moments, we found our way to each other.',
  },
  {
    title: 'The Celebration',
    text: 'Now, with grateful hearts, we invite you to bless our wedding day and celebrate the start of our forever.',
  },
]

function timeLeft() {
  const now = Date.now()
  const diff = weddingDate.getTime() - now

  if (diff <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00' }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function App() {
  const [countdown, setCountdown] = useState(timeLeft())
  const [theme, setTheme] = useState(localStorage.getItem('wedding-theme') || 'light')
  const [showIntro, setShowIntro] = useState(!localStorage.getItem('wedding-intro-seen'))
  const [musicOn, setMusicOn] = useState(true)
  const [guestName, setGuestName] = useState('')
  const [attendance, setAttendance] = useState('Will attend')

  useReveal()

  useEffect(() => {
    const timer = setInterval(() => setCountdown(timeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('wedding-theme', theme)
  }, [theme])

  const audio = useMemo(() => {
    if (typeof Audio === 'undefined') return null
    return new Audio('music.mp3')
  }, [])

  useEffect(() => {
    if (!audio) return
    audio.loop = true
    if (musicOn) {
      audio.play().catch(() => setMusicOn(false))
    } else {
      audio.pause()
    }
    return () => audio.pause()
  }, [audio, musicOn])

  const openIntro = () => {
    setShowIntro(false)
    localStorage.setItem('wedding-intro-seen', 'yes')
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Agney & Adithya,

This is ${guestName || '[Your Name]'}.
I would like to RSVP: ${attendance}.
We are excited to celebrate your wedding on September 13, 2026.

Blessings and love.`
  )

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <div className="site-shell">
      {showIntro && (
        <div className="intro-overlay">
          <div className="intro-card">
            <p className="eyebrow">Save the date</p>
            <h2>Agney & Adithya</h2>
            <p className="intro-date">13 September 2026</p>
            <p>
              With love, joy, and the warmth of Kerala traditions, we invite you to celebrate our wedding.
            </p>
            <button className="primary-btn" onClick={openIntro}>Open Invitation</button>
          </div>
        </div>
      )}

      <div className="top-actions">
        <button className="icon-btn" onClick={() => setMusicOn((v) => !v)}>{musicOn ? '♫ Pause' : '♫ Music'}</button>
        <button className="icon-btn" onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
          {theme === 'light' ? '🌙 Theme' : '☀ Theme'}
        </button>
      </div>

      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="floral-ring floral-ring-left"></div>
        <div className="floral-ring floral-ring-right"></div>
        <div className="container hero-grid reveal">
          <div className="hero-copy">
            <p className="eyebrow">Wedding Invitation</p>
            <h1>Agney & Adithya</h1>
            <p className="hero-subtitle">
              Together with love, we invite you to celebrate our wedding on <strong>September 13, 2026</strong>.
            </p>
            <div className="hero-tags">
              <span>Grooms Reseption: 9 AM </span>
              <span>Muhurtham: 10:30 AM </span>
            </div>
            <div className="hero-buttons">
              <a href="#countdown" className="primary-btn">View Countdown</a>
              <a href="#rsvp" className="primary-btn">RSVP on WhatsApp</a>
            </div>
          </div>

          <div className="hero-card card">
            <div className="hero-card-inner">
              <p className="eyebrow small">Wedding day</p>
              <h3>Wrapped in jasmine, silk, and love</h3>
              <ul>
                <li><strong>Date:</strong> 13 September 2026</li>
                <li><strong>Location:</strong> {venueLabel}</li>
                {/* <li><strong>Map coordinates:</strong> {coords}</li> */}
              </ul>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="countdown" className="section container">
          <div className="section-heading reveal center">
            <p className="eyebrow">Counting down to forever</p>
            <h2>Our wedding day is getting closer</h2>
          </div>
          <div className="countdown-grid reveal">
            {Object.entries(countdown).map(([label, value]) => (
              <div className="count-card card" key={label}>
                <div className="count-value">{value}</div>
                <div className="count-label">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section container">
          <div className="section-heading reveal">
            <p className="eyebrow">Our story</p>
            <h2>Rooted in tradition, growing into forever</h2>
          </div>
          <div className="story-grid">
            {storyItems.map((item, index) => (
              <article className="card story-card reveal" key={item.title} style={{ transitionDelay: `${index * 120}ms` }}>
                <div className="story-number">0{index + 1}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section container">
          <div className="section-heading reveal split-heading">
            <div>
              <p className="eyebrow">Gallery</p>
              <h2>Pinterest frames for our favourite moments</h2>
            </div>
            <p className="section-copy">
              A dreamy gallery inspired by modern wedding mood boards, with soft frames, warm colours, and elegant scroll motion.
            </p>
          </div>
          <div className="masonry-grid">
            {galleryItems.map((item, index) => (
              <figure className="gallery-card reveal" key={item.image} style={{ transitionDelay: `${index * 90}ms` }}>
                <img src={item.image} alt={item.caption} loading="lazy" />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section container">
          <div className="section-heading reveal center">
            <p className="eyebrow">Wedding details</p>
            <h2>Join us for a beautiful Kerala celebration</h2>
          </div>
          <div className="details-grid">
            <div className="card detail-card reveal">
              <span className="detail-icon">📅</span>
              <h3>Date</h3>
              <p>Sunday, September 13, 2026</p>
            </div>
            <div className="card detail-card reveal">
              <span className="detail-icon">💛</span>
              <h3>Couple</h3>
              <p>Agney & Adithya</p>
            </div>
            <div className="card detail-card reveal">
              <span className="detail-icon">📍</span>
              <h3>Venue</h3>
              <p>{venueLabel}<br />{coords}</p>
            </div>
          </div>
        </section>

        <section className="section container map-wrap">
          <div className="section-heading reveal split-heading">
            <div>
              <p className="eyebrow">Map</p>
              <h2>Come celebrate with us</h2>
            </div>
            <a className="primary-btn" href={directionsUrl} target="_blank" rel="noreferrer">Get Directions</a>
          </div>
          <div className="map-card card reveal">
            <iframe
              title="Wedding venue map"
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section id="rsvp" className="section container">
          <div className="rsvp-grid">
            <div className="section-heading reveal">
              <p className="eyebrow">WhatsApp RSVP</p>
              <h2>Send your wishes and confirmation instantly</h2>
              <p className="section-copy">
                Fill in your name, choose your response, and continue straight to WhatsApp with a prefilled RSVP message.
              </p>
            </div>

            <div className="card rsvp-card reveal">
              <label>
                <span>Your name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
              </label>

              <label>
                <span>Attendance</span>
                <select value={attendance} onChange={(e) => setAttendance(e.target.value)}>
                  <option>Will attend</option>
                  <option>Won’t attend</option>
                  <option>Trying my best to attend</option>
                </select>
              </label>

              <a className="whatsapp-btn" href={whatsappUrl} target="_blank" rel="noreferrer">
                RSVP via WhatsApp
              </a>

              <p className="helper-text">
                Replace the WhatsApp number inside <code>src/App.jsx</code> before sharing the site.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer container reveal">
        <p className="eyebrow">With love and gratitude</p>
        <h2>We can’t wait to celebrate with you</h2>
        <p>
          Thank you for being part of our journey. Your presence, blessings, and love will make our day even more special.
        </p>
        <p className="footer-sign">Agney & Adithya • 13 September 2026</p>
      </footer>
    </div>
  )
}
