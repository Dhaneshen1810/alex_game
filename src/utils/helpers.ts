import { LetterType } from "@/app/(game)/player/page";

const sentenceToWords = (sentence: string): string[] => sentence.split(" ");

const wordsToLetters = (words: string[]): LetterType[] => {
  const newLetters: LetterType[] = [];

  words.map((word) => {
    if (word.includes("Alex")) {
      for (let i = 0; i < word.length; i++) {
        newLetters.push({
          letter: word[i],
          hide: false,
        });
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        newLetters.push({
          letter: word[i],
          hide: true,
        });
      }
    }

    newLetters.push({
      letter: " ",
      hide: false,
    });
  });

  return newLetters;
};

export const sentenceToLetters = (sentence: string): LetterType[] => {
  const words = sentenceToWords(sentence);
  const letters = wordsToLetters(words);

  return letters;
};

export const isAlphabetical = (char: string): boolean => {
  return /[a-zA-Z]/.test(char);
};
