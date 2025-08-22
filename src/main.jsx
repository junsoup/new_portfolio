import { render } from "preact"
import { Router } from "wouter-preact"
import { useHashLocation } from "wouter-preact/use-hash-location"
import App from "./App.jsx"
import "./index.css"

render(
  <Router hook={useHashLocation}>
    <App />
  </Router>,
  document.getElementById("root")
)

