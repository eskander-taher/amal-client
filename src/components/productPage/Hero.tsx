import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full">
      <Image
        src="/hero.webp"
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
          شركة أمل الخير للدواجن
        </h1>
      </div>
    </section>
  );
}
