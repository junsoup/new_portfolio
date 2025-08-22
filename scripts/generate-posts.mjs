// scripts/generate-posts.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIG — adjust if your paths differ
const POSTS_JSON = path.resolve(__dirname, "../src/content/posts/blog_entries.json");
const POSTS_DIR = path.resolve(__dirname, "../src/content/posts");

// pass optional slug: `npm run gen:posts hello-world`
const onlySlug = process.argv[2] || null;

// helpers
function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function fileExists(p) {
  try { fs.accessSync(p, fs.constants.F_OK); return true; } catch { return false; }
}

// starter JSX template
function postTemplate({ slug }) {

  return `// src/content/posts/${slug}.jsx
// Auto-generated scaffold.
export default function _() {
  return (
    <>
      { /* <img src="/posts/megu_cropped.jpg" alt="megumin" className="rounded-full my-4 w-64" /> */}

    </>
  );
}
`;
}


function main() {
  ensureDir(POSTS_DIR);

  if (!fileExists(POSTS_JSON)) {
    console.error(`Missing ${POSTS_JSON}. Create it with an array of entries like:
[
  {"slug": "hello-world", "title": "Hello World", "date": "2025-08-01", "description": "First post"}
]`);
    process.exit(1);
  }

  const raw = fs.readFileSync(POSTS_JSON, "utf8");
  let entries = [];
  try {
    entries = JSON.parse(raw);
    if (!Array.isArray(entries)) throw new Error("JSON must be an array");
  } catch (e) {
    console.error("Failed to parse blog_entries.json:", e.message);
    process.exit(1);
  }

  if (onlySlug) {
    entries = entries.filter(e => e.slug === onlySlug);
    if (entries.length === 0) {
      console.error(`No entry with slug "${onlySlug}" found in blog_entries.json.`);
      process.exit(1);
    }
  }

  let created = 0;
  for (const entry of entries) {
    const { slug } = entry;
    if (!slug || typeof slug !== "string") {
      console.warn("Skipping entry without a valid slug:", entry);
      continue;
    }
    const filePath = path.join(POSTS_DIR, `${slug}.jsx`);
    if (fileExists(filePath)) {
      console.log(`✓ ${slug}.jsx already exists`);
      continue;
    }
    fs.writeFileSync(filePath, postTemplate(entry), "utf8");
    console.log(`+ Created ${path.relative(process.cwd(), filePath)}`);
    created++;
  }

  if (!created) {
    console.log("No new files created. All post components exist.");
  } else {
    console.log(`Done. Created ${created} file(s).`);
  }
}

main();

