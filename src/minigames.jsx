import React from 'react';

// minigames.jsx — launcher card + full-screen iframe overlay for the mini games

function MiniGames() {
  const [active, setActive] = React.useState(null); // game id or null
  const games = [
    {
      id: "ue",
      icon: "🦄",
      title: "Unicorn Exploder",
      blurb: "Catch the rainbow stampede.",
      color: "rgba(0,229,255,1)",
    },
    {
      id: "ika",
      icon: "🦑",
      title: "IKA Crossing",
      blurb: "Be quick and avoid obstacles.",
      color: "rgba(103,232,249,1)",
    },
    {
      id: "wt",
      icon: "👨‍🦲",
      title: "Pin the Wig on Adeniyi",
      blurb: "Launch wigs onto a moving target.",
      color: "rgba(167,139,250,1)",
    },
    {
      id: "bb",
      icon: "🧙‍♂️",
      title: "Bard Bounce",
      blurb: "Bounce from the bottom — don't fall.",
      color: "rgba(251,191,36,1)",
    },
    {
      id: "bd",
      icon: "🍕",
      title: "Brian's Dominos",
      blurb: "Help Brian catch his pizza order. HEY EVERYONE!",
      color: "rgba(204,0,0,1)",
    },
  ];

  // Listen for the iframe asking to close itself.
  React.useEffect(() => {
    function onMsg(e) {
      if (e && e.data && e.data.type === "closeGameOverlay") {
        setActive(null);
      }
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Lock body scroll while a game is open.
  React.useEffect(() => {
    if (active) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [active]);

  // ESC closes when nothing in the iframe is intercepting.
  React.useEffect(() => {
    if (!active) return;
    function onKey(e) {
      if (e.key === "Escape") {
        // Let the iframe handle ESC first; we only close as a fallback when
        // the iframe doesn't (it will postMessage closeGameOverlay if so).
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <div className="card" data-comment-anchor="games">
        <div className="card-head" style={{ marginBottom: 18 }}>
          <div className="card-title-row">
            <span className="pill">Mini Games</span>
          </div>
        </div>
        <div className="games-list">
          {games.map((g) =>
            <button
              key={g.id}
              type="button"
              onClick={() => setActive(g.id)}
              className="game-tile"
              style={{ "--game-accent": g.color }}
            >
              <span className="game-icon">{g.icon}</span>
              <span className="game-body">
                <span className="game-title">{g.title}</span>
                <span className="game-sub">{g.blurb}</span>
              </span>
              <span className="game-arrow">↗</span>
            </button>
          )}
        </div>
      </div>

      {active && (
        <div className="game-overlay" role="dialog" aria-modal="true" aria-label="Mini-game">
          <iframe
            key={active}
            className="game-frame"
            src={`games/play.html?game=${active}`}
            title="Mini-game"
            allow="autoplay; fullscreen; gyroscope; accelerometer"
            allowFullScreen
          />
        </div>
      )}
    </>
  );
}

export {
  MiniGames
};
