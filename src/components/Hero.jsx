// src/components/Hero.jsx
import { useLayoutEffect, useRef } from 'react'
import { animate } from '@motionone/dom'

const NAV_OFFSET = 100

export default function Hero() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const raf = requestAnimationFrame(() => {
      animate(el, { opacity: 1, transform: 'translateY(0px)' }, { duration: .4, easing: 'ease-out' })
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      className="
        relative
        min-h-[calc(100dvh-100px)] pb-[100px]
        grid place-items-center text-center
        w-screen -ml-[50vw] left-1/2
        overflow-visible
        [overflow-x:clip]
        md:pointer-events-auto
        select-none
      "
    >
      {/* Background iframe */}
      <iframe
        id="koi"
        src="https://junsoup.github.io/koi-app/?headless=true"
        aria-hidden="true"
        className="
          pointer-events-none md:pointer-events-auto
          select-none
        "
        style={{
          position: 'absolute',
          top: `-${NAV_OFFSET}px`,
          left: 0,
          width: '100%',
          height: `100dvh`,
          border: '0',
          display: 'block',
          opacity: 0.2,
          zIndex: 0,
          touchAction: 'none',
        }}
        loading="lazy"
        referrerPolicy="no-referrer"
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: `30dvh`,
          backgroundColor: 'var(--bg)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000 100%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000 100%)',
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Foreground content */}
      <div
        ref={ref}
        className="relative z-10 px-4 sm:px-6 md:px-0"
        style={{ opacity: 0, transform: 'translateY(8px)' }}
      >
        <h1 className="text-5xl font-bold">
          Hi, I&apos;m <span className="text-accent">Junsu</span>
        </h1>

        <p className="mt-4 text-fg/80 max-w-xl mx-auto">
          I'm an engineer focused on AI, algorithms, and performant full-stack applications.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <a
            href="#/projects"
            className="px-4 py-2 rounded-xl border border-fg/15 hover:border-fg/35 transition-colors"
          >
            Projects
          </a>
          <a
            href="#/blog"
            className="px-4 py-2 rounded-xl border border-fg/15 hover:border-fg/35 transition-colors"
          >
            Blog
          </a>
        </div>
      </div>
    </section>
  )
}
