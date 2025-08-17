// src/components/PageShell.jsx
import { Outlet, Link } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"

export default function PageShell() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-10 backdrop-blur border-b border-fg/10">
        <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
          <Link to="/" className="font-bold">Junsu Lee</Link>
          <div className="ml-auto flex items-center gap-4 text-fg/80">
            <Link to="/blog" className="hover:text-accent">Blog</Link>
            <Link to="/projects" className="hover:text-accent">Projects</Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-5xl px-4 py-8 text-sm text-fg/70">
        © {new Date().getFullYear()} Junsu Lee 
      </footer>
    </div>
  )
}

