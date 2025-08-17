// src/hooks/useTheme.js
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "theme_pref"; // null -> system, "light" | "dark"

export default function useTheme() {
  const [userPref, setUserPref] = useState(() => {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  });

  const prefersDark = useMemo(() => {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  }, []);

  const effectiveMode = userPref ?? (prefersDark ? "dark" : "light");

  useEffect(() => {
    const root = document.documentElement;

    // apply theme (system = no override)
    if (userPref === null) delete root.dataset.theme;
    else root.dataset.theme = userPref;

    localStorage.setItem(STORAGE_KEY, userPref ?? "");
  }, [userPref]);

  // helper to add/remove the animation class briefly
  function withThemeAnimation(apply) {
    const root = document.documentElement;
    root.classList.add("theme-animate");
    // ensure browser registers the class before we change vars
    requestAnimationFrame(() => {
      apply();
      setTimeout(() => root.classList.remove("theme-animate"), 240);
    });
  }

  function toggle() {
    withThemeAnimation(() => {
      if (userPref === null) {
        // first manual toggle: go to opposite of current system
        const next = effectiveMode === "dark" ? "light" : "dark";
        setUserPref(next);
      } else {
        setUserPref(userPref === "dark" ? "light" : "dark");
      }
    });
  }

  return { effectiveMode, userPref, toggle };
}

