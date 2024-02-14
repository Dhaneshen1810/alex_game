"use client";
import { useEffect, useState } from "react";
import Image from "../../../../node_modules/next/image";

interface ScoreBoardProps {
  numberOfWrongs: number;
}

interface Score {
  key: string;
  wrong: boolean;
}

const maxScore = 5;

const ScoreBoard: React.FC<ScoreBoardProps> = ({ numberOfWrongs }) => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    setScores(() => {
      const newScores = [];

      for (let i = 0; i < numberOfWrongs; i++) {
        newScores.push({
          key: `wrong score - ${i}`,
          wrong: true,
        });
      }

      for (let i = 0; i < maxScore - numberOfWrongs; i++) {
        newScores.push({
          key: `score - ${i}`,
          wrong: false,
        });
      }

      return newScores;
    });
  }, [numberOfWrongs]);

  return (
    <div className="flex gap-2">
      {scores.map((score) =>
        score.wrong ? (
          <Image
            key={`${score.key}`}
            src="/radio-button-wrong.png"
            alt={score.key}
            width={50}
            height={50}
          />
        ) : (
          <Image
            key={`${score.key}`}
            src="/radio-button.png"
            alt={score.key}
            width={50}
            height={50}
          />
        )
      )}
    </div>
  );
};

export default ScoreBoard;
