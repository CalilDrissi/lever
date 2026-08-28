/** European Union flag — dark blue with 12 gold stars in a circle. */
export function EUFlag({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const w = Math.round(size * 1.5);

  // Star polygon (circumradius 1.5, inner 0.57, pointing up)
  const starPts =
    "0,-1.5 0.335,-0.461 1.426,-0.463 0.542,0.176 0.883,1.213 0,0.57 -0.883,1.213 -0.542,0.176 -1.426,-0.463 -0.335,-0.461";

  // 12 stars on a circle of radius 6, centred at (15,10)
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = ((i * 30 - 90) * Math.PI) / 180;
    return { cx: +(15 + 6 * Math.cos(a)).toFixed(2), cy: +(10 + 6 * Math.sin(a)).toFixed(2) };
  });

  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 30 20"
      role="img"
      aria-label="EU flag"
      className={className}
    >
      <rect width="30" height="20" fill="#003399" />
      {stars.map(({ cx, cy }, i) => (
        <polygon
          key={i}
          points={starPts}
          fill="#FFDD00"
          transform={`translate(${cx},${cy})`}
        />
      ))}
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
