// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import PageShell from "./components/PageShell"
import Home from "./pages/Home"
import BlogIndex from "./pages/BlogIndex"
import Post from "./pages/Post"
import Projects from "./pages/Projects"

export default function App() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<PageShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/projects" element={<Projects />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

