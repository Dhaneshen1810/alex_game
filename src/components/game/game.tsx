"use client";
import { LetterType } from "@/app/(game)/player/page";
import { isAlphabetical } from "@/utils/helpers";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Letter from "./letter";
import ScoreBoard from "./score-board/score-board";
import WordBlock, { WordBlockProps } from "./word-block";

interface GameProps {
  letters: LetterType[];
  turn: string;
  socket: any;
  numberOfWrongs: number;
}

const Game: React.FC<GameProps> = ({
  letters,
  turn,
  socket,
  numberOfWrongs,
}) => {
  const [wordBlockLetters, setWordBlockLetters] = useState<LetterType[][]>([]);
  const handleKeyDown = (event: KeyboardEvent) => {
    const char = event.key;

    if (isAlphabetical(char) && char != "Shift") {
      socket.emit("send_letter", { letter: char });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    let tempWordBlockLetters: LetterType[] = [];
    const newWordBlockLetters: LetterType[][] = [];

    for (let letter of letters) {
      if (letter.letter === " ") {
        newWordBlockLetters.push(tempWordBlockLetters);
        tempWordBlockLetters = [];
      } else {
        tempWordBlockLetters.push(letter);
      }
    }

    if (tempWordBlockLetters.length > 0) {
      newWordBlockLetters.push(tempWordBlockLetters);
    }

    setWordBlockLetters((prev) => [...newWordBlockLetters]);
  }, [letters]);

  console.log("word block letter are", wordBlockLetters);

  return (
    <div className="flex flex-col gap-10 w-[800px] h-[500px]">
      <div className="flex justify-between">
        <p className="text-2xl">{turn}'s turn</p>
        <ScoreBoard numberOfWrongs={numberOfWrongs} />
      </div>

      {/* <div className="flex gap-2 flex-wrap">
        {letters.map((letter) =>
          isAlphabetical(letter.letter) ? (
            <Letter hide={letter.hide}>{letter.letter}</Letter>
          ) : (
            <div className="flex flex-col w-10 h-11 gap-1 justify-end text-2xl">
              {letter.letter}
            </div>
          )
        )}
      </div> */}
      <div className="flex gap-10 flex-wrap">
        {wordBlockLetters?.map((wordBlockLetter, index) => (
          <WordBlock key={`word block ${index}`} letters={wordBlockLetter} />
        ))}
      </div>
    </div>
  );
};

export default Game;
