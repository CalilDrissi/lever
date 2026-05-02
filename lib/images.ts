/**
 * Pexels asset registry.
 *
 * Each entry stores the Pexels photo id, the natural aspect ratio (w/h),
 * and a credit. Images are served via images.pexels.com — see
 * next.config.mjs `images.remotePatterns`.
 *
 * Image curation principles for Virtus Lever:
 *   - calm, paper-toned, daylight palettes (no vivid colors)
 *   - quiet activity: writing, focused work, hands at a table
 *   - never stock-photo "thumbs up at camera" energy
 */

export type PexelsImage = {
  id: number;
  /** Natural aspect ratio used to size <Image fill /> containers. */
  ratio: "square" | "4/3" | "3/2" | "16/9" | "portrait";
  /** Alt text used wherever the image is rendered. */
  alt: string;
  /** Photographer credit — show in footer or hover tooltip. */
  credit: string;
};

export const px = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const images: Record<string, PexelsImage> = {
  manifesto: {
    id: 4348078,
    ratio: "4/3",
    alt: "Atelier baigné de lumière naturelle — concentration, table en bois, supports d'écriture.",
    credit: "Pexels",
  },
  useCaseFocus: {
    id: 4065876,
    ratio: "4/3",
    alt: "Vue plongeante : ordinateur portable et bureau minimaliste, lumière douce.",
    credit: "Pexels",
  },
  useCaseDesk: {
    id: 374016,
    ratio: "4/3",
    alt: "Personne concentrée sur un ordinateur portable dans un bureau lumineux.",
    credit: "Pexels",
  },
  useCaseTeam: {
    id: 3184360,
    ratio: "4/3",
    alt: "Équipe en discussion calme autour d'une table en bois.",
    credit: "Pexels",
  },
  finalCtaBg: {
    // Same source as useCaseFocus — different treatment (charcoal wash, blur,
    // 25% opacity) so it reads as wallpaper, not a duplicate.
    id: 4065876,
    ratio: "16/9",
    alt: "",
    credit: "Pexels",
  },
};
