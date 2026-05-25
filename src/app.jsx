import React from 'react';
import { createRoot } from 'react-dom/client';
import { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakColor as _TweakColor, TweakToggle, TweakSlider, TweakButton } from './tweaks-panel.jsx';
import { Background } from './background.jsx';
import { Mascot } from './mascot.jsx';
import { MiniGames } from './minigames.jsx';
import { Hero, Connect, AboutMe, Partnerships, Featured, PortfolioGrid, Countdown, Resources, Support, Ticker } from './sections.jsx';
import './style.css';
import './cursor.js';

const ACCENTS = {
  cyan:    { color: "#5be3ff", soft: "rgba(91,227,255,0.14)", glow: "rgba(91,227,255,0.45)", border: "rgba(91,227,255,0.18)", borderS: "rgba(91,227,255,0.38)" },
  magenta: { color: "#ff5fb0", soft: "rgba(255,95,176,0.14)", glow: "rgba(255,95,176,0.45)", border: "rgba(255,95,176,0.20)", borderS: "rgba(255,95,176,0.42)" },
  amber:   { color: "#ffb84a", soft: "rgba(255,184,74,0.14)", glow: "rgba(255,184,74,0.45)", border: "rgba(255,184,74,0.20)", borderS: "rgba(255,184,74,0.42)" },
  lime:    { color: "#aef96b", soft: "rgba(174,249,107,0.14)", glow: "rgba(174,249,107,0.45)", border: "rgba(174,249,107,0.20)", borderS: "rgba(174,249,107,0.42)" },
};

const FONTS = {
  console: {
    label: "Console",
    display: '"Geist", ui-sans-serif, system-ui, sans-serif',
    body: '"Geist", ui-sans-serif, system-ui, sans-serif',
    mono: '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
  },
  editorial: {
    label: "Editorial",
    display: '"Newsreader", ui-serif, Georgia, serif',
    body: '"Newsreader", ui-serif, Georgia, serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
  },
  mono: {
    label: "Mono",
    display: '"Space Mono", ui-monospace, "SF Mono", Menlo, monospace',
    body: '"Space Mono", ui-monospace, "SF Mono", Menlo, monospace',
    mono: '"Space Mono", ui-monospace, "SF Mono", Menlo, monospace',
  },
};

