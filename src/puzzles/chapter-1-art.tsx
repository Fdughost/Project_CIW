export function HarmonicaArt() {
  return (
    <svg viewBox="0 0 320 96" className="ciw-art ciw-art-harmonica" aria-hidden="true">
      <defs>
        <linearGradient id="ch1-brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8d887" />
          <stop offset="0.45" stopColor="#d6a04a" />
          <stop offset="0.85" stopColor="#7a4d12" />
          <stop offset="1" stopColor="#4a2d07" />
        </linearGradient>
        <linearGradient id="ch1-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a341a" />
          <stop offset="0.5" stopColor="#3a1e0c" />
          <stop offset="1" stopColor="#1a0d04" />
        </linearGradient>
      </defs>
      <rect x="6" y="20" width="308" height="56" rx="6" fill="url(#ch1-wood)" stroke="#1a0d04" strokeWidth="1.5" />
      <rect x="6" y="22" width="308" height="22" rx="5" fill="url(#ch1-brass)" stroke="#52310c" strokeWidth="1" />
      <rect x="6" y="60" width="308" height="16" rx="3" fill="url(#ch1-brass)" opacity="0.85" />
      <g fill="#1a0d04" opacity="0.92">
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={i} x={20 + i * 28} y="48" width="14" height="10" rx="1.5" />
        ))}
      </g>
      <g stroke="rgba(255, 240, 200, 0.4)" strokeWidth="0.6" fill="none">
        <path d="M6 28 L314 28" />
        <path d="M6 70 L314 70" />
      </g>
      <ellipse cx="160" cy="34" rx="120" ry="6" fill="rgba(255, 250, 220, 0.18)" />
    </svg>
  );
}

export function ScorePaperArt() {
  return (
    <svg viewBox="0 0 460 280" className="ciw-art ciw-art-score" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ch1-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff4d4" />
          <stop offset="0.6" stopColor="#f2d99e" />
          <stop offset="1" stopColor="#d4b274" />
        </linearGradient>
        <filter id="ch1-paper-shadow">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <path
        d="M14 18 Q24 6 50 10 L420 6 Q442 14 448 30 L454 250 Q448 268 432 270 L40 274 Q18 270 12 256 Z"
        fill="url(#ch1-paper)"
        stroke="rgba(120, 80, 40, 0.4)"
        strokeWidth="1.2"
      />
      <g stroke="rgba(120, 80, 40, 0.18)" strokeWidth="0.8" fill="none">
        <path d="M40 70 L420 68" />
        <path d="M40 88 L420 86" />
        <path d="M40 106 L420 104" />
        <path d="M40 124 L420 122" />
        <path d="M40 142 L420 140" />
      </g>
      <path
        d="M50 50 Q70 36 110 44 Q150 52 180 42 Q220 32 250 50"
        stroke="rgba(80, 50, 20, 0.55)"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      <g fill="rgba(120, 80, 40, 0.5)">
        <circle cx="60" cy="180" r="3" />
        <circle cx="120" cy="200" r="3" />
        <circle cx="200" cy="170" r="3" />
        <circle cx="290" cy="195" r="3" />
        <circle cx="360" cy="180" r="3" />
      </g>
    </svg>
  );
}

export function WoodenDoorLockArt() {
  return (
    <svg viewBox="0 0 480 380" className="ciw-art ciw-art-door" aria-hidden="true">
      <defs>
        <linearGradient id="ch1-door" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6e4220" />
          <stop offset="0.5" stopColor="#3e2310" />
          <stop offset="1" stopColor="#1f1206" />
        </linearGradient>
        <linearGradient id="ch1-plank" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255, 200, 130, 0.12)" />
          <stop offset="0.5" stopColor="transparent" />
          <stop offset="1" stopColor="rgba(0, 0, 0, 0.4)" />
        </linearGradient>
        <radialGradient id="ch1-brass-plate" cx="0.5" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#fce8a8" />
          <stop offset="0.5" stopColor="#c8902f" />
          <stop offset="1" stopColor="#5a3608" />
        </radialGradient>
        <radialGradient id="ch1-socket" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#1a0d04" />
          <stop offset="0.6" stopColor="#3a2110" />
          <stop offset="1" stopColor="#6c4520" />
        </radialGradient>
      </defs>

      <path
        d="M40 30 Q50 12 80 16 L400 14 Q432 20 442 42 L450 350 Q440 372 414 374 L66 376 Q40 370 32 348 Z"
        fill="url(#ch1-door)"
        stroke="#0d0703"
        strokeWidth="2"
      />

      <g stroke="rgba(0, 0, 0, 0.45)" strokeWidth="1.4">
        <path d="M138 28 L138 374" />
        <path d="M240 24 L240 376" />
        <path d="M342 28 L342 374" />
      </g>
      <g fill="url(#ch1-plank)" opacity="0.6">
        <rect x="40" y="28" width="98" height="346" />
        <rect x="138" y="28" width="102" height="346" />
        <rect x="240" y="28" width="102" height="346" />
        <rect x="342" y="28" width="100" height="346" />
      </g>

      <g fill="#2a1808" stroke="#fce8a8" strokeWidth="0.6">
        <circle cx="60" cy="50" r="5" />
        <circle cx="420" cy="50" r="5" />
        <circle cx="60" cy="350" r="5" />
        <circle cx="420" cy="350" r="5" />
      </g>

      <g transform="translate(80, 130)">
        <rect
          x="0"
          y="0"
          width="320"
          height="130"
          rx="14"
          fill="url(#ch1-brass-plate)"
          stroke="#3a2008"
          strokeWidth="2"
        />
        <rect
          x="6"
          y="6"
          width="308"
          height="118"
          rx="10"
          fill="none"
          stroke="rgba(255, 240, 200, 0.4)"
          strokeWidth="0.8"
        />
        <g stroke="#3a2008" strokeWidth="1.2" fill="none" opacity="0.55">
          <path d="M14 18 Q22 10 32 14" />
          <path d="M306 18 Q298 10 288 14" />
          <path d="M14 112 Q22 120 32 116" />
          <path d="M306 112 Q298 120 288 116" />
        </g>

        <g>
          {[44, 116, 188, 260].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="65" r="30" fill="url(#ch1-socket)" stroke="#3a2008" strokeWidth="1.5" />
              <circle cx={cx} cy="65" r="26" fill="none" stroke="rgba(252, 232, 168, 0.4)" strokeWidth="0.8" />
            </g>
          ))}
        </g>
      </g>

      <g transform="translate(380, 280)">
        <rect x="0" y="0" width="40" height="14" rx="4" fill="url(#ch1-brass-plate)" stroke="#3a2008" strokeWidth="1.2" />
        <ellipse cx="20" cy="7" rx="14" ry="3" fill="rgba(255, 240, 200, 0.3)" />
      </g>

      <ellipse cx="240" cy="200" rx="160" ry="12" fill="rgba(0, 0, 0, 0.45)" opacity="0.4" filter="url(#ch1-paper-shadow)" />
    </svg>
  );
}
