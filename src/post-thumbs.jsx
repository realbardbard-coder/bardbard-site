// post-thumbs.jsx — themed SVG illustrations for the Notable X Posts grid.
// Each thumb is 320×180 (16:9), composed from geometric primitives + small
// iconographic motifs that hint at the post's subject. Kept stylized rather
// than literal so they read as a cohesive set across the grid.

function PostThumb({ theme }) {
  const themes = {
    "sui-miami":   <SuiMiami />,
    "ledger-love": <LedgerLove />,
    "sui-fate":    <SuiFate />,
    "walrus-w":    <WalrusW />,
    "ledger-dnd":  <LedgerDnd />,
    "sui-vaults":  <SuiVaults />,
  };
  return (
    <svg className="post-thumb-svg" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      {themes[theme] || <Fallback />}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────────────────
function GridBackdrop({ tint = "#5be3ff", opacity = 0.06 }) {
  return (
    <>
      <defs>
        <pattern id="ptgrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={tint} strokeWidth="0.5" opacity={opacity} />
        </pattern>
        <radialGradient id="ptvignette" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(2,6,16,0.85)" />
        </radialGradient>
      </defs>
      <rect width="320" height="180" fill="#06101c" />
      <rect width="320" height="180" fill="url(#ptgrid)" />
      <rect width="320" height="180" fill="url(#ptvignette)" />
    </>
  );
}

function CornerTicks({ color = "#5be3ff", op = 0.55 }) {
  // HUD-style L-shaped tick marks in each corner
  const t = 10, m = 8;
  return (
    <g stroke={color} strokeWidth="1.4" fill="none" opacity={op}>
      {/* TL */}
      <path d={`M ${m} ${m+t} L ${m} ${m} L ${m+t} ${m}`} />
      {/* TR */}
      <path d={`M ${320-m-t} ${m} L ${320-m} ${m} L ${320-m} ${m+t}`} />
      {/* BL */}
      <path d={`M ${m} ${180-m-t} L ${m} ${180-m} L ${m+t} ${180-m}`} />
      {/* BR */}
      <path d={`M ${320-m-t} ${180-m} L ${320-m} ${180-m} L ${320-m} ${180-m-t}`} />
    </g>
  );
}

function ScanLines() {
  return (
    <g opacity="0.06" stroke="#ffffff" strokeWidth="0.4">
      {Array.from({ length: 60 }).map((_, i) =>
        <line key={i} x1="0" y1={3 * i} x2="320" y2={3 * i} />
      )}
    </g>
  );
}

function Caption({ text, color = "#5be3ff" }) {
  return (
    <text
      x="20" y="162"
      fill={color}
      fontFamily='"Geist Mono", ui-monospace, monospace'
      fontSize="9"
      letterSpacing="2.4"
      fontWeight="700"
    >
      {text}
    </text>
  );
}

// ─────────────────────────────────────────────────────────────
// 1. Sui Miami Event — sunset, palm silhouettes, ocean horizon
// ─────────────────────────────────────────────────────────────
function SuiMiami() {
  return (
    <>
      <defs>
        <linearGradient id="miamisky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d2444" />
          <stop offset="55%" stopColor="#3a2356" />
          <stop offset="100%" stopColor="#ff6a8b" />
        </linearGradient>
        <linearGradient id="miamisea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5be3ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#04070d" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#miamisky)" />
      {/* Sun */}
      <circle cx="160" cy="106" r="34" fill="#ffd5a0" opacity="0.95" />
      <circle cx="160" cy="106" r="46" fill="#ffd5a0" opacity="0.15" />
      {/* Sun stripes */}
      <g stroke="#1d2444" strokeWidth="2">
        <line x1="120" y1="100" x2="200" y2="100" />
        <line x1="124" y1="108" x2="196" y2="108" />
        <line x1="130" y1="116" x2="190" y2="116" />
      </g>
      {/* Ocean */}
      <rect x="0" y="120" width="320" height="60" fill="url(#miamisea)" />
      {/* Reflection lines */}
      <g stroke="#ffd5a0" strokeWidth="1" opacity="0.4">
        <line x1="140" y1="130" x2="180" y2="130" />
        <line x1="130" y1="140" x2="190" y2="140" />
        <line x1="120" y1="152" x2="200" y2="152" />
      </g>
      {/* Palm trees */}
      <PalmTree x={42} y={140} flip={false} />
      <PalmTree x={278} y={140} flip={true} />
      <CornerTicks color="#ffd5a0" op="0.5" />
      <Caption text="MIAMI · SUI BASECAMP" color="#ffd5a0" />
    </>
  );
}
function PalmTree({ x, y, flip }) {
  const s = flip ? -1 : 1;
  return (
    <g transform={`translate(${x},${y})`}>
      {/* Trunk */}
      <path d={`M 0 0 Q ${-2*s} -30 ${-6*s} -55`} stroke="#0a0f1c" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Fronds */}
      <g fill="#0a0f1c" transform={`translate(${-6*s},-55) scale(${s},1)`}>
        <path d="M 0 0 Q -22 -10 -36 4 Q -20 -2 0 2 Z" />
        <path d="M 0 0 Q -10 -22 6 -32 Q 0 -16 4 0 Z" />
        <path d="M 0 0 Q 18 -16 30 -2 Q 14 -4 0 2 Z" />
        <path d="M 0 0 Q 10 -24 -2 -34 Q 4 -18 -4 -2 Z" />
      </g>
    </g>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. Ledger — True Love Story
// ─────────────────────────────────────────────────────────────
function LedgerLove() {
  return (
    <>
      <GridBackdrop tint="#ff5fb0" opacity="0.07" />
      {/* Heart */}
      <g transform="translate(160,82)">
        <path
          d="M 0 28 C -42 -2 -48 -38 -22 -48 C -8 -52 -2 -42 0 -34 C 2 -42 8 -52 22 -48 C 48 -38 42 -2 0 28 Z"
          fill="#ff5fb0"
          opacity="0.92"
        />
        {/* Inner gleam */}
        <path
          d="M 0 28 C -42 -2 -48 -38 -22 -48 C -8 -52 -2 -42 0 -34 C 2 -42 8 -52 22 -48 C 48 -38 42 -2 0 28 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1"
          opacity="0.35"
        />
        {/* Lock body inside */}
        <rect x="-13" y="-12" width="26" height="22" rx="3" fill="#0a0f1c" />
        {/* Lock shackle */}
        <path d="M -8 -12 L -8 -22 Q -8 -28 0 -28 Q 8 -28 8 -22 L 8 -12" fill="none" stroke="#0a0f1c" strokeWidth="3" strokeLinecap="round" />
        {/* Keyhole */}
        <circle cx="0" cy="-3" r="2.5" fill="#ff5fb0" />
        <rect x="-1" y="-3" width="2" height="6" fill="#ff5fb0" />
      </g>
      {/* Tick marks */}
      <CornerTicks color="#ff5fb0" />
      {/* Connector lines around heart */}
      <g stroke="#ff5fb0" strokeWidth="0.8" opacity="0.35" strokeDasharray="2 3">
        <circle cx="160" cy="82" r="62" fill="none" />
      </g>
      <ScanLines />
      <Caption text="LEDGER · A LOVE STORY" color="#ff5fb0" />
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. Fate of SUI — constellation, mystical
// ─────────────────────────────────────────────────────────────
function SuiFate() {
  const stars = [
    [60, 40], [90, 70], [40, 95], [70, 120],
    [240, 50], [270, 90], [220, 115], [260, 140],
    [160, 30], [180, 60], [140, 110], [160, 140]
  ];
  return (
    <>
      <defs>
        <radialGradient id="fateglow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="rgba(124,58,237,0.4)" />
          <stop offset="100%" stopColor="rgba(4,7,13,0)" />
        </radialGradient>
      </defs>
      <rect width="320" height="180" fill="#0a0816" />
      <rect width="320" height="180" fill="url(#fateglow)" />
      {/* Tiny background stars */}
      <g fill="#ffffff" opacity="0.35">
        {Array.from({ length: 50 }).map((_, i) =>
          <circle key={i} cx={Math.random() * 320} cy={Math.random() * 180} r={Math.random() * 1.2 + 0.3} />
        )}
      </g>
      {/* Constellation lines */}
      <g stroke="#a78bfa" strokeWidth="0.7" opacity="0.55">
        <line x1="60" y1="40" x2="90" y2="70" />
        <line x1="90" y1="70" x2="40" y2="95" />
        <line x1="40" y1="95" x2="70" y2="120" />
        <line x1="90" y1="70" x2="160" y2="60" />
        <line x1="160" y1="60" x2="240" y2="50" />
        <line x1="240" y1="50" x2="270" y2="90" />
        <line x1="270" y1="90" x2="220" y2="115" />
        <line x1="220" y1="115" x2="260" y2="140" />
        <line x1="160" y1="60" x2="140" y2="110" />
        <line x1="140" y1="110" x2="160" y2="140" />
        <line x1="160" y1="140" x2="220" y2="115" />
      </g>
      {/* Big stars */}
      {stars.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="2.8" fill="#fff" />
          <circle cx={x} cy={y} r="6" fill="#a78bfa" opacity="0.3" />
        </g>
      ))}
      {/* SUI orb at center */}
      <g transform="translate(160,90)">
        <circle r="20" fill="#5be3ff" opacity="0.18" />
        <circle r="12" fill="#5be3ff" opacity="0.32" />
        <circle r="6" fill="#fff" />
      </g>
      <CornerTicks color="#a78bfa" />
      <Caption text="THE FATE OF SUI" color="#a78bfa" />
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. Walrus — basketball + data motif (court W)
// ─────────────────────────────────────────────────────────────
function WalrusW() {
  return (
    <>
      <GridBackdrop tint="#5be3ff" opacity="0.07" />
      {/* Basketball court outline */}
      <g stroke="#5be3ff" strokeWidth="1.4" fill="none" opacity="0.55">
        <rect x="40" y="36" width="240" height="108" rx="2" />
        <line x1="160" y1="36" x2="160" y2="144" />
        <circle cx="160" cy="90" r="22" />
        <circle cx="160" cy="90" r="4" fill="#5be3ff" opacity="0.9" />
        {/* Key boxes */}
        <rect x="40" y="62" width="46" height="56" />
        <rect x="234" y="62" width="46" height="56" />
      </g>
      {/* Big W made of data nodes */}
      <g transform="translate(160,86)">
        <g stroke="#5be3ff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -38 -22 L -22 22 L 0 -4 L 22 22 L 38 -22" />
        </g>
        {/* Nodes at vertices */}
        {[[-38,-22],[-22,22],[0,-4],[22,22],[38,-22]].map(([x,y], i) =>
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="#04070d" stroke="#5be3ff" strokeWidth="1.8" />
          </g>
        )}
      </g>
      {/* Basketball icon */}
      <g transform="translate(264,40)">
        <circle r="11" fill="#ff8a3a" />
        <path d="M -11 0 A 11 11 0 0 1 11 0" fill="none" stroke="#0a0f1c" strokeWidth="1.2" />
        <path d="M -11 0 A 11 11 0 0 0 11 0" fill="none" stroke="#0a0f1c" strokeWidth="1.2" />
        <line x1="0" y1="-11" x2="0" y2="11" stroke="#0a0f1c" strokeWidth="1.2" />
      </g>
      <CornerTicks color="#5be3ff" />
      <Caption text="WALRUS · ON-CHAIN W" color="#5be3ff" />
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. Ledger — Dungeons & DeFi (d20 + shield)
// ─────────────────────────────────────────────────────────────
function LedgerDnd() {
  return (
    <>
      <defs>
        <linearGradient id="dndbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a0f1a" />
          <stop offset="100%" stopColor="#06101c" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#dndbg)" />
      <GridBackdrop tint="#ffb84a" opacity="0.05" />
      {/* D20 die — hexagonal silhouette with internal triangulation */}
      <g transform="translate(118,90)">
        <polygon
          points="0,-44 38,-22 38,22 0,44 -38,22 -38,-22"
          fill="#1d1428"
          stroke="#ffb84a"
          strokeWidth="2"
        />
        {/* Internal triangle facets */}
        <g stroke="#ffb84a" strokeWidth="1" opacity="0.55" fill="none">
          <line x1="0" y1="-44" x2="0" y2="44" />
          <line x1="-38" y1="-22" x2="38" y2="22" />
          <line x1="38" y1="-22" x2="-38" y2="22" />
          <polygon points="-18,-6 18,-6 0,18" fill="rgba(255,184,74,0.12)" />
        </g>
        {/* Number "20" */}
        <text
          x="0" y="6"
          textAnchor="middle"
          fill="#ffb84a"
          fontFamily='"Orbitron", monospace'
          fontSize="20"
          fontWeight="900"
          letterSpacing="1"
        >
          20
        </text>
      </g>
      {/* Shield with lock */}
      <g transform="translate(228,90)">
        <path
          d="M 0 -40 L 32 -28 L 32 8 Q 32 30 0 42 Q -32 30 -32 8 L -32 -28 Z"
          fill="#1d1428"
          stroke="#5be3ff"
          strokeWidth="2"
        />
        {/* Lock body */}
        <rect x="-12" y="-6" width="24" height="22" rx="2" fill="#5be3ff" opacity="0.15" stroke="#5be3ff" strokeWidth="1.4" />
        {/* Shackle */}
        <path d="M -7 -6 L -7 -16 Q -7 -22 0 -22 Q 7 -22 7 -16 L 7 -6" fill="none" stroke="#5be3ff" strokeWidth="2" />
        {/* Keyhole */}
        <circle cx="0" cy="3" r="2" fill="#5be3ff" />
      </g>
      <CornerTicks color="#ffb84a" />
      <Caption text="DUNGEONS & DEFI" color="#ffb84a" />
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// 6. Sui Vaults — vault door / dial wheel
// ─────────────────────────────────────────────────────────────
function SuiVaults() {
  return (
    <>
      <GridBackdrop tint="#5be3ff" opacity="0.07" />
      {/* Vault door */}
      <g transform="translate(160,90)">
        <circle r="60" fill="#0a141e" stroke="#5be3ff" strokeWidth="2" opacity="0.95" />
        <circle r="48" fill="none" stroke="#5be3ff" strokeWidth="1" opacity="0.55" />
        <circle r="36" fill="#06101c" stroke="#5be3ff" strokeWidth="1.5" opacity="0.85" />
        {/* Dial spokes */}
        <g stroke="#5be3ff" strokeWidth="3" strokeLinecap="round" opacity="0.95">
          <line x1="0" y1="-26" x2="0" y2="-12" />
          <line x1="0" y1="26" x2="0" y2="12" />
          <line x1="-26" y1="0" x2="-12" y2="0" />
          <line x1="26" y1="0" x2="12" y2="0" />
        </g>
        <circle r="6" fill="#5be3ff" />
        {/* Tick marks on outer ring */}
        <g stroke="#5be3ff" strokeWidth="1.4">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x1 = Math.cos(a) * 54, y1 = Math.sin(a) * 54;
            const x2 = Math.cos(a) * 60, y2 = Math.sin(a) * 60;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} opacity={i % 3 === 0 ? "1" : "0.5"} />;
          })}
        </g>
      </g>
      {/* Side bolts */}
      <g fill="#5be3ff" opacity="0.8">
        <circle cx="76" cy="90" r="3" />
        <circle cx="244" cy="90" r="3" />
        <circle cx="160" cy="22" r="3" />
        <circle cx="160" cy="158" r="3" />
      </g>
      {/* Connecting lines */}
      <g stroke="#5be3ff" strokeWidth="0.6" opacity="0.35">
        <line x1="76" y1="90" x2="96" y2="90" />
        <line x1="244" y1="90" x2="224" y2="90" />
        <line x1="160" y1="22" x2="160" y2="32" />
        <line x1="160" y1="158" x2="160" y2="148" />
      </g>
      <CornerTicks color="#5be3ff" />
      <Caption text="VAULTS · FULL SAIL" color="#5be3ff" />
    </>
  );
}

function Fallback() {
  return (
    <>
      <GridBackdrop />
      <CornerTicks />
      <Caption text="POST" />
    </>
  );
}

Object.assign(window, { PostThumb });
