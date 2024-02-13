interface LetterProps {
  children: string;
  hide: boolean;
}

const Letter: React.FC<LetterProps> = ({ children, hide }) => {
  return (
    <div className="flex flex-col w-14 gap-1">
      <div className="flex justify-center h-11 items-center text-white bg-transparent text-3xl font-bold">
        {!hide && children}
      </div>
      <div className="w-full h-1 bg-lime-600 rounded-full" />
    </div>
  );
};

export default Letter;
