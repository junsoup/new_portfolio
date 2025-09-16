// src/main.jsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Router } from "wouter"
import { useHashLocation } from "wouter/use-hash-location"
import App from "./App.jsx"
import "./index.css"

const root = createRoot(document.getElementById("root"))

root.render(
  <StrictMode>
    <Router hook={useHashLocation}>
      <App />
    </Router>
  </StrictMode>
)

