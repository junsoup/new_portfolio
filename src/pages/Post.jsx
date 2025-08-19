import { useParams } from "react-router-dom";
import entries from "../content/posts/blog_entries.json";
import { parseISO, format } from "date-fns"

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
  const { slug } = useParams();
  const meta = entries.find(e => e.slug === slug);
  if (!meta) return <div>Post not found.</div>;

  const path = `../content/posts/${slug}.jsx`;
  const mod = componentsByPath[path];
  if (!mod || !mod.default) return <div>Post component missing.</div>;

  const Content = mod.default;

  // Render content, then normalize images
  const raw = <Content />;
  const normalized = normalizeImages(raw);

  const dateStr = meta.date ? format(parseISO(meta.date), "M/d/yyyy") : null;

  return (
    <article className="post-content max-w-none">
      <h1>{meta.title}</h1>
      {dateStr && <p className="text-sm text-fg/70">{dateStr}</p>}

      {meta.cover && (
        <img
          src={`${baseUrl()}/posts/${meta.cover}`}
          alt={meta.title}
          className="block h-auto my-6 rounded-xl"
          loading="lazy"
        />
      )}

      {normalized}
    </article>
  );
}

