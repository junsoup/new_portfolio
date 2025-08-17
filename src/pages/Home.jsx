// src/pages/Home.jsx
import { motion } from "framer-motion"

export default function Home() {
  return (
    <section className="min-h-[60vh] grid place-items-center text-center">
      <div>
        <motion.h1 initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.4}}
          className="text-5xl font-bold">
          Hi, I'm <span className="text-accent">Junsu</span>
        </motion.h1>
        <p className="mt-4 text-fg/70 max-w-xl mx-auto">
          I build delightful, performant web apps (JS/React, ML, systems).
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <a href="#/projects" className="px-4 py-2 rounded-xl border border-fg/15 hover:border-fg/35">Projects</a>
          <a href="#/blog" className="px-4 py-2 rounded-xl border border-fg/15 hover:border-fg/35">Blog</a>
        </div>
      </div>
    </section>
  )
}

