// src/pages/Post.jsx
import { useParams } from "react-router-dom"
import { marked } from "marked"
import { parseFrontMatter } from "../utils/frontmatter"

const files = import.meta.glob("../content/posts/*.md", { as: "raw", eager: true })

export default function Post() {
  const { slug } = useParams()
  const match = Object.entries(files).find(([p]) => p.endsWith(`${slug}.md`))
  if (!match) return <div>Post not found.</div>

  const raw = match[1]
  const { data, content } = parseFrontMatter(raw)
  const html = marked.parse(content || "")

  const dateStr = data?.date ? new Date(data.date).toLocaleDateString() : null

  return (
    <article className="prose prose-invert max-w-none">
      {data?.title && <h1>{data.title}</h1>}
      {dateStr && <p className="text-sm text-fg/50">{dateStr}</p>}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}

