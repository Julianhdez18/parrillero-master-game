import { useState, useEffect } from "react";
import { GameStart } from "./GameStart";
import { GamePlay } from "./GamePlay";
import { GameEnd } from "./GameEnd";
import { useToast } from "@/hooks/use-toast";

export type GameState = "start" | "playing" | "end";

export interface Friend {
  id: string;
  name: string;
  order: {
    meat: string;
    sides: string[];
    needsBeer: boolean;
  };
  mood: "hungry" | "happy" | "angry";
  timeLeft: number;
  maxTime: number;
}

export interface GameStats {
  score: number;
  perfectCombos: number;
  angryFriends: number;
  happyFriends: number;
}

const BBQGame = () => {
  const [gameState, setGameState] = useState<GameState>("start");
  const [score, setScore] = useState(0);
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    perfectCombos: 0,
    angryFriends: 0,
    happyFriends: 0,
  });
  const { toast } = useToast();

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setGameStats({
      score: 0,
      perfectCombos: 0,
      angryFriends: 0,
      happyFriends: 0,
    });
    toast({
      title: "¡Juego iniciado!",
      description: "¡Atiende a tus amigos hambrientos!",
    });
  };

  const endGame = (finalStats: GameStats) => {
    setGameStats(finalStats);
    setGameState("end");
    
    let message = "";
    if (finalStats.score >= 1000) {
      message = "¡Eres un Maestro Parrillero!";
    } else if (finalStats.score >= 500) {
      message = "¡Buen trabajo en la parrilla!";
    } else {
      message = "¡Sigue practicando!";
    }
    
    toast({
      title: message,
      description: `Puntuación final: ${finalStats.score}`,
    });
  };

  const restartGame = () => {
    setGameState("start");
  };

  return (
    <div className="min-h-screen bg-gradient-night relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-fire rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-beer rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-vegetables rounded-full blur-md animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {gameState === "start" && <GameStart onStart={startGame} />}
      {gameState === "playing" && (
        <GamePlay 
          onGameEnd={endGame}
          score={score}
          setScore={setScore}
        />
      )}
      {gameState === "end" && (
        <GameEnd 
          stats={gameStats}
          onRestart={restartGame}
        />
      )}
    </div>
  );
};

export default BBQGame;