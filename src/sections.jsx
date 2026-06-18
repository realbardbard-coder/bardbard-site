import React from 'react';

// sections.jsx — portfolio section components

const Icon = {
  X: () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>,

  YouTube: () =>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>,

  TikTok: () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.81a8.16 8.16 0 0 0 4.77 1.52V6.88a4.85 4.85 0 0 1-1.84-.19Z" />
    </svg>,

  Instagram: () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>,

  Twitch: () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.265 0 1.06 3.205v17.59h6.795V24l3.21-3.205h2.55l5.74-5.74V0H4.265zm14.49 14.49-3.205 3.205h-3.205l-2.79 2.79v-2.79H6.74V2.045h12.015V14.49zm-3.205-7.495v5.74h-1.755v-5.74h1.755zm-4.275 0v5.74H9.52v-5.74h1.755z" />
    </svg>,

  Arrow: () =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>,

  Play: () =>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>

};

// ── Hero ─────────────────────────────────────────────────────
function HeroAvatar({ name, tagline, avatar }) {
  const a = avatar || {};
  const src    = a.src || "assets/bard-avatar.jpg";
  const scale  = typeof a.scale  === "number" ? a.scale  : 1;
  const x      = typeof a.x      === "number" ? a.x      : 50;
  const y      = typeof a.y      === "number" ? a.y      : 22;
  const rotate = typeof a.rotate === "number" ? a.rotate : 0;
  return (
    <div className="card hero-avatar-card" data-comment-anchor="hero">
      <div className="hero-avatar-grid">
        <div className="hero-avatar">
          <img
            src={src}
            alt="Bard's Lair"
            style={{
              objectPosition: `${x}% ${y}%`,
              transform: `scale(${scale}) rotate(${rotate}deg)`,
              transformOrigin: "center",
              transition: "transform 0.25s ease, object-position 0.25s ease",
            }}
          />
        </div>
        <div className="hero-avatar-text">
          <h1 className="h1 hero-avatar-name">{name}</h1>
          <p className="body-lg hero-avatar-tagline">{tagline}</p>
          <div className="hero-meta">
            <span><b>BOLDLY GOING WHERE NO BARD HAS GONE BEFORE</b></span>
          </div>
        </div>
      </div>
    </div>);
}

function HeroType({ name, tagline }) {
  const parts = name.split(" ");
  return (
    <div className="hero" data-comment-anchor="hero">
      <div className="hero-eyebrow">
        <span className="pill">Portfolio · 2026</span>
        <span className="mono dim">→ scroll to enter</span>
      </div>
      <h1 className="hero-type">
        {parts[0]}<br />
        <span style={{ color: "var(--accent)" }}>{parts[1] || parts[0]}</span>.
      </h1>
      <p className="body-lg" style={{ maxWidth: 640, marginTop: 32 }}>{tagline}</p>
    </div>);

}

function HeroTerminal({ name, tagline }) {
  const [typed, setTyped] = React.useState("");
  const full = `whoami\n${name.toLowerCase().replace(" ", "_")}\n\ncat ./tagline.txt\n"${tagline}"\n\nls ./now/\nyoutube/  tiktok/  twitch/  notebook.md  caffeine.log\n\n./run --status\n`;
  React.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      if (i > full.length) {clearInterval(id);return;}
      setTyped(full.slice(0, i));
    }, 18);
    return () => clearInterval(id);
  }, [full]);
  return (
    <div className="terminal" data-comment-anchor="hero">
      <div className="terminal-bar">
        <i /><i /><i />
        <span>~/bardbard — zsh — 80×24</span>
      </div>
      <div className="terminal-body">
        <span className="prompt">$</span>
        <span style={{ whiteSpace: "pre-wrap" }}>{typed}</span>
        <span className="cursor" />
      </div>
    </div>);

}

