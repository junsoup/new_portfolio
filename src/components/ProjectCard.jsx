import { Link } from "wouter-preact"
// src/components/ProjectCard.jsx
export default function ProjectCard({ p }) {

  const isExternal = (url = "") => /^https?:\/\//i.test(url)
  const normalizeInternal = (url = "") => {
    const noHash = url.replace(/^#/, "")
    return noHash.startsWith("/") ? noHash : `/${noHash}`
  }

  // navigate when the card background is clicked
  const onCardClick = (e) => {
    // if the user clicked an actual link inside, let it handle itself
    const tag = e.target.closest("a")
    if (tag) return

    if (p.base) {
      if (isExternal(p.base)) {
        window.open(p.base, "_blank", "noopener")
      } else {
        // internal SPA nav
        window.location.hash = "#" + normalizeInternal(p.base)
      }
    }
  }

  // keyboard accessibility for the card
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onCardClick(e)
    }
  }


  return (
    <div className="relative rounded-2xl overflow-hidden border border-fg/10 p-5 hover:border-accent/70 transition cursor-pointer" role={p.base ? "link" : undefined}
      tabIndex={p.base ? 0 : undefined}
      onClick={onCardClick}
      onKeyDown={onKeyDown}
      aria-label={p.base ? `View ${p.title}` : undefined}
    >

      {/* Ribbon (shown only if p.status is provided) */}
      {p.status && (
        <span
          aria-hidden="true"
          className="
            pointer-events-none select-none
            absolute top-7 right-[-5rem]  /* push strip into the corner */
            rotate-25
            bg-[color:var(--accent)]/15 text-[color:var(--accent)]
            border border-[color:var(--accent)]/40 shadow-sm
            uppercase tracking-wider font-semibold
            text-[10px] leading-none
            px-20 py-1.5
            rounded
          "
        >
          {p.status}
        </span>
      )}

      <h3 className="text-lg font-semibold pr-22">{p.title}</h3>
      <p className="mt-2 text-sm pr-4">{p.summary}</p>

      {/* tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-fg/12">
            {t}
          </span>
        ))}
      </div>

      {/* flexible links */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm relative z-10">
        {Object.entries(p.links || {}).map(([label, url]) => {
          if (!url) return null
          const text = label.charAt(0).toUpperCase() + label.slice(1)
          const stop = (e) => e.stopPropagation()

          return isExternal(url) ? (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
              className="underline hover:text-accent transition-colors"
            >
              {text}
            </a>
          ) : (
            <Link
              key={label}
              href={normalizeInternal(url)}
              onClick={stop}
              className="underline hover:text-accent transition-colors"
            >
              {text}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

