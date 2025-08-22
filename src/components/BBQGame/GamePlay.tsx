import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Friend, GameStats } from "./BBQGame";
import { FriendAvatar } from "./FriendAvatar";
import { IngredientSelector } from "./IngredientSelector";
import { GrillArea } from "./GrillArea";

interface GamePlayProps {
  onGameEnd: (stats: GameStats) => void;
  score: number;
  setScore: (score: number) => void;
}

const MEAT_TYPES = ["Rib Eye", "Arrachera", "Costilla", "T-Bone"];
const SIDES = ["Cebollitas", "Nopales", "Queso", "Salchicha"];
const FRIEND_NAMES = ["Carlos", "María", "Luis", "Ana", "Pedro", "Sofia"];

const GAME_DURATION = 300; // 5 minutes in seconds

export const GamePlay = ({ onGameEnd, score, setScore }: GamePlayProps) => {
  const [gameTime, setGameTime] = useState(GAME_DURATION);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedMeat, setSelectedMeat] = useState<string>("");
  const [selectedSides, setSelectedSides] = useState<string[]>([]);
  const [hasBeer, setHasBeer] = useState(false);
  const [perfectCombos, setPerfectCombos] = useState(0);
  const [angryFriends, setAngryFriends] = useState(0);
  const [happyFriends, setHappyFriends] = useState(0);

  // Generate random friend order
  const generateFriend = useCallback((): Friend => {
    const id = Math.random().toString(36).substr(2, 9);
    const name = FRIEND_NAMES[Math.floor(Math.random() * FRIEND_NAMES.length)];
    const meat = MEAT_TYPES[Math.floor(Math.random() * MEAT_TYPES.length)];
    const sidesCount = Math.floor(Math.random() * 2) + 1; // 1-2 sides
    const sides = SIDES.sort(() => 0.5 - Math.random()).slice(0, sidesCount);
    const needsBeer = Math.random() > 0.3; // 70% chance of wanting beer
    const maxTime = 20 + Math.random() * 10; // 20-30 seconds

    return {
      id,
      name,
      order: { meat, sides, needsBeer },
      mood: "hungry",
      timeLeft: maxTime,
      maxTime,
    };
  }, []);

  // Add new friends periodically
  useEffect(() => {
    const addFriendInterval = setInterval(() => {
      if (friends.length < 3 && gameTime > 10) {
        setFriends(prev => [...prev, generateFriend()]);
      }
    }, 8000); // New friend every 8 seconds

    return () => clearInterval(addFriendInterval);
  }, [friends.length, gameTime, generateFriend]);

  // Add first friend immediately
  useEffect(() => {
    if (friends.length === 0) {
      setFriends([generateFriend()]);
    }
  }, [friends.length, generateFriend]);

  // Game timer
  useEffect(() => {
    if (gameTime <= 0) {
      onGameEnd({
        score,
        perfectCombos,
        angryFriends,
        happyFriends,
      });
      return;
    }

    const timer = setInterval(() => {
      setGameTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameTime, onGameEnd, score, perfectCombos, angryFriends, happyFriends]);

  // Update friend timers
  useEffect(() => {
    const friendTimer = setInterval(() => {
      setFriends(prev => prev.map(friend => {
        const newTimeLeft = friend.timeLeft - 1;
        
        if (newTimeLeft <= 0 && friend.mood !== "angry") {
          setAngryFriends(count => count + 1);
          return { ...friend, timeLeft: 0, mood: "angry" as const };
        }
        
        return { ...friend, timeLeft: newTimeLeft };
      }));
    }, 1000);

    return () => clearInterval(friendTimer);
  }, []);

  // Serve order to friend
  const serveFriend = (friendId: string) => {
    const friend = friends.find(f => f.id === friendId);
    if (!friend || friend.mood === "angry") return;

    const order = friend.order;
    let points = 0;
    let isCorrect = true;

    // Check meat
    if (selectedMeat === order.meat) {
      points += 50;
    } else {
      isCorrect = false;
    }

    // Check sides
    const hasAllSides = order.sides.every(side => selectedSides.includes(side));
    if (hasAllSides) {
      points += order.sides.length * 25;
    } else {
      isCorrect = false;
    }

    // Check beer
    if (order.needsBeer === hasBeer) {
      points += 30;
    } else {
      isCorrect = false;
    }

    // Time bonus
    const timeBonus = Math.floor((friend.timeLeft / friend.maxTime) * 50);
    points += timeBonus;

    // Perfect combo bonus
    if (isCorrect) {
      points += 100;
      setPerfectCombos(count => count + 1);
      setHappyFriends(count => count + 1);
    }

    setScore(score + points);

    // Remove served friend
    setFriends(prev => prev.filter(f => f.id !== friendId));

    // Clear selection
    setSelectedMeat("");
    setSelectedSides([]);
    setHasBeer(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen p-4">
      {/* Game Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-wrap items-center justify-between bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-fire/20">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-lg px-3 py-1">
              Tiempo: {formatTime(gameTime)}
            </Badge>
            <Badge className="bg-primary text-lg px-3 py-1">
              Puntos: {score}
            </Badge>
          </div>
          
          <div className="flex gap-4 text-sm">
            <span className="text-happy">😊 {happyFriends}</span>
            <span className="text-primary">🏆 {perfectCombos}</span>
            <span className="text-angry">😠 {angryFriends}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
        
        {/* Friends Panel */}
        <div className="lg:col-span-1">
          <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-fire/20">
            <h3 className="text-lg font-semibold mb-4 text-hungry">Amigos Hambrientos</h3>
            <div className="space-y-4">
              {friends.map(friend => (
                <FriendAvatar 
                  key={friend.id}
                  friend={friend}
                  onServe={() => serveFriend(friend.id)}
                  canServe={selectedMeat !== ""}
                />
              ))}
              {friends.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  Esperando amigos hambrientos...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Grill Area */}
          <GrillArea 
            selectedMeat={selectedMeat}
            selectedSides={selectedSides}
            hasBeer={hasBeer}
          />

          {/* Ingredient Selector */}
          <IngredientSelector 
            selectedMeat={selectedMeat}
            setSelectedMeat={setSelectedMeat}
            selectedSides={selectedSides}
            setSelectedSides={setSelectedSides}
            hasBeer={hasBeer}
            setHasBeer={setHasBeer}
          />

        </div>

      </div>
    </div>
  );
};