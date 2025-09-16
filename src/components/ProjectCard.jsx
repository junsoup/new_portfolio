import { Link } from "wouter"
// src/components/ProjectCard.jsx
export default function ProjectCard({ p }) {
  const isExternal = (url) => /^https?:\/\//i.test(url)
  return (
    <div className="relative overflow-hidden rounded-2xl border border-fg/10 p-5 hover:border-accent/70 transition">

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
        {Object.entries(p.links || {}).map(([label, url]) =>
          url ? (
            isExternal(url) ? (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent transition-colors"
              >
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </a>
            ) : (
              <Link
                key={label}
                href={url}
                className="underline hover:text-accent transition-colors"
              >
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </Link>
            )
          ) : null
        )}      </div>
      {p.base &&
        (isExternal(p.base) ? (
          <a
            href={p.base}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-0"
            aria-label={`View ${p.title}`}
          />
        ) : (
          <Link
            href={p.base}
            className="absolute inset-0 z-0"
            aria-label={`View ${p.title}`}
          />
        ))}
    </div>
  );
}