function Hero({ variant, name, tagline, avatar }) {
  if (variant === "type") return <HeroType name={name} tagline={tagline} />;
  if (variant === "terminal") return <HeroTerminal name={name} tagline={tagline} />;
  return <HeroAvatar name={name} tagline={tagline} avatar={avatar} />;
}

// ── Connect ──────────────────────────────────────────────────
function Connect() {
  const links = [
  { src: "assets/social-x.png", label: "X / Twitter", handle: "@bardbard", href: "https://x.com/bardbard" },
  { src: "assets/social-youtube.png", label: "YouTube", handle: "@realbardbard", href: "https://www.youtube.com/@realbardbard" },
  { src: "assets/social-tiktok.png", label: "TikTok", handle: "@realbardbard", href: "https://www.tiktok.com/@realbardbard" },
  { src: "assets/social-instagram.png", label: "Instagram", handle: "@realbardbard", href: "https://www.instagram.com/realbardbard" },
  { src: "assets/social-twitch.png", label: "Twitch", handle: "/realbardbard", href: "https://www.twitch.tv/realbardbard" },
  { src: "assets/social-linkedin.png", label: "LinkedIn", handle: "/in/brad-jensen", href: "https://www.linkedin.com/in/brad-jensen-51a89a3a1/" },
  { src: "assets/social-discord.png", label: "Discord", handle: "discord.gg/s68kwGwNnY", href: "https://discord.gg/s68kwGwNnY" }];

  return (
    <div className="card" data-comment-anchor="connect">
      <div className="card-head" style={{ marginBottom: 18 }}>
        <div className="card-title-row">
          <span className="pill">Connect with me</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {links.map((l) =>
        <a key={l.label} href={l.href} target="_blank" rel="noopener" className="icon-btn social-btn" aria-label={l.label} title={`${l.label} — ${l.handle}`}>
            <img src={l.src} alt="" className="social-img" />
          </a>
        )}
      </div>
    </div>);

}

// ── About Me ─────────────────────────────────────────────────
function AboutMe() {
  return (
    <div className="card about-me-card" data-comment-anchor="about">
      <div className="card-head" style={{ marginBottom: 14 }}>
        <div className="card-title-row">
          <span className="pill" style={{ fontFamily: "\"Geist Mono\"" }}>About Me</span>
        </div>
      </div>
      <p className="dim about-me-body">I'm an ADHD-fueled content creator, marketer, and filmmaker based in the US. I work with brands across the DeFi ecosystem - Sui Network, Ledger, Mysten Labs, Walrus, and more - making promo videos, campaign content, and the occasional cinematic skit. When I'm not editing, you'll find me bouncing between ideas, chasing rabbit holes, and somehow still shipping. Let's make something weird together.

      </p>
    </div>);

}

// ── Stats ────────────────────────────────────────────────────
function Stats() {
  const stats = [
  { value: "412K", label: "YouTube subs", trend: "+8.2% / 30d" },
  { value: "1.2K", label: "Hours streamed", trend: "+142 this year" },
  { value: "284", label: "Videos shipped", trend: "since '22" },
  { value: "47M", label: "Total views", trend: "across platforms" }];

  return (
    <div data-comment-anchor="stats">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <span className="pill">By the Numbers</span>
        <span className="mono faint">last refresh — just now</span>
      </div>
      <div className="grid-4">
        {stats.map((s) =>
        <div key={s.label} className="stat">
            <span className="stat-label">{s.label}</span>
            <span className="stat-value">{s.value}</span>
            <span className="stat-trend">↗ {s.trend}</span>
          </div>
        )}
      </div>
    </div>);

}

