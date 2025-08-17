// src/pages/Projects.jsx
import data from "../content/projects/projects.json"
import ProjectCard from "../components/ProjectCard"

export default function Projects() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.map((p, i) => <ProjectCard key={i} p={p} />)}
      </div>
    </section>
  )
}

