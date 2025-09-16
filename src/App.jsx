// src/App.jsx
import { Route, Switch } from "wouter"
import PageShell from "./components/PageShell"
import Home from "./pages/Home"
import BlogIndex from "./pages/BlogIndex"
import Post from "./pages/Post"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"

export default function App() {
  return (
    <PageShell>
      <Switch>
        <Route path="/">
          <Home />
        </Route>

        <Route path="/blog">
          <BlogIndex />
        </Route>

        <Route path="/blog/:slug">
          {({ slug }) => <Post slug={slug} />}
        </Route>

        <Route path="/projects">
          <Projects />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>

        {/* Fallback */}
        <Route>404 not found</Route>
      </Switch>
    </PageShell>
  )
}

