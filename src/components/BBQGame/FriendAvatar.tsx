import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Friend } from "./BBQGame";

interface FriendAvatarProps {
  friend: Friend;
  onServe: () => void;
  canServe: boolean;
}

const getMoodEmoji = (mood: Friend['mood']) => {
  switch (mood) {
    case "hungry": return "😋";
    case "happy": return "😊";
    case "angry": return "😠";
    default: return "😋";
  }
};

const getMoodColor = (mood: Friend['mood']) => {
  switch (mood) {
    case "hungry": return "text-hungry";
    case "happy": return "text-happy";
    case "angry": return "text-angry";
    default: return "text-hungry";
  }
};

export const FriendAvatar = ({ friend, onServe, canServe }: FriendAvatarProps) => {
  const timePercentage = (friend.timeLeft / friend.maxTime) * 100;
  
  const getProgressColor = () => {
    if (timePercentage > 60) return "bg-happy";
    if (timePercentage > 30) return "bg-warning";
    return "bg-angry";
  };

  return (
    <div className={`bg-card border rounded-lg p-4 transition-all duration-300 ${
      friend.mood === "angry" ? "border-angry animate-shake" : 
      friend.mood === "happy" ? "border-happy" : 
      "border-hungry hover:border-fire"
    }`}>
      
      {/* Friend Info */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`text-3xl ${getMoodColor(friend.mood)} transition-all`}>
          {getMoodEmoji(friend.mood)}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{friend.name}</h4>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {friend.mood === "angry" ? "¡Enojado!" : 
               friend.timeLeft <= 5 ? "¡Apúrate!" : 
               "Esperando..."}
            </span>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-meat">🥩</span>
          <span className="text-sm font-medium">{friend.order.meat}</span>
        </div>
        
        {friend.order.sides.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-vegetables">🥗</span>
            <span className="text-sm text-muted-foreground">
              {friend.order.sides.join(", ")}
            </span>
          </div>
        )}
        
        {friend.order.needsBeer && (
          <div className="flex items-center gap-2">
            <span className="text-beer">🍺</span>
            <span className="text-sm text-muted-foreground">Cerveza fría</span>
          </div>
        )}
      </div>

      {/* Time Progress */}
      {friend.mood !== "angry" && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Tiempo</span>
            <span className={timePercentage <= 25 ? "text-angry" : "text-muted-foreground"}>
              {friend.timeLeft}s
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor()}`}
              style={{ width: `${timePercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Serve Button */}
      <Button 
        onClick={onServe}
        disabled={!canServe || friend.mood === "angry"}
        size="sm"
        className={`w-full ${
          friend.mood === "angry" 
            ? "bg-muted text-muted-foreground cursor-not-allowed" 
            : canServe 
              ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
              : "bg-muted text-muted-foreground"
        }`}
      >
        {friend.mood === "angry" ? "😠 Muy tarde" : 
         canServe ? "🍽️ Servir" : "Selecciona comida"}
      </Button>
    </div>
  );
};