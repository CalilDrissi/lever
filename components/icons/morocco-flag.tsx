/** Morocco flag — red with a green outlined pentagram (Solomon's seal). */
export function MoroccoFlag({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const w = Math.round(size * 1.5);

  // Pentagon vertices at circumradius 4.5 from center (15,10), starting from top:
  // 0: (15, 5.5)   1: (19.28, 8.61)   2: (17.65, 13.64)
  // 3: (12.35, 13.64)   4: (10.72, 8.61)
  //
  // Pentagram order (skip one vertex) → 0→2→4→1→3→0
  const pts = "15,5.5 17.65,13.64 10.72,8.61 19.28,8.61 12.35,13.64";

  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 30 20"
      role="img"
      aria-label="Moroccan flag"
      className={className}
    >
      <rect width="30" height="20" fill="#C1272D" />
      {/* Interlaced pentagram — outline only, no fill */}
      <polygon
        points={pts}
        fill="none"
        stroke="#006233"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <rect
        x="0.5"
        y="0.5"
        width="29"
        height="19"
        fill="none"
        stroke="#dedbd5"
        strokeWidth="0.7"
      />
    </svg>
  );
}
