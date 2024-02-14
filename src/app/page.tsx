import Image from "../../node_modules/next/image";
import Link from "../../node_modules/next/link";

export default function Home() {
  return (
    <div className="flex flex-col bg-slate-300 h-screen">
      <div className="text-6xl self-center mt-8 text-gray-500 font-sixtyfour">
        NOWNIDHI GAMES
      </div>
      <div className="flex p-20">
        <div className="flex flex-col">
          <Link
            href="/alex-game"
            className="w-72 h-60 relative cursor-pointer overflow-hidden rounded-xl"
          >
            <Image
              className="transform transition-transform hover:scale-110"
              src="/alex-game.png"
              fill={true}
              alt="alex game image"
            />
          </Link>
          <div className="text-3xl self-center mt-6 text-gray-500 font-bitter">
            Alex Game
          </div>
        </div>
      </div>
    </div>
  );
}
