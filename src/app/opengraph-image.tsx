import { renderOgCard, OG_SIZE } from "@/lib/og-card";

export const alt = "Elyes Harrouch — Communications Specialist, Montréal";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard();
}
