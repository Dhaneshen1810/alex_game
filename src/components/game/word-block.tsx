import { LetterType } from "@/app/(game)/player/page";
import { isAlphabetical } from "@/utils/helpers";
import Letter from "./letter";

export interface WordBlockProps {
  letters: LetterType[];
}

const WordBlock: React.FC<WordBlockProps> = ({ letters }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {letters.map((letter) =>
        isAlphabetical(letter.letter) ? (
          <Letter hide={letter.hide}>{letter.letter}</Letter>
        ) : (
          <div className="flex flex-col w-10 h-11 gap-1 justify-end text-2xl">
            {letter.letter}
          </div>
        )
      )}
    </div>
  );
};

export default WordBlock;
