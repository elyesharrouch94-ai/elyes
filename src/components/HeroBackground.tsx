export default function HeroBackground() {
  return (
    <div aria-hidden className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative w-[min(62vw,560px)] aspect-[597/520] -translate-y-[16vh] hero-cover-mask">
        <video
          src="/hero-cover.mp4"
          poster="/hero-cover-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
      </div>
    </div>
  );
}
