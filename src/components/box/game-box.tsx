interface GameBoxProps {
  children: React.ReactNode;
}

const GameBox: React.FC<GameBoxProps> = ({ children }) => {
  return (
    <div className="flex flex-col p-20 min-w-[700px] shadow-2xl relative">
      <div className="absolute bg-black opacity-15 w-full h-full top-0 left-0"></div>
      <div className="relative flex flex-col">{children}</div>
    </div>
  );
};

export default GameBox;
