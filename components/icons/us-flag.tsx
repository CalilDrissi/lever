/** US flag — 13 alternating stripes and a blue canton. */
export function USFlag({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const w = Math.round(size * 1.5);
  const stripeH = 20 / 13;
  const cantonH = 7 * stripeH; // covers 7 stripes

  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 30 20"
      role="img"
      aria-label="US flag"
      className={className}
    >
      {/* 13 alternating red / white stripes */}
      {Array.from({ length: 13 }, (_, i) => (
        <rect
          key={i}
          x="0"
          y={i * stripeH}
          width="30"
          height={stripeH}
          fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
        />
      ))}

      {/* Blue canton */}
      <rect x="0" y="0" width="12" height={cantonH} fill="#3C3B6E" />

      {/* 9 rows × 6 cols = 54 star dots (simplified — real flag has 50 staggered) */}
      {Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 6 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={1.1 + col * 1.8}
            cy={cantonH / 10 + row * (cantonH / 5.5)}
            r="0.55"
            fill="#FFFFFF"
          />
        ))
      )}

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
