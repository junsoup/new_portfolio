import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "theme_pref"; // null => system, "light" | "dark"

export default function useTheme() {
  // null means "system"
  const [userPref, setUserPref] = useState(() => {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  });

  // system preference
  const prefersDark = useMemo(() => {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }, []);

  // effective mode = userPref ?? system
  const effectiveMode = userPref ?? (prefersDark ? "dark" : "light");

  // apply to :root
  useEffect(() => {
    const root = document.documentElement;
    if (userPref === null) {
      delete root.dataset.theme; // let CSS @media decide
    } else {
      root.dataset.theme = userPref;
    }
    localStorage.setItem(STORAGE_KEY, userPref ?? "");
  }, [userPref]);

  // keep system reactive only when using "system"
  useEffect(() => {
    if (userPref !== null || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      // re-apply "system" (no stored override), variables swap via CSS
      // nothing to set in state; the CSS media query handles it
      // but we can force a re-render if you care; not necessary here
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, [userPref]);

  // single-button toggle:
  // - if on system (userPref === null), flip to the opposite of current system
  // - else, flip stored preference
  function toggle() {
    if (userPref === null) {
      setUserPref(effectiveMode === "dark" ? "light" : "dark");
    } else {
      setUserPref(userPref === "dark" ? "light" : "dark");
    }
  }

  return { effectiveMode, userPref, toggle };
}
