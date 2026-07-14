import Image from "next/image";

export default function HeroBackground() {
  return (
    <div aria-hidden className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative w-[min(62vw,560px)] aspect-[597/520] -translate-y-[16vh]">
        <Image
          src="/portrait.png"
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 62vw, 560px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
