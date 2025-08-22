import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameStats } from "./BBQGame";

interface GameEndProps {
  stats: GameStats;
  onRestart: () => void;
}

export const GameEnd = ({ stats, onRestart }: GameEndProps) => {
  const getMasterLevel = (score: number) => {
    if (score >= 1500) return { title: "¡Gran Maestro Parrillero!", emoji: "👑", color: "text-secondary" };
    if (score >= 1000) return { title: "¡Maestro Parrillero!", emoji: "🏆", color: "text-primary" };
    if (score >= 500) return { title: "¡Parrillero Experto!", emoji: "🥇", color: "text-secondary" };
    return { title: "¡Aprendiz de Parrilla!", emoji: "🔥", color: "text-primary" };
  };

  const level = getMasterLevel(stats.score);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Achievement Badge */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full bg-gradient-premium flex items-center justify-center animate-bounce-in shadow-premium border-4 border-secondary">
            <div className={`text-6xl ${level.color}`}>
              {level.emoji}
            </div>
          </div>
        </div>

        {/* Results Title */}
        <div className="space-y-4">
          <h1 className={`text-4xl md:text-6xl font-playfair font-black ${level.color} animate-bounce-in`}>
            {level.title}
          </h1>
          <p className="text-xl font-inter text-muted-foreground animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            ¡Has terminado tu turno en la parrilla premium!
          </p>
        </div>

        {/* Score Display */}
        <div className="bg-gradient-premium/10 backdrop-blur-sm rounded-xl p-8 border border-secondary/30 animate-bounce-in" style={{ animationDelay: '0.4s' }}>
          <div className="text-7xl font-crimson font-bold text-primary mb-4">
            {stats.score}
          </div>
          <p className="text-lg font-inter text-muted-foreground">Puntuación Final</p>
        </div>

        {/* Detailed Stats */}
        <div className="grid md:grid-cols-3 gap-4 animate-bounce-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-premium/5 backdrop-blur-sm rounded-lg p-6 border border-happy/30">
            <div className="text-4xl text-happy mb-2">😊</div>
            <div className="text-3xl font-bold text-happy">{stats.happyFriends}</div>
            <p className="text-sm font-inter text-muted-foreground">Amigos Felices</p>
          </div>
          
          <div className="bg-gradient-premium/5 backdrop-blur-sm rounded-lg p-6 border border-secondary/30">
            <div className="text-4xl text-secondary mb-2">🏆</div>
            <div className="text-3xl font-bold text-secondary">{stats.perfectCombos}</div>
            <p className="text-sm font-inter text-muted-foreground">Combos Perfectos</p>
          </div>
          
          <div className="bg-gradient-premium/5 backdrop-blur-sm rounded-lg p-6 border border-angry/30">
            <div className="text-4xl text-angry mb-2">😠</div>
            <div className="text-3xl font-bold text-angry">{stats.angryFriends}</div>
            <p className="text-sm font-inter text-muted-foreground">Amigos Enojados</p>
          </div>
        </div>

        {/* Performance Message */}
        <div className="bg-gradient-premium rounded-lg p-6 text-white animate-bounce-in" style={{ animationDelay: '0.8s' }}>
          {stats.score >= 1000 ? (
            <p className="text-lg font-inter">
              ¡Increíble! Tienes el talento natural de un verdadero maestro parrillero. 
              Los cortes premium de <span className="font-bold">Dr. Cortes</span> son perfectos para tus habilidades.
            </p>
          ) : stats.score >= 500 ? (
            <p className="text-lg font-inter">
              ¡Buen trabajo! Con un poco más de práctica y los mejores cortes de 
              <span className="font-bold">Dr. Cortes</span>, serás todo un maestro parrillero.
            </p>
          ) : (
            <p className="text-lg font-inter">
              ¡No te rindas! Incluso los mejores parrilleros empezaron desde cero. 
              Visita <span className="font-bold">Dr. Cortes</span> para conseguir la mejor carne y seguir practicando.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in" style={{ animationDelay: '1s' }}>
          <Button 
            onClick={onRestart}
            size="lg"
            className="bg-primary text-white font-playfair font-bold shadow-premium hover:scale-105 transition-transform border border-primary/50"
          >
            🔥 Jugar de Nuevo
          </Button>
          
          <Button 
            size="lg"
            className="bg-gradient-premium text-white font-playfair font-bold shadow-premium hover:scale-105 transition-transform border border-secondary/50"
            onClick={() => window.open('https://www.instagram.com/dr.cortes_mx/', '_blank')}
          >
            🥩 Visitar Dr. Cortes
          </Button>
        </div>

        {/* Share Results */}
        <div className="text-sm text-muted-foreground animate-bounce-in font-inter" style={{ animationDelay: '1.2s' }}>
          <p>
            Comparte tu puntuación: <span className="text-secondary font-semibold">#{stats.score}</span> en el 
            <span className="text-primary font-semibold"> Maestro Parrillero Challenge</span>
          </p>
        </div>

        {/* Dr. Cortes Branding */}
        <div className="border-t border-secondary/20 pt-6 animate-bounce-in" style={{ animationDelay: '1.4s' }}>
          <p className="text-xl font-playfair font-bold text-primary mb-2">Dr. Cortes Carnicería</p>
          <p className="text-sm font-inter text-muted-foreground">
            Los mejores cortes premium para verdaderos maestros parrilleros
          </p>
        </div>

      </div>
    </div>
  );
};