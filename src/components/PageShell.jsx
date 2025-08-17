// src/components/PageShell.jsx
import { Outlet, Link } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"

export default function PageShell() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <header className="sticky top-0 z-10 backdrop-blur border-b border-white/10">
        <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
          <Link to="/" className="font-bold">Junsu Lee</Link>
          <div className="ml-auto flex items-center gap-4 text-[color:var(--fg)]/80">
            <Link to="/blog" className="hover:text-[var(--accent)]">Blog</Link>
            <Link to="/projects" className="hover:text-[var(--accent)]">Projects</Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-5xl px-4 py-8 text-sm text-[color:var(--fg)]/70">
        © {new Date().getFullYear()} Junsu Lee 
      </footer>
    </div>
  )
}

