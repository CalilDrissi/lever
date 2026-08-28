/** Union Jack — simplified but recognizable at small sizes. */
export function GBFlag({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const w = Math.round(size * 1.5);
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 30 20"
      role="img"
      aria-label="UK flag"
      className={className}
    >
      {/* Blue background */}
      <rect width="30" height="20" fill="#012169" />

      {/* White saltire — wide arms give room for the red offset inside */}
      <polygon
        points="0,0 5,0 15,7.5 25,0 30,0 30,4 20,10 30,16 30,20 25,20 15,12.5 5,20 0,20 0,16 10,10 0,4"
        fill="white"
      />

      {/* Red saltire (St Patrick) — offset: right side of each diagonal arm */}
      <polygon
        points="0,0 3,0 15,8.5 27,0 30,0 30,2.5 17.5,10 30,17.5 30,20 27,20 15,11.5 3,20 0,20 0,17.5 12.5,10 0,2.5"
        fill="#C8102E"
      />

      {/* White cross fimbriation (St George) */}
      <rect x="12" y="0" width="6" height="20" fill="white" />
      <rect x="0" y="7" width="30" height="6" fill="white" />

      {/* Red cross (St George) */}
      <rect x="13" y="0" width="4" height="20" fill="#C8102E" />
      <rect x="0" y="8" width="30" height="4" fill="#C8102E" />

      {/* Hairline border */}
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