// ── Partnerships ─────────────────────────────────────────────
// A grid of brand partnerships. Each entry has a `logo` (image path —
// drop the brand's logo into /assets and update the path) and an `href`
// (link to a case study, brand site, or post). Image and link are
// independently optional — empty values render a clean placeholder.
function Partnerships() {
  const items = [
    { name: "Sui Network", logo: "assets/partner-sui.jpg",      href: "https://www.sui.io/" },
    { name: "Ledger",      logo: "assets/partner-ledger.jpg",   href: "https://www.ledger.com/" },
    { name: "Full Sail",   logo: "assets/partner-fullsail.jpg", href: "https://fullsail.finance/" },
    { name: "Lofi",        logo: "assets/partner-lofi.jpg",     href: "https://lofitheyeti.com/" },
    { name: "Walrus",      logo: "assets/tool-walrus.png",      href: "https://walrus.xyz/" },
    { name: "Suiball",     logo: "assets/partner-suiball.jpg",  href: "https://order.suiball.com/" },
    { name: "Axol",        logo: "assets/partner-axol.jpg",     href: "https://axolcoin.xyz/" },
    { name: "Doonies",     logo: "assets/partner-doonies.jpg",  href: "https://doonies.xyz/" },
    { name: "Drip Market", logo: "assets/partner-drip.jpg",     href: "https://beta.drip.market/" },
  ];

  return (
    <div data-comment-anchor="partnerships">
      <div className="section-head">
        <div className="section-head-text">
          <h2 className="section-title">Trusted Brands</h2>
          <p className="section-subtitle">Brands and projects I've partnered with</p>
        </div>
      </div>
      <div className="partner-grid">
        {items.map((p) => {
          const Tag = p.href ? "a" : "div";
          const linkProps = p.href ? { href: p.href, target: "_blank", rel: "noopener" } : {};
          return (
            <Tag key={p.name} className="partner-card" {...linkProps}>
              <div className="partner-thumb">
                {p.logo ?
                  <img src={p.logo} alt={p.name} className="partner-logo" /> :
                  <>
                    <span className="partner-mono">{p.name.slice(0, 1)}</span>
                    <span className="partner-placeholder-label">logo · drop here</span>
                  </>
                }
              </div>
              <div className="partner-body">
                <span className="partner-name">{p.name}</span>
                {p.href && <span className="partner-arrow"><Icon.Arrow /></span>}
              </div>
            </Tag>
          );
        })}
      </div>
    </div>);

}

