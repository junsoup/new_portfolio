// src/utils/frontmatter.js
export function parseFrontMatter(raw) {
  const match = /^---\n([\s\S]*?)\n---/.exec(raw);
  if (!match) return { data: {}, content: raw };

  const yaml = match[1];
  const content = raw.slice(match[0].length).trim();

  const data = {};
  yaml.split("\n").forEach(line => {
    const [key, ...rest] = line.split(":");
    data[key.trim()] = rest.join(":").trim();
  });

  return { data, content };
}

