// The "TUDUM" ident sound, synthesized with the Web Audio API — a deep,
// punchy two-hit cinematic stinger. No audio files, so it ships fine to
// static hosts. Browsers block autoplay audio until a user gesture, so
// playTudum() will resume the context and fire on the first interaction
// if it can't play immediately.

let ctx = null

function ac() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  return ctx
}

// The low rising swell that leads into the two hits.
function swell(c, t0, dur) {
  const osc = c.createOscillator()
  const g = c.createGain()
  const lp = c.createBiquadFilter()
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(34, t0)
  osc.frequency.exponentialRampToValueAtTime(82, t0 + dur)
  lp.type = 'lowpass'
  lp.frequency.setValueAtTime(140, t0)
  lp.frequency.exponentialRampToValueAtTime(320, t0 + dur)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(0.16, t0 + dur * 0.92)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur + 0.06)
  osc.connect(lp).connect(g).connect(c.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.12)
}

// A single bass "dum" — sub-sine + triangle body, plus a bright bell
// partial on the big hit for that orchestral ring.
function hit(c, t, big) {
  const osc = c.createOscillator()
  const sub = c.createOscillator()
  const g = c.createGain()
  osc.type = 'triangle'
  sub.type = 'sine'
  const f0 = big ? 104 : 116
  const f1 = big ? 47 : 70
  osc.frequency.setValueAtTime(f0, t)
  osc.frequency.exponentialRampToValueAtTime(f1, t + 0.45)
  sub.frequency.setValueAtTime(big ? 47 : 58, t)
  const peak = big ? 0.6 : 0.36
  const tail = big ? 1.2 : 0.55
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(peak, t + 0.015)
  g.gain.exponentialRampToValueAtTime(0.0001, t + tail)
  osc.connect(g)
  sub.connect(g)
  g.connect(c.destination)
  osc.start(t)
  sub.start(t)
  osc.stop(t + tail + 0.1)
  sub.stop(t + tail + 0.1)

  if (big) {
    const bell = c.createOscillator()
    const bg = c.createGain()
    bell.type = 'sine'
    bell.frequency.setValueAtTime(330, t)
    bell.frequency.exponentialRampToValueAtTime(174, t + 0.35)
    bg.gain.setValueAtTime(0.0001, t)
    bg.gain.exponentialRampToValueAtTime(0.13, t + 0.012)
    bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.6)
    bell.connect(bg).connect(c.destination)
    bell.start(t)
    bell.stop(t + 0.7)
  }
}

function fire(c) {
  const now = c.currentTime + 0.05
  swell(c, now, 0.55)          // low rising swell
  hit(c, now + 0.55, false)    // "ta"
  hit(c, now + 0.72, true)     // "DUM"
}

// Must be called from inside a user-gesture handler (click/touch). This
// resumes the context and plays a 1-sample silent buffer, which is what
// unlocks Web Audio on iOS Safari and other mobile browsers.
export function unlockAudio() {
  const c = ac()
  if (!c) return
  if (c.state === 'suspended') c.resume()
  try {
    const buf = c.createBuffer(1, 1, 22050)
    const src = c.createBufferSource()
    src.buffer = buf
    src.connect(c.destination)
    src.start(0)
  } catch {
    /* no-op */
  }
}

export function playTudum() {
  const c = ac()
  if (!c) return
  if (c.state === 'suspended') {
    // shouldn't happen if unlockAudio() ran in the gesture, but resume + retry
    c.resume().then(() => fire(c)).catch(() => {})
  } else {
    fire(c)
  }
}
