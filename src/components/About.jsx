// src/pages/About.jsx
import { Link } from "react-router-dom"
export default function About({ id }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-4 py-4 min-h-[100vh]">
      <div className="flex flex-col md:flex-row md:items-start md:gap-8">
        <img
          src={`junsu.jpg`}
          alt="Photo of Junsu Lee at Oregon State University."
          className="w-[250px] md:w-[260px] aspect-[1/1] object-cover rounded-full border border-fg/10 shadow-sm mx-auto md:mx-0"
          loading="lazy"
        />
        <div className="mt-6 md:mt-0 flex-1">
          <h2 className="text-3xl font-bold">Hello!</h2>
          <p className="mt-4 text-fg/80 leading-relaxed">
            I am a software engineer, hobby enthusiast, and bachelor's graduate from
            Oregon State University in CS, with a focus in artificial intelligence.
            I love creating innovative systems and developing algorithms—areas where
            I excel most. I’m enthusiastic about applying my skills to solve real-world
            problems. Whether it’s building robust software or optimizing processes,
            I’m eager to take on new challenges and push technology forward.
          </p>
        </div>
      </div>

      {/* What I do */}
      <div className="mt-14">
        <h3 className="text-2xl font-semibold">What I do</h3>
        <div className="mt-2 h-px bg-fg/10" />
        <p className="mt-4 text-fg/80 leading-relaxed">
          I have passion for all things computer science and I make hobby projects every once in a
          while. More on this in my{" "}
          <Link to="/blog" className="font-bold hover:text-accent">
            blog
          </Link>
          ! I’m strongest with Python workflows and data processing, and I’m specifically interested
          in algorithms and neural networks. The bullets below are brief summaries of my experience.
        </p>
      </div>

      {/* Skills */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold">Skills</h3>
        <div className="mt-2 h-px bg-fg/10" />
        <p className="mt-4 text-fg/80">
          My work spans a number of languages and technologies (all backed by real-world experience).
        </p>

        {/* Core skills */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-fg/10 p-5">
            <h4 className="text-sm font-semibold tracking-wide uppercase text-fg/70">Languages</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {["Python", "JavaScript", "HTML / CSS"].map((t) => (
                <li key={t} className="px-2.5 py-1 rounded-full bg-fg/5 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-fg/10 p-5">
            <h4 className="text-sm font-semibold tracking-wide uppercase text-fg/70">Technologies</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {["Git / GitHub", "MySQL / SQLite", "Windows", "Linux / Ubuntu", "Docker", "LaTeX / KaTeX"].map((t) => (
                <li key={t} className="px-2.5 py-1 rounded-full bg-fg/5 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Additional skills */}
        <div className="mt-8">
          <p className="text-fg/80">
            I’ve also picked up the following through personal projects and university:
          </p>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-fg/10 p-5">
              <ul className="flex flex-wrap gap-2">
                {["C", "Java", "Rust"].map((t) => (
                  <li key={t} className="px-2.5 py-1 rounded-full bg-fg/5 text-sm">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-fg/10 p-5">
              <ul className="flex flex-wrap gap-2">
                {["THREE.js", "PyTorch / TensorFlow", "Arduino"].map((t) => (
                  <li key={t} className="px-2.5 py-1 rounded-full bg-fg/5 text-sm">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Closing */}
      <div className="mt-12">
        <p className="text-fg/80">
          Thanks for stopping by! If you have any questions, feel free to reach out on the{" "}
          <Link to="/contact" className="font-bold hover:text-accent">
            contacts
          </Link>
          {" "}page.
        </p>
      </div>
    </section>
  )
}

