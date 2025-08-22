// src/components/PageShell.jsx
import { Link } from "wouter-preact"
import ThemeToggle from "./ThemeToggle"

export default function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-10 backdrop-blur border-b border-fg/10">
        <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
          <Link href="/" className="font-bold">Junsu Lee</Link>
          <div className="ml-auto flex items-center gap-4 text-fg/80">
            <Link href="/projects" className="hover:text-accent">Projects</Link>
            <Link href="/blog" className="hover:text-accent">Blog</Link>
            <Link href="/contact" className="hover:text-accent">Contact</Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      <footer className="mx-auto max-w-5xl px-4 py-8 text-sm text-fg/70">
        © {new Date().getFullYear()} Junsu Lee
      </footer>
    </div>
  )
}

