// src/pages/BlogIndex.jsx
import { Link } from "react-router-dom"
import { parseFrontMatter } from "../utils/frontmatter.js"

const files = import.meta.glob("../content/posts/*.md", { as: "raw", eager: true })
const posts = Object.entries(files).map(([path, raw]) => {
  const { data } = parseFrontMatter(raw)
  const slug = path.split("/").pop().replace(".md","")
  return { slug, ...data }
})

export default function BlogIndex() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul className="mt-6 space-y-4">
        {posts.map(p => (
          <li key={p.slug} className="group">
            <Link to={`/blog/${p.slug}`} className="text-xl font-medium text-accent group-hover:underline">
              {p.title}
            </Link>
            <div className="text-sm text-fg/70">{new Date(p.date).toLocaleDateString()} • {p.description}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