// ── Featured ─────────────────────────────────────────────────
function Featured({ count = 4 }) {
  // Edit titles / tags / meta freely — `id` is the YouTube video ID and
  // drives both the thumbnail and the embedded player.
  const all = [
  { id: "Hw20eGD4FW8", tag: "Video", title: "Promotional Ad", meta: ["LEDGER + HIDDENPPF"] },
  { id: "O7LExFoHQ6c", tag: "Video", title: "Campaign Promo", meta: ["LEDGER"] },
  { id: "q-KTkXld-P8", tag: "Video", title: "News Broadcast", meta: ["SUI NETWORK"] },
  { id: "eQjiCI47z68", tag: "Video", title: "Music Video", meta: ["SUI NETWORK"] },
  { id: "", tag: "Short", title: "Tabs to Inbox Zero in 60s", meta: ["3.1M views", "TikTok"] },
  { id: "", tag: "Talk", title: "How I Edit With 47 Tabs Open", meta: ["XOXO Fest"] }];

  const items = all.slice(0, count);
  const [playing, setPlaying] = React.useState(null);

  // Some YouTube uploads don't have a maxres thumb. Detect failures and
  // fall back through hqdefault → mqdefault so we never show YouTube's
  // grey "no thumbnail" placeholder.
  const onThumbError = (e) => {
    const img = e.currentTarget;
    if (img.src.includes("maxresdefault")) img.src = img.src.replace("maxresdefault", "hqdefault");else
    if (img.src.includes("hqdefault")) img.src = img.src.replace("hqdefault", "mqdefault");
  };

  return (
    <div data-comment-anchor="featured">
      <div className="section-head">
        <h2 className="section-title">Cinematic Campaigns</h2>
        <a href="https://www.youtube.com/@realbardbard" target="_blank" rel="noopener" className="btn">See More →</a>
      </div>
      <div className={count >= 3 ? "grid-2" : "grid-2"} style={count === 1 ? { gridTemplateColumns: "1fr" } : undefined}>
        {items.map((f, i) => {
          const isPlaying = playing === i && f.id;
          return (
            <div key={i} className="feature-card">
              <div className="feature-thumb">
                {f.id ?
                isPlaying ?
                <>
                      <iframe
                    className="yt-iframe"
                    src={`https://www.youtube.com/embed/${f.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&fs=1`}
                    title={f.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen />
                  
                      <a
                    href={`https://www.youtube.com/watch?v=${f.id}`}
                    target="_blank"
                    rel="noopener"
                    className="yt-escape"
                    title="Open on YouTube">
                    
                        Open on YouTube ↗
                      </a>
                    </> :

                <button type="button" className="thumb-trigger" onClick={() => setPlaying(i)} aria-label={`Play ${f.title}`}>
                      <img
                    className="yt-thumb"
                    src={`https://img.youtube.com/vi/${f.id}/maxresdefault.jpg`}
                    onError={onThumbError}
                    alt=""
                    loading="lazy" />
                  
                      <span className="thumb-play"><Icon.Play /></span>
                    </button> :


                <>
                    <span className="pattern" />
                    <span className="placeholder-label">thumbnail · drop image here</span>
                  </>
                }
              </div>
              <div className="feature-body">
                <h3 className="feature-title">
                  {f.id ?
                  <a href={`https://www.youtube.com/watch?v=${f.id}`} target="_blank" rel="noopener" className="title-link">
                      {f.title}
                    </a> :
                  f.title}
                </h3>
                <div className="feature-meta">
                  {f.meta.map((m, j) =>
                  <React.Fragment key={j}>
                      <span>{m}</span>
                      {j < f.meta.length - 1 && <span>·</span>}
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>);
        })}
      </div>
    </div>);
}

// ── Short Video Samples ────────────────────────────────────
// Vertical (9:16) short-form clips. Drop a YouTube ID into each `id`
// (the part after youtube.com/shorts/ or youtu.be/) and the card turns
// into a real thumbnail link. Empty ids render a numbered placeholder.
function ShortSamples({ count = 4 }) {
  const items = [
  { id: "ZkE7sWbZvf8", title: "Full Sail" },
  { id: "z5d9Ykmc39s", title: "Crypto" },
  { id: "4cdIKmGMsrU", title: "Sui" },
  { id: "uWj7WZNRQmQ", title: "Audric" }].
  slice(0, count);

  const [playing, setPlaying] = React.useState(null);

  const onThumbError = (e) => {
    const img = e.currentTarget;
    if (img.src.includes("oardefault")) img.src = img.src.replace("oardefault", "hqdefault");
  };

  return (
    <div className="shorts-col" data-comment-anchor="shorts">
      <div className="section-head">
        <h2 className="section-title">Short Video Samples</h2>
        <a href="https://www.youtube.com/@realbardbard/shorts" target="_blank" rel="noopener" className="btn">See More →</a>
      </div>
      <div className="shorts-grid">
        {items.map((s, i) =>
        s.id ?
        <div key={i} className="short-card" onClick={() => setPlaying(playing === i ? null : i)} style={{ cursor: "pointer" }}>
            {playing === i ?
            <iframe
              className="short-embed"
              src={`https://www.youtube.com/embed/${s.id}?autoplay=1&rel=0&playsinline=1`}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              title={s.title} /> :

            <>
              <img className="short-thumb-img" src={`https://i.ytimg.com/vi/${s.id}/oardefault.jpg`} onError={onThumbError} alt={s.title} loading="lazy" />
              <span className="thumb-play"><Icon.Play /></span>
            </>
            }
            <span className="short-title">{s.title}</span>
          </div> :

        <div key={i} className="short-card short-card--empty">
            <span className="short-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="thumb-play"><Icon.Play /></span>
            <span className="placeholder-label">short · drop link here</span>
          </div>
        )}
      </div>
    </div>);

}

// ── Latest Video ─────────────────────────────────────────────
function LatestVideo() {
  return (
    <div className="card" data-comment-anchor="latest-video">
      <div className="card-head">
        <div className="card-title-row">
          <span className="pill">Latest Video</span>
          <span className="mono faint">posted 2 days ago</span>
        </div>
      </div>
      <div className="video-thumb">
        <div className="video-play"><Icon.Play /></div>
        <div className="video-meta">
          <h3 className="h3" style={{ margin: 0 }}>I Watched 100 ADHD Productivity Videos So You Don't Have To</h3>
          <p className="mono faint" style={{ margin: "4px 0 0", fontSize: 11 }}>17:42 · 84K views in 48hrs · The Bard Bard</p>
        </div>
      </div>
    </div>);

}

// ── Portfolio Grid ───────────────────────────────────────────
// Simple, themed line icons — one per post, color-matched to its topic.
const PostIcon = {
  pin:
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>,
  heart:
  <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 20.3s-7.1-4.6-9.4-9.2C1.1 8 2.4 4.4 5.8 4.4c2 0 3.4 1.2 4.4 2.7 1-1.5 2.4-2.7 4.4-2.7 3.4 0 4.7 3.6 3.2 6.7-2.3 4.6-9.4 9.2-9.4 9.2Z" />
    </svg>,
  sparkle:
  <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9L12 2.5Z" />
      <path d="M18.5 14.5l.8 2.3 2.2.8-2.2.8-.8 2.3-.8-2.3-2.2-.8 2.2-.8.8-2.3Z" />
    </svg>,
  basketball:
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.2 12h17.6M12 3.2v17.6M5.6 5.6c3.2 2.1 9.6 2.1 12.8 0M5.6 18.4c3.2-2.1 9.6-2.1 12.8 0" />
    </svg>,
  dice:
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="3.5" />
      <circle cx="9" cy="9" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="9" cy="15" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15" r="1.25" fill="currentColor" stroke="none" />
    </svg>,
  vault:
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 8.6v-1M12 16.4v-1M15.4 12h1M7.6 12h-1" />
    </svg>
};

function PortfolioGrid() {
  // Each tile links to an X post. `icon` picks a PostIcon glyph and `color`
  // tints the thumbnail + badge to match the post's topic.
  const items = [
  { brand: "Sui Network", title: "Sui Miami Event", blurb: "An evening with Sui — great people, great venue, great vibes.", date: "May 6 · 2026", views: "4.9K", icon: "pin", color: "#5be3ff", href: "https://x.com/BardBard/status/2051987522478129625" },
  { brand: "Ledger", title: "True Love Story", blurb: "Hardware wallet sales pitch disguised as a love story.", date: "Mar 28 · 2026", views: "20.1K", icon: "heart", color: "#ff5fb0", href: "https://x.com/BardBard/status/2041867167038370025" },
  { brand: "Mysten Labs", title: "Fate of SUI", blurb: "After much research — the fate of Sui isn't in charts.", date: "Mar 28 · 2026", views: "7.5K", icon: "sparkle", color: "#b98cff", href: "https://x.com/BardBard/status/2042003469968793852" },
  { brand: "Walrus", title: "Do More with Your Data", blurb: "Team Walrus gets the W on-chain AND on-court.", date: "Apr 12 · 2026", views: "9.3K", icon: "basketball", color: "#41d6a8", href: "https://x.com/BardBard/status/2041505581455028352" },
  { brand: "Full Sail", title: "Dungeons & DeFi", blurb: "Join the adventure and level up security with Ledger Nano Gen5.", date: "Mar 23 · 2026", views: "13.0K", icon: "dice", color: "#ffb84a", href: "https://x.com/BardBard/status/2037886697485283521" },
  { brand: "Sui Network", title: "Introducing Vaults on Full Sail", blurb: "Welcome to the era of automation. Built on Sui.", date: "Feb 6 · 2026", views: "11.3K", icon: "vault", color: "#5be3ff", href: "https://x.com/BardBard/status/2032558640138236408" }];

  return (
    <div data-comment-anchor="portfolio">
      <div className="section-head">
        <h2 className="section-title">Notable X Posts</h2>
        <a href="https://x.com/BardBard" target="_blank" rel="noopener" className="btn">All on X →</a>
      </div>
      <div className="post-grid">
        {items.map((it, i) =>
        <a key={i} href={it.href || "#"} target="_blank" rel="noopener" className="post-card">
            <div className="post-img post-img--thumb" style={{ "--post-color": it.color }}>
              <span className="post-brand">{it.brand}</span>
              <span className="post-icon-badge" aria-hidden="true">{PostIcon[it.icon]}</span>
            </div>
            <div className="post-meta">
              <h4 className="post-title">{it.title}</h4>
              <p className="post-blurb">{it.blurb}</p>
              <div className="post-footline">
                <span className="post-date">{it.date}</span>
                <span className="post-views">{it.views} views</span>
              </div>
            </div>
          </a>
        )}
      </div>
    </div>);

}

// ── Countdown ────────────────────────────────────────────────
// REMOVED from the layout (kept here in case it's wanted back later).
// To restore: uncomment this component, re-add `Countdown` to the
// window.Object.assign export at the bottom of this file, add
// `countdown: <Countdown key="countdown" />` to the `sections` map in
// app.jsx, and put "countdown" back into the SECTION_ORDERS arrays.
/*
function Countdown() {
  const target = React.useMemo(() => new Date("2026-10-07T00:00:00+08:00").getTime(), []);
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff % 86400000 / 3600000);
  const m = Math.floor(diff % 3600000 / 60000);
  const s = Math.floor(diff % 60000 / 1000);
  return (
    <div className="card countdown-card" data-comment-anchor="countdown">
      <div className="card-head">
        <div className="card-title-row">
          <span className="pill">NEXT SUI EVENT</span>
          <span className="mono faint"></span>
        </div>
      </div>
      <h2 className="h2" style={{ marginBottom: 6 }}>Sui Basecamp</h2>
      <p className="dim" style={{ margin: 0 }}>Oct 7, 2026 · Singapore</p>
      <div className="countdown">
        <div><b>{String(d).padStart(2, "0")}</b><span>days</span></div>
        <div><b>{String(h).padStart(2, "0")}</b><span>hours</span></div>
        <div><b>{String(m).padStart(2, "0")}</b><span>minutes</span></div>
        <div><b>{String(s).padStart(2, "0")}</b><span>seconds</span></div>
      </div>
    </div>);

}
*/

// ── Skills & Toolkit ─────────────────────────────────────────
function Resources() {
  const items = [
  { img: "assets/tool-iphone.png", title: "iPhone 17 Pro", sub: "What I film on", href: "https://www.apple.com/iphone-17-pro/" },
  { img: "assets/tool-premiere.png", title: "Premiere Pro", sub: "What I edit on", href: "https://www.adobe.com/products/premiere.html" },
  { img: "assets/tool-capcut.png", title: "Capcut", sub: "What I edit on (mobile)", href: "https://www.capcut.com/" }];

  const skills = [
  "Marketing", "Content Strategy", "Storytelling", "Social Media Content Creation",
  "Social Media Management", "Short-form Video", "Long-form Video", "Graphic Design",
  "Community Building", "Content Analytics"];

  return (
    <div data-comment-anchor="resources">
      <div className="section-head">
        <h2 className="section-title">Skills &amp; Toolkit</h2>
        <span className="mono faint">things i actually use</span>
      </div>
      <div className="resources-grid">
        <div className="skills-block">
          <span className="skills-eyebrow mono">// skills</span>
          <ul className="skills-list">
            {skills.map((s) =>
            <li key={s} className="skill">
                <span className="skill-check" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="skill-label">{s}</span>
              </li>
            )}
          </ul>
        </div>
        <div className="row-list toolkit-col">
          {items.map((it) =>
          <a key={it.title} href={it.href || "#"} target="_blank" rel="noopener" className="row">
              <span className="row-thumb"><img src={it.img} alt="" /></span>
              <div className="row-body">
                <p className="row-title">{it.title}</p>
                <p className="row-sub">{it.sub}</p>
              </div>
              <span className="row-arrow"><Icon.Arrow /></span>
            </a>
          )}
        </div>
      </div>
    </div>);

}

// ── Support ──────────────────────────────────────────────────
function Support() {
  const wallets = [
  {
    id: "sui",
    name: "Sui Wallet",
    symbol: "$SUI",
    img: "assets/wallet-sui.jpg",
    address: "0x14ab9c2630a0db94f516afad8ebcccea66ad5721c2009931c1156fc4036f9cc3"
  },
  {
    id: "sol",
    name: "Solana Wallet",
    symbol: "$SOL",
    img: "assets/wallet-solana.png",
    address: "6UVhaz1UNwYwyiXkPVPHswNsFJ3NpAXnRLgPTGtu9ydD"
  }];

  const [copiedId, setCopiedId] = React.useState(null);

  const copy = async (w) => {
    try {
      await navigator.clipboard.writeText(w.address);
    } catch (e) {
      // Clipboard API can fail in sandboxed previews — fall back to a
      // throwaway textarea + execCommand so the copy still works.
      const ta = document.createElement("textarea");
      ta.value = w.address;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {document.execCommand("copy");} catch (_) {}
      document.body.removeChild(ta);
    }
    setCopiedId(w.id);
    setTimeout(() => setCopiedId((c) => c === w.id ? null : c), 1800);
  };

  // Show first 6 + last 4 of the address (typical wallet shortening) so
  // the row still fits when the panel is narrow, while a tooltip + click
  // reveal the full string.
  const shortAddr = (a) => `${a.slice(0, 6)}…${a.slice(-4)}`;

  return (
    <div className="card" data-comment-anchor="support">
      <div className="card-head">
        <div className="card-title-row">
          <span className="pill">Support the Show</span>
          <span className="mono faint">no ads, no sponsors-of-the-week</span>
        </div>
      </div>
      <p className="dim" style={{ margin: "0 0 18px", maxWidth: 620 }}>
        If something here gave you a laugh, or some inspiration / a kick to start your own thing, you can chip in directly. Send a sub-second gift via $SUI or $SOL.
      </p>
      <div className="grid-2">
        {wallets.map((w) =>
        <div key={w.id} className="support-card wallet-card">
            <span className="support-icon wallet-icon">
              <img src={w.img} alt={w.name} />
            </span>
            <div className="support-body wallet-body">
              <p className="support-title">{w.name}</p>
              <p
              className="support-sub wallet-addr"
              title={w.address}
              onClick={() => copy(w)}>
              
                {shortAddr(w.address)}
              </p>
            </div>
            <button
            type="button"
            className="wallet-copy-btn"
            onClick={() => copy(w)}
            aria-label={`Copy ${w.name} address`}
            title={copiedId === w.id ? "Copied!" : "Copy address"}>
            
              {copiedId === w.id ?
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg> :

            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
            }
            </button>
          </div>
        )}
      </div>
    </div>);
}

// ── Ticker ───────────────────────────────────────────────────
function Ticker() {
  const words = ["SUI", "•", "ADHD", "•", "MAGICIAN", "•", "STORYTELLER", "•", "FOR HIRE", "•", "US BASED", "•"];
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        {row.map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </div>);

}

export {
  Hero, Connect, AboutMe, Stats, Partnerships, Featured, ShortSamples, LatestVideo, PortfolioGrid,
  Resources, Support, Ticker
};
