"use client";
import { useEffect, useState } from "react";
import GameBox from "@/components/box/game-box";
import { io } from "socket.io-client";
import Game from "@/components/game/game";
import { sentenceToLetters } from "@/utils/helpers";
import useSound from "use-sound";

const wrongAnswerSoundUrl = "/sounds/wrong-answer.wav";
const correctAnswerSoundUrl = "/sounds/correct-answer.wav";

export interface LetterType {
  letter: string;
  hide: boolean;
}

const GamePage = () => {
  const [playWrongAnswerSound] = useSound(wrongAnswerSoundUrl, {
    volume: 0.1,
  });
  const [playCorrectAnswerSound] = useSound(correctAnswerSoundUrl, {
    volume: 0.3,
  });
  const [name, setName] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [players, setPlayers] = useState<string[]>([]);
  const [letters, setLetters] = useState<LetterType[]>([]);
  const [turn, setTurn] = useState<string>("");
  const [numberOfWrongs, setNumberOfWrongs] = useState<number>(0);

  useEffect(() => {
    setIsDisabled(name.length <= 0);
  }, [name]);

  var socket: any;
  socket = io("http://localhost:3001");
  // socket = io("https://alex-game-server-bd00da7b56bd.herokuapp.com/");

  const handleJoin = () => {
    if (name !== "") {
      setShowSpinner(true);
      setIsDisabled(true);
      socket.emit("join_room", name, (ack) => {
        if (ack.success) {
          // setPlayers((prev) => [...prev, name]);
          console.log("success", ack);
        } else {
          alert("Could not join room");
        }
      });
    } else {
      setIsDisabled(false);
      setShowSpinner(false);
      alert("Please fill in name");
    }
  };

  useEffect(() => {
    socket.on("joined", (data: any) => {
      setPlayers(data.players);
      setLetters(sentenceToLetters(data.sentence));
      setTurn(data.turn);
      setNumberOfWrongs(data.numberOfWrongs);
    });
    socket.on("receive_letter", (data: any) => {
      setLetters((prevLetters) => {
        return prevLetters.map((letter) => {
          if (data.letter.toLowerCase() === letter.letter.toLowerCase()) {
            return {
              ...letter,
              hide: false,
            };
          }
          return letter;
        });
      });
      if (data.isCorrect) {
        playCorrectAnswerSound();
      } else {
        playWrongAnswerSound();
      }
      setNumberOfWrongs(data.numberOfWrongs);
      setTurn((prev) => (prev === data.turn ? prev : data.turn));
    });
  }, [socket]);

  if (players.length === 2) {
    return (
      <GameBox>
        <Game
          letters={letters}
          turn={turn}
          socket={socket}
          numberOfWrongs={numberOfWrongs}
        />
      </GameBox>
    );
  }

  if (showSpinner) {
    return (
      <GameBox>
        <div className="self-center">* Waiting on other player</div>
      </GameBox>
    );
  }

  return (
    <GameBox>
      <div className="mx-auto flex h-16 max-w-screen-sm items-center justify-center">
        <div className="w-full  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 rounded-3xl">
          <div className="flex h-full w-full items-center justify-center bg-gray-800 px-10 rounded-3xl">
            <input
              type="text"
              className="bg-transparent h-16 w-80 outline-none text-slate-300 text-2xl"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleJoin}
        className={
          isDisabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed px-5 py-2 w-fit rounded-md shadow-md self-center mt-5"
            : "bg-gradient-to-r from-green-500 to-green-700 hover:bg-green-400 hover:from-green-700 hover:to-green-900 transition duration-300 ease-in-out w-fit self-center mt-5 px-5 py-2 rounded-md tracking-wide shadow-md"
        }
      >
        JOIN GAME
      </button>
    </GameBox>
  );
};

export default GamePage;
