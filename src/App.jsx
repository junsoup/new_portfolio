// src/App.jsx
import { Router, Route, Switch } from "wouter-preact"
import { useHashLocation } from "wouter-preact/use-hash-location"
import PageShell from "./components/PageShell"
import Home from "./pages/Home"
import BlogIndex from "./pages/BlogIndex"
import Post from "./pages/Post"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"

export default function App() {
  return (
    <Router hook={useHashLocation}>
      <PageShell>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/blog" component={BlogIndex} />
          <Route path="/blog/:slug" component={Post} />
          <Route path="/projects" component={Projects} />
          <Route path="/contact" component={Contact} />
          <Route>404 not found</Route>
        </Switch>
      </PageShell>
    </Router>
  )
}

