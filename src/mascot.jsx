// mascot.jsx — swinging wrecking-ball mascot

function Mascot() {
  return (
    <div className="mascot" aria-hidden="true">
      {/* Anchor point — top of chain, fixed to viewport */}
      <span className="mascot-anchor" />
      {/* Chain — rendered as a column of repeating links */}
      <svg className="mascot-chain" viewBox="0 0 20 200" preserveAspectRatio="none">
        <defs>
          <pattern id="chainPattern" width="20" height="24" patternUnits="userSpaceOnUse">
            <ellipse cx="10" cy="6" rx="6" ry="4.5" fill="none" stroke="#1a1d24" strokeWidth="2.5" />
            <ellipse cx="10" cy="18" rx="6" ry="4.5" fill="none" stroke="#2a2e36" strokeWidth="2.5" />
          </pattern>
        </defs>
        <rect width="20" height="200" fill="url(#chainPattern)" />
      </svg>
      {/* The swinging element — character + ball */}
      <div className="mascot-payload">
        <img src="assets/mascot-wreckingball.jpg" alt="Bard Bard" />
      </div>
    </div>);
}

Object.assign(window, { Mascot });
