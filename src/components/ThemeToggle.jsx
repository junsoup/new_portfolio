import useTheme from "../hooks/useTheme.jsx";

function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      <path d="M12 4V2m0 20v-2M4 12H2m20 0h-2M5.64 5.64 4.22 4.22m15.56 15.56-1.42-1.42M18.36 5.64l1.42-1.42M4.22 19.78l1.42-1.42M12 8a4 4 0 100 8 4 4 0 000-8z"
            fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function ThemeToggle() {
  const { effectiveMode, toggle } = useTheme();

  const isDark = effectiveMode === "dark";

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label="Toggle theme"
      title="Toggle theme"
      className="inline-flex items-center justify-center rounded-full border border-fg/15 hover:border-fg/35
                 bg-transparent p-2 text-fg/80 hover:text-accent transition"
    >
      {/* Show current mode icon (optional: show target instead if you prefer) */}
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

