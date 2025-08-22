import { Button } from "@/components/ui/button";
import chefAvatar from "@/assets/chef-avatar.jpg";

interface GameStartProps {
  onStart: () => void;
}

export const GameStart = ({ onStart }: GameStartProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Chef Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img 
              src={chefAvatar} 
              alt="Maestro Parrillero" 
              className="w-32 h-32 rounded-full border-4 border-fire shadow-fire animate-bounce-in"
            />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-fire rounded-full animate-glow-pulse"></div>
          </div>
        </div>

        {/* Game Title */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-primary animate-bounce-in">
            Maestro Parrillero
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-fire animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            Dr. Cortes
          </h2>
        </div>

        {/* Game Description */}
        <div className="space-y-4 text-muted-foreground max-w-lg mx-auto animate-bounce-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-lg">
            ¡Conviértete en el mejor parrillero! Elige cortes premium, 
            añade complementos deliciosos y sirve cervezas frías.
          </p>
          <p className="text-md">
            Atiende a tus amigos hambrientos antes de que se enojen. 
            ¡Más rápido = más puntos!
          </p>
        </div>

        {/* Game Instructions */}
        <div className="grid md:grid-cols-3 gap-4 text-sm animate-bounce-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-fire/20">
            <div className="text-fire text-2xl mb-2">🥩</div>
            <h3 className="font-semibold text-meat">Selecciona Cortes</h3>
            <p className="text-muted-foreground">Rib eye, arrachera, costilla premium</p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-vegetables/20">
            <div className="text-vegetables text-2xl mb-2">🧅</div>
            <h3 className="font-semibold text-vegetables">Añade Complementos</h3>
            <p className="text-muted-foreground">Cebollitas, nopales, queso</p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-beer/20">
            <div className="text-beer text-2xl mb-2">🍺</div>
            <h3 className="font-semibold text-beer">Sirve Cervezas</h3>
            <p className="text-muted-foreground">Bien frías para acompañar</p>
          </div>
        </div>

        {/* Start Button */}
        <div className="animate-bounce-in" style={{ animationDelay: '0.8s' }}>
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-gradient-fire text-white font-bold text-xl px-8 py-4 shadow-fire hover:scale-105 transition-transform"
          >
            ¡Empezar a Asar! 🔥
          </Button>
        </div>

        {/* Dr. Cortes Branding */}
        <div className="text-sm text-muted-foreground animate-bounce-in" style={{ animationDelay: '1s' }}>
          Una experiencia de <span className="text-primary font-semibold">Dr. Cortes Carnicería</span>
        </div>

      </div>
    </div>
  );
};