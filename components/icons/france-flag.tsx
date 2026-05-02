/**
 * France flag — three vertical bands (bleu, blanc, rouge).
 *
 * Sized via the `size` prop (default 16px tall, 24px wide). Uses the
 * official French civil flag colors. A 1px neutral-20 border keeps the
 * white middle band readable on the white page background.
 */
export function FranceFlag({
  className,
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
  const w = Math.round(size * 1.5);
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 30 20"
      role="img"
      aria-label="Drapeau français"
      className={className}
    >
      <rect width="10" height="20" fill="#0055A4" />
      <rect x="10" width="10" height="20" fill="#FFFFFF" />
      <rect x="20" width="10" height="20" fill="#EF4135" />
      <rect
        x="0.5"
        y="0.5"
        width="29"
        height="19"
        fill="none"
        stroke="#dedbd5"
        strokeWidth="1"
      />
    </svg>
  );
}
