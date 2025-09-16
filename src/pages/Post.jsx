import { useRoute } from "wouter"
import entries from "../content/posts/blog_entries.json";

// Eager-import all post components: src/content/posts/<slug>.jsx
const componentsByPath = import.meta.glob("../content/posts/*.jsx", { eager: true });

function baseUrl() {
  return (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
}

// Recursively clone and normalize <img> elements:
// - prepend BASE_URL + /posts/
// - add class "block h-auto" by default
// - add loading="lazy" by default
function normalizeImages(node) {
  if (node == null || typeof node !== "object") return node;

  // If this is a React element
  if (node.$$typeof) {
    const { type, props } = node;

    if (type === "img") {
      const next = { ...props };

      // default classes
      const cls = (next.className || "").split(/\s+/).filter(Boolean);
      if (!cls.includes("block")) cls.push("block");
      if (!cls.includes("h-auto")) cls.push("h-auto");
      next.className = cls.join(" ");

      // default lazy
      if (!("loading" in next)) next.loading = "lazy";

      // resolve src under public/posts/ (keep http(s) as-is)
      const src = String(next.src || "");
      if (!/^https?:\/\//i.test(src)) {
        const file = src.replace(/^(\.\/|\/)+/, "");
        next.src = `${baseUrl()}/posts/${file}`;
      }

      return { ...node, props: next };
    }

    // Recurse children
    const children = props?.children;
    if (Array.isArray(children)) {
      const normKids = children.map(normalizeImages);
      return { ...node, props: { ...props, children: normKids } };
    } else if (children) {
      return { ...node, props: { ...props, children: normalizeImages(children) } };
    }
    return node;
  }

  return node;
}

export default function Post() {
  const [match, params] = useRoute("/blog/:slug")
  if (!match) return <div>Not found</div>

  const { slug } = params
  const meta = entries.find(e => e.slug === slug);
  if (!meta) return <div>Post not found.</div>;

  const path = `../content/posts/${slug}.jsx`;
  const mod = componentsByPath[path];
  if (!mod || !mod.default) return <div>Post component missing.</div>;

  const Content = mod.default;

  // Render content, then normalize images
  const raw = <Content />;
  const normalized = normalizeImages(raw);

  const dateStr = meta.date ? meta.date : null;

  return (
    <div className="mx-auto max-w-3xl py-10">
      <div className="paper rounded-2xl ring-1 ring-fg/10 shadow-lg shadow-black/15 bg-fg/5">
        <div className="p-6 md:p-10">
          <article className="post-content max-w-none">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-accent">{meta.title}</h1>
            {dateStr && <p className="mt-2 text-sm text-fg/70">{dateStr}</p>}

            {meta.cover && (
              <img
                src={`${baseUrl()}/posts/${meta.cover}`}
                alt={meta.title}
                className="block h-auto my-6 rounded-xl border border-fg/10 shadow-sm"
                loading="lazy"
              />
            )}

            {/* Only the flowing body text gets the ruled background */}
            <div className="lined">
              <br />{normalized}<br /><br />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

