import { Link } from "react-router-dom";
import entries from "../content/posts/blog_entries.json";
import { parseISO, format } from "date-fns"

export default function BlogIndex() {
  const posts = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section>
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul className="mt-6 space-y-5">
        {posts.map(p => {
          return (
            <li key={p.slug} className="group">
              <Link
                to={`/blog/${p.slug}`}
                className="text-xl font-medium text-accent group-hover:underline"
              >
                {p.title}
              </Link>
              <div className="text-sm text-fg/70">
                {format(parseISO(p.date), "MMMM do, yyyy")} <br />
                {p.description ? p.description : ""}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

