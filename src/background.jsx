// background.jsx — animated background layers (stars, grid, fog, none)

function BgStars({ animate }) {
  const stars = React.useMemo(() => {
    const out = [];
    for (let i = 0; i < 120; i++) {
      out.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        size: Math.random() > 0.85 ? 3 : Math.random() > 0.6 ? 2 : 1,
      });
    }
    return out;
  }, []);
  return (
    <div className="bg-stars">
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            left: s.x + "%",
            top: s.y + "%",
            width: s.size,
            height: s.size,
            animationDelay: animate ? `${s.delay}s` : "0s",
            animationPlayState: animate ? "running" : "paused",
            opacity: animate ? undefined : 0.5,
          }}
        />
      ))}
    </div>
  );
}

function BgGrid() {
  return <div className="bg-grid" />;
}

function BgFog() {
  return <div className="bg-fog" />;
}

function Background({ mood, animate }) {
  return (
    <div className="bg-layer">
      {mood === "stars" && <BgStars animate={animate} />}
      {mood === "grid" && <BgGrid />}
      {mood === "fog" && <BgFog />}
    </div>
  );
}

Object.assign(window, { Background });
