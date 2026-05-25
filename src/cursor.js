// cursor.js — custom clapper-board cursor + sparkle trail
// Pastel palette pulled from the avatar background (pink/mint/lavender/peach/yellow).
(function () {
  "use strict";

  // Two cursor SVGs: open (default) and clapped (mousedown).
  // 32×32, dark body with a hot-pink/peach top stripe and angled white slats.
  // Hotspot stays at (2, 6) — the tip of the upper-left corner — so the actual
  // click point doesn't move when the clapper closes.
  function svgURI(svg) {
    return 'url("data:image/svg+xml;utf8,' +
      encodeURIComponent(svg).replace(/'/g, "%27").replace(/"/g, "%22") +
      '") 2 6, auto';
  }

  // Palette: white main board, rainbow top with yellow/green/blue/pink/purple
  const TOP_COLORS = ["#ffe066", "#7ed957", "#5bc0ff", "#ff8fb8", "#c084fc"]; // yellow, green, blue, pink, purple
  const BOARD = "#ffffff";
  const SLAT = "#0a0f1a";   // dark slats on the white board so they stay readable
  const OUTLINE = "#000";

  // Build the colored top bar as 5 vertical stripes (~5.6px each across 28px)
  function topStripes(width, height) {
    const w = width / TOP_COLORS.length;
    let out = "";
    for (let i = 0; i < TOP_COLORS.length; i++) {
      out += '<rect x="' + (i * w) + '" y="0" width="' + w + '" height="' + height + '" fill="' + TOP_COLORS[i] + '"/>';
    }
    return out;
  }

  const openSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">' +
      // bottom board — white
      '<rect x="2" y="15" width="28" height="14" rx="1.5" fill="' + BOARD + '" stroke="' + OUTLINE + '" stroke-width="1"/>' +
      // "BARD" text on the board
      '<text x="16" y="25" text-anchor="middle" font-family="Geist, system-ui, sans-serif" font-size="8" font-weight="800" letter-spacing="0.5" fill="' + SLAT + '">BARD</text>' +
      // top clapper, tilted UP (open). Body is the rainbow strip; dark slats on top
      '<g transform="translate(3 13) rotate(-22)">' +
        '<g>' + topStripes(28, 7) + '</g>' +
        '<rect x="0" y="0" width="28" height="7" rx="1" fill="none" stroke="' + OUTLINE + '" stroke-width="1"/>' +
        // angled DARK slats (the diagonal teeth pattern)
        '<polygon points="1,1 5,6 9,6 5,1" fill="' + SLAT + '"/>' +
        '<polygon points="9,1 13,6 17,6 13,1" fill="' + SLAT + '"/>' +
        '<polygon points="17,1 21,6 25,6 21,1" fill="' + SLAT + '"/>' +
        '<polygon points="25,1 28,4.5 28,6 25,6" fill="' + SLAT + '"/>' +
      '</g>' +
    '</svg>';

  const clappedSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">' +
      '<rect x="2" y="15" width="28" height="14" rx="1.5" fill="' + BOARD + '" stroke="' + OUTLINE + '" stroke-width="1"/>' +
      // "BARD" text on the board
      '<text x="16" y="25" text-anchor="middle" font-family="Geist, system-ui, sans-serif" font-size="8" font-weight="800" letter-spacing="0.5" fill="' + SLAT + '">BARD</text>' +
      // top clapper, FLAT (closed) — sitting on top of the board
      '<g transform="translate(2 7)">' +
        '<g>' + topStripes(28, 7) + '</g>' +
        '<rect x="0" y="0" width="28" height="7" rx="1" fill="none" stroke="' + OUTLINE + '" stroke-width="1"/>' +
        '<polygon points="1,1 5,6 9,6 5,1" fill="' + SLAT + '"/>' +
        '<polygon points="9,1 13,6 17,6 13,1" fill="' + SLAT + '"/>' +
        '<polygon points="17,1 21,6 25,6 21,1" fill="' + SLAT + '"/>' +
      '</g>' +
      // CLAP burst marks at the seam
      '<g stroke="#ff8fb8" stroke-width="1.4" stroke-linecap="round" opacity="0.95">' +
        '<line x1="1" y1="13" x2="-2" y2="11"/>' +
        '<line x1="31" y1="13" x2="34" y2="11"/>' +
        '<line x1="16" y1="13" x2="16" y2="9.5"/>' +
      '</g>' +
    '</svg>';

  // Inject cursor style. Crosshair fallback if SVG cursor is rejected by the OS.
  const style = document.createElement("style");
  style.id = "__clapper-cursor";
  style.textContent =
    "html, body, * { cursor: " + svgURI(openSVG) + "; }" +
    "a, button, .icon-btn, .btn, .post-card, .feature-card, .game-tile, [role='button'], [onclick] { cursor: " + svgURI(openSVG) + "; }" +
    "body.clapper-clap, body.clapper-clap * { cursor: " + svgURI(clappedSVG) + "; }" +
    // Sparkle container
    ".sparkle-layer { position: fixed; inset: 0; pointer-events: none; z-index: 9998; overflow: hidden; }" +
    ".sparkle { position: absolute; width: 10px; height: 10px; pointer-events: none; will-change: transform, opacity; animation: sparkle-pop 0.9s cubic-bezier(0.2, 0.7, 0.3, 1) forwards; }" +
    ".sparkle svg { width: 100%; height: 100%; display: block; filter: drop-shadow(0 0 4px currentColor); }" +
    "@keyframes sparkle-pop {" +
      "0% { transform: translate(-50%, -50%) scale(0.2) rotate(0deg); opacity: 0; }" +
      "20% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(40deg); }" +
      "100% { opacity: 0; transform: translate(-50%, -120%) scale(0.65) rotate(180deg); }" +
    "}";
  document.head.appendChild(style);

  // Sparkle layer
  const layer = document.createElement("div");
  layer.className = "sparkle-layer";
  document.body.appendChild(layer);

  // Pastel sparkle colors matching the avatar background grid
  const SPARK_COLORS = [
    "#ffb3d1",  // pink
    "#ffd1a8",  // peach
    "#fff3a8",  // yellow
    "#c5f3b3",  // mint
    "#d1b3ff",  // lavender
    "#a8e6ff",  // sky
  ];

  const STAR_PATH =
    "M10 1 L11.6 8.4 L19 10 L11.6 11.6 L10 19 L8.4 11.6 L1 10 L8.4 8.4 Z";

  function makeSparkle(x, y) {
    const el = document.createElement("span");
    el.className = "sparkle";
    const color = SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0];
    const size = 7 + Math.random() * 7;
    // Random horizontal nudge so sparkles don't track the cursor in a perfect line
    const dx = (Math.random() - 0.5) * 22;
    const dy = (Math.random() - 0.5) * 8;
    el.style.left = (x + dx) + "px";
    el.style.top = (y + dy) + "px";
    el.style.width = size + "px";
    el.style.height = size + "px";
    el.style.color = color;
    el.innerHTML =
      '<svg viewBox="0 0 20 20"><path d="' + STAR_PATH + '" fill="' + color + '"/></svg>';
    layer.appendChild(el);
    // Cleanup after animation completes
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 950);
  }

  // Throttle sparkles to ~one every 55ms while moving — feels lively but not noisy
  let lastSpark = 0;
  let lastX = 0, lastY = 0;
  document.addEventListener("mousemove", function (e) {
    lastX = e.clientX; lastY = e.clientY;
    const now = performance.now();
    if (now - lastSpark < 55) return;
    lastSpark = now;
    // Skip if user hasn't actually moved enough — avoids dribbling on hover
    makeSparkle(e.clientX, e.clientY);
  }, { passive: true });

  // Click → "clap" the cursor. Add 4 extra sparkles in a burst around the cursor.
  document.addEventListener("mousedown", function (e) {
    document.body.classList.add("clapper-clap");
    for (let i = 0; i < 5; i++) {
      makeSparkle(e.clientX, e.clientY);
    }
  });
  document.addEventListener("mouseup", function () {
    // Hold the "clapped" state briefly so the snap is visible even on fast clicks
    setTimeout(function () {
      document.body.classList.remove("clapper-clap");
    }, 140);
  });
})();