const SECTION_ORDERS = {
  default:  ["hero", "connect-row", "partnerships", "featured", "portfolio", "countdown", "resources", "support"],
  work:     ["hero", "partnerships", "featured", "portfolio", "countdown", "connect-row", "resources", "support"],
  social:   ["hero", "connect-row", "partnerships", "featured", "portfolio", "support", "countdown", "resources"],
  pitch:    ["hero", "partnerships", "featured", "portfolio", "support", "resources", "countdown", "connect-row"],
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "aesthetic": "hud",
  "accent": "cyan",
  "font": "console",
  "bgMood": "stars",
  "animateBg": true,
  "density": "cozy",
  "heroVariant": "avatar",
  "sectionOrder": "default",
  "mascot": true,
  "avatarSrc": "",
  "avatarScale": 1.9,
  "avatarX": 50,
  "avatarY": 22,
  "avatarRotate": 2
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply accent to CSS vars
  React.useEffect(() => {
    const a = ACCENTS[t.accent] || ACCENTS.cyan;
    const root = document.documentElement;
    root.style.setProperty("--accent", a.color);
    root.style.setProperty("--accent-soft", a.soft);
    root.style.setProperty("--accent-glow", a.glow);
    root.style.setProperty("--border", a.border);
    root.style.setProperty("--border-strong", a.borderS);
  }, [t.accent]);

  // Apply font
  React.useEffect(() => {
    const f = FONTS[t.font] || FONTS.console;
    const root = document.documentElement;
    root.style.setProperty("--f-display", f.display);
    root.style.setProperty("--f-body", f.body);
    root.style.setProperty("--f-mono", f.mono);
  }, [t.font]);

  // Toggle root-level data attributes
  React.useEffect(() => {
    document.documentElement.setAttribute("data-aesthetic", t.aesthetic);
    document.documentElement.setAttribute("data-density", t.density);
    document.documentElement.setAttribute("data-bg", t.bgMood);
    document.documentElement.setAttribute("data-animate-bg", t.animateBg ? "true" : "false");
    document.documentElement.setAttribute("data-mascot", t.mascot ? "on" : "off");
  }, [t.aesthetic, t.density, t.bgMood, t.animateBg, t.mascot]);

  const order = SECTION_ORDERS[t.sectionOrder] || SECTION_ORDERS.default;

  const sections = {
    hero: <Hero key="hero" variant={t.heroVariant} name="Bard's Lair" tagline="ADHD Marketer | Content Creator | Film Maker | Editor" avatar={{ src: t.avatarSrc, scale: t.avatarScale, x: t.avatarX, y: t.avatarY, rotate: t.avatarRotate }} />,
    "connect-row": (
      <div key="connect-row" className="connect-games-grid">
        <div className="connect-stack">
          <Connect />
          <AboutMe />
        </div>
        <MiniGames />
      </div>
    ),
    partnerships: <Partnerships key="partnerships" />,
    featured: <Featured key="featured" count={4} />,
    portfolio: <PortfolioGrid key="portfolio" />,
    countdown: <Countdown key="countdown" />,
    resources: <Resources key="resources" />,
    support: <Support key="support" />,
  };

  const jumpLinks = [
    { id: "featured", label: "Work" },
    { id: "portfolio", label: "Archive" },
    { id: "countdown", label: "Drop" },
    { id: "support", label: "Support" },
  ];

  return (
    <>
      <Background mood={t.bgMood} animate={t.animateBg} />

      {/* Side rail — jump nav */}
      <nav className="side-rail" aria-label="Jump navigation">
        {jumpLinks.map((j) => (
          <a key={j.id} className="btn" href={`#${j.id}`}>↳ {j.label}</a>
        ))}
      </nav>

      <main className="shell">
        {order.map((id) => (
          <section key={id} id={id} style={id === "hero" ? { position: "relative" } : undefined}>
            {sections[id]}
            {id === "hero" && t.mascot && <Mascot />}
          </section>
        ))}
      </main>

      <Ticker />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Direction">
          <TweakRadio
            label="Aesthetic"
            value={t.aesthetic}
            options={[{ value: "hud", label: "HUD" }, { value: "editorial", label: "Editorial" }, { value: "brutalist", label: "Brutal" }]}
            onChange={(v) => setTweak("aesthetic", v)}
          />
          <TweakSelect
            label="Font pairing"
            value={t.font}
            options={[{ value: "console", label: "Console — Geist + Geist Mono" }, { value: "editorial", label: "Editorial — Newsreader + Plex Mono" }, { value: "mono", label: "Mono — Space Mono only" }]}
            onChange={(v) => setTweak("font", v)}
          />
          <TweakColor
            label="Accent"
            value={t.accent}
            options={["cyan", "magenta", "amber", "lime"]}
            onChange={(v) => setTweak("accent", v)}
          />
        </TweakSection>

        <TweakSection label="Layout">
          <TweakRadio
            label="Density"
            value={t.density}
            options={["compact", "cozy", "roomy"]}
            onChange={(v) => setTweak("density", v)}
          />
          <TweakSelect
            label="Hero variant"
            value={t.heroVariant}
            options={[{ value: "avatar", label: "Avatar + manifesto" }, { value: "type", label: "Big typographic name" }, { value: "terminal", label: "Animated terminal" }]}
            onChange={(v) => setTweak("heroVariant", v)}
          />
          <TweakSelect
            label="Section order"
            value={t.sectionOrder}
            options={[{ value: "default", label: "Default — story first" }, { value: "work", label: "Work-forward — portfolio first" }, { value: "social", label: "Social — channels & latest first" }, { value: "pitch", label: "Pitch — stats forward" }]}
            onChange={(v) => setTweak("sectionOrder", v)}
          />
        </TweakSection>

        <TweakSection label="Background">
          <TweakRadio
            label="Mood"
            value={t.bgMood}
            options={["stars", "grid", "fog", "none"]}
            onChange={(v) => setTweak("bgMood", v)}
          />
          <TweakToggle
            label="Animate"
            value={t.animateBg}
            onChange={(v) => setTweak("animateBg", v)}
          />
          <TweakToggle
            label="Wrecking-ball mascot"
            value={t.mascot}
            onChange={(v) => setTweak("mascot", v)}
          />
        </TweakSection>

        <TweakSection label="Profile picture">
          <AvatarUpload
            value={t.avatarSrc}
            onChange={(src) => setTweak("avatarSrc", src)}
          />
          <TweakSlider
            label="Scale"
            value={t.avatarScale}
            min={0.5} max={3} step={0.05}
            unit="×"
            onChange={(v) => setTweak("avatarScale", v)}
          />
          <TweakSlider
            label="Horizontal"
            value={t.avatarX}
            min={0} max={100} step={1}
            unit="%"
            onChange={(v) => setTweak("avatarX", v)}
          />
          <TweakSlider
            label="Vertical"
            value={t.avatarY}
            min={0} max={100} step={1}
            unit="%"
            onChange={(v) => setTweak("avatarY", v)}
          />
          <TweakSlider
            label="Rotation"
            value={t.avatarRotate}
            min={-180} max={180} step={1}
            unit="°"
            onChange={(v) => setTweak("avatarRotate", v)}
          />
          <TweakButton
            label="Reset frame"
            secondary
            onClick={() => {
              setTweak({ avatarScale: 1, avatarX: 50, avatarY: 22, avatarRotate: 0 });
            }}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

// Maps accent name keys → hex swatches so TweakColor renders colored chips instead of name strings
function TweakColor(props) {
  if (Array.isArray(props.options) && props.options.every(o => typeof o === "string" && ACCENTS[o])) {
    const colorOpts = props.options.map((k) => ACCENTS[k].color);
    const valueColor = ACCENTS[props.value] ? ACCENTS[props.value].color : props.value;
    return _TweakColor({
      ...props,
      options: colorOpts,
      value: valueColor,
      onChange: (hex) => {
        const key = Object.keys(ACCENTS).find(k => ACCENTS[k].color.toLowerCase() === String(hex).toLowerCase()) || props.value;
        props.onChange(key);
      },
    });
  }
  return _TweakColor(props);
}

// ── AvatarUpload — custom Tweaks control for replacing the hero image.
// Reads a chosen file, downscales it via canvas to keep persisted state
// small (max 600px on the long edge), then hands a data-URL up to the
// parent (which calls setTweak so it persists in the source file).
function AvatarUpload({ value, onChange }) {
  const inputRef = React.useRef(null);
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");

  function pick() { inputRef.current && inputRef.current.click(); }
  function clear() { onChange(""); setErr(""); }

  function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file) return;
    setErr("");
    setBusy(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        try {
          const MAX = 600;
          const ratio = Math.min(1, MAX / Math.max(img.width, img.height));
          const w = Math.round(img.width * ratio);
          const h = Math.round(img.height * ratio);
          const cvs = document.createElement("canvas");
          cvs.width = w; cvs.height = h;
          const ctx = cvs.getContext("2d");
          ctx.drawImage(img, 0, 0, w, h);
          const out = cvs.toDataURL("image/jpeg", 0.85);
          onChange(out);
          setBusy(false);
        } catch (er) {
          setErr("Couldn't process image");
          setBusy(false);
        }
      };
      img.onerror = () => { setErr("Invalid image"); setBusy(false); };
      img.src = ev.target.result;
    };
    reader.onerror = () => { setErr("Couldn't read file"); setBusy(false); };
    reader.readAsDataURL(file);
  }

  const preview = value || "assets/bard-avatar.jpg";
  const isCustom = !!value;

  return (
    <div className="twk-row" style={{ flexDirection: "column", alignItems: "stretch", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          aria-hidden="true"
          style={{
            width: 54, height: 54, borderRadius: "50%",
            background: `url(${preview}) center/cover no-repeat, #0a0f1c`,
            border: "1.5px solid var(--accent, #5be3ff)",
            flexShrink: 0,
            boxShadow: "0 0 14px var(--accent-glow, rgba(91,227,255,0.35))",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 0 }}>
          <span className="twk-label" style={{ fontSize: 11, opacity: 0.8 }}>
            {isCustom ? "Custom image" : "Default image"}
            {busy ? " · processing…" : ""}
          </span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button type="button" className="twk-btn" onClick={pick} disabled={busy}>
              {isCustom ? "Replace" : "Upload"}
            </button>
            {isCustom && (
              <button type="button" className="twk-btn secondary" onClick={clear}>
                Use default
              </button>
            )}
          </div>
          {err && <span style={{ color: "#ff9c9c", fontSize: 11 }}>{err}</span>}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFile}
      />
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
