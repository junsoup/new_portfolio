// src/components/Hero.jsx
import { useLayoutEffect, useRef } from 'preact/hooks'
import { animate } from '@motionone/dom'

export default function Hero() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    // Start on the next frame so the initial inline styles are applied pre-paint
    const raf = requestAnimationFrame(() => {
      animate(
        el,
        { opacity: 1, transform: 'translateY(0px)' },
        { duration: 0.4, easing: 'ease-out' }
      )
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className="min-h-[calc(100dvh-100px)] pb-[100px] grid place-items-center text-center">
      {/* Initial state is inlined so it never flashes visible before animating */}
      <div ref={ref} style={{ opacity: 0, transform: 'translateY(8px)' }}>
        <h1 className="text-5xl font-bold">
          Hi, I&apos;m <span className="text-accent">Junsu</span>
        </h1>

        <p className="mt-4 text-fg/70 max-w-xl mx-auto">
          I build delightful, performant web apps (JS/Preact, ML, systems).
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <a href="#/projects" className="px-4 py-2 rounded-xl border border-fg/15 hover:border-fg/35 transition-colors">
            Projects
          </a>
          <a href="#/blog" className="px-4 py-2 rounded-xl border border-fg/15 hover:border-fg/35 transition-colors">
            Blog
          </a>
        </div>
      </div>
    </section>
  )
}

