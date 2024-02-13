import Image from "../../../node_modules/next/image";

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white min-h-screen relative flex justify-center items-center">
      <div className="absolute inset-0 z-0">
        <Image
          alt="background image"
          src="/bg-image.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
