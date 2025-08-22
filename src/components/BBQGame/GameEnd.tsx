import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameStats } from "./BBQGame";

interface GameEndProps {
  stats: GameStats;
  onRestart: () => void;
}

export const GameEnd = ({ stats, onRestart }: GameEndProps) => {
  const getMasterLevel = (score: number) => {
    if (score >= 1500) return { title: "¡Maestro Supremo!", emoji: "👑", color: "text-yellow-400" };
    if (score >= 1000) return { title: "¡Maestro Parrillero!", emoji: "🏆", color: "text-primary" };
    if (score >= 500) return { title: "¡Buen Asador!", emoji: "🥉", color: "text-vegetables" };
    return { title: "¡Sigue Practicando!", emoji: "🔥", color: "text-fire" };
  };

  const level = getMasterLevel(stats.score);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Achievement Badge */}
        <div className="flex justify-center mb-6">
          <div className={`text-8xl ${level.color} animate-bounce-in`}>
            {level.emoji}
          </div>
        </div>

        {/* Results Title */}
        <div className="space-y-4">
          <h1 className={`text-4xl md:text-6xl font-bold ${level.color} animate-bounce-in`}>
            {level.title}
          </h1>
          <p className="text-xl text-muted-foreground animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            ¡Has terminado tu turno en la parrilla!
          </p>
        </div>

        {/* Score Display */}
        <div className="bg-card/90 backdrop-blur-sm rounded-xl p-8 border border-fire/20 animate-bounce-in" style={{ animationDelay: '0.4s' }}>
          <div className="text-6xl font-bold text-primary mb-4">
            {stats.score}
          </div>
          <p className="text-lg text-muted-foreground">Puntuación Final</p>
        </div>

        {/* Detailed Stats */}
        <div className="grid md:grid-cols-3 gap-4 animate-bounce-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-happy/20">
            <div className="text-4xl text-happy mb-2">😊</div>
            <div className="text-2xl font-bold text-happy">{stats.happyFriends}</div>
            <p className="text-sm text-muted-foreground">Amigos Felices</p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <div className="text-4xl text-primary mb-2">🏆</div>
            <div className="text-2xl font-bold text-primary">{stats.perfectCombos}</div>
            <p className="text-sm text-muted-foreground">Combos Perfectos</p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-angry/20">
            <div className="text-4xl text-angry mb-2">😠</div>
            <div className="text-2xl font-bold text-angry">{stats.angryFriends}</div>
            <p className="text-sm text-muted-foreground">Amigos Enojados</p>
          </div>
        </div>

        {/* Performance Message */}
        <div className="bg-gradient-fire rounded-lg p-6 text-white animate-bounce-in" style={{ animationDelay: '0.8s' }}>
          {stats.score >= 1000 ? (
            <p className="text-lg">
              ¡Increíble! Tienes el talento natural de un verdadero maestro parrillero. 
              Los cortes premium de Dr. Cortes son perfectos para tus habilidades.
            </p>
          ) : stats.score >= 500 ? (
            <p className="text-lg">
              ¡Buen trabajo! Con un poco más de práctica y los mejores cortes de 
              Dr. Cortes, serás todo un maestro parrillero.
            </p>
          ) : (
            <p className="text-lg">
              ¡No te rindas! Incluso los mejores parrilleros empezaron desde cero. 
              Visita Dr. Cortes para conseguir la mejor carne y seguir practicando.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in" style={{ animationDelay: '1s' }}>
          <Button 
            onClick={onRestart}
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            🔥 Jugar de Nuevo
          </Button>
          
          <Button 
            size="lg"
            className="bg-gradient-fire text-white font-bold shadow-fire hover:scale-105 transition-transform"
            onClick={() => window.open('https://drcortes.com', '_blank')}
          >
            🥩 Visitar Dr. Cortes Carnicería
          </Button>
        </div>

        {/* Share Results */}
        <div className="text-sm text-muted-foreground animate-bounce-in" style={{ animationDelay: '1.2s' }}>
          <p>
            Comparte tu puntuación: <span className="text-primary font-semibold">#{stats.score}</span> en el 
            <span className="text-fire font-semibold"> Maestro Parrillero Challenge</span>
          </p>
        </div>

        {/* Dr. Cortes Branding */}
        <div className="border-t border-fire/20 pt-6 animate-bounce-in" style={{ animationDelay: '1.4s' }}>
          <p className="text-lg font-semibold text-primary mb-2">Dr. Cortes Carnicería</p>
          <p className="text-sm text-muted-foreground">
            Los mejores cortes premium para verdaderos maestros parrilleros
          </p>
        </div>

      </div>
    </div>
  );
};