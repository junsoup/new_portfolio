// src/components/ProjectCard.jsx
export default function ProjectCard({ p }) {
  return (
    <div className="rounded-2xl border border-white/10 p-5 hover:border-teal-300/40 transition">
      <h3 className="text-lg font-semibold">{p.title}</h3>
      <p className="mt-2 text-sm text-zinc-300">{p.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {p.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-zinc-800">{t}</span>)}
      </div>
      <div className="mt-4 flex gap-3 text-sm">
        {p.links.demo && <a className="underline" href={p.links.demo} target="_blank">Demo</a>}
        {p.links.code && <a className="underline" href={p.links.code} target="_blank">Code</a>}
      </div>
    </div>
  )
}

