export default function HeroBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <video
        src="/hero-cover.mp4"
        poster="/hero-cover-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 hero-cover-scrim" />
    </div>
  );
}
