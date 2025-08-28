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
              alt="Maestro Parrillero Dr. Cortes" 
              className="w-36 h-36 rounded-full border-4 border-secondary shadow-premium animate-bounce-in"
            />
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary rounded-full animate-glow-pulse border-2 border-secondary"></div>
          </div>
        </div>

        {/* Game Title */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-playfair font-black text-primary animate-bounce-in">
            Maestro Parrillero
          </h1>
          <h2 className="text-3xl md:text-4xl font-crimson font-bold text-secondary animate-bounce-in tracking-wide" style={{ animationDelay: '0.2s' }}>
            Dr. Cortes
          </h2>
        </div>

        {/* Game Description */}
        <div className="space-y-4 text-muted-foreground max-w-lg mx-auto animate-bounce-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-lg font-inter">
            ¡Conviértete en el mejor <span className="text-primary font-semibold">Maestro Parrillero</span>! Elige cortes premium, 
            añade complementos deliciosos y sirve cervezas frías.
          </p>
          <p className="text-md font-inter">
            Atiende a tus amigos hambrientos antes de que se enojen. 
            ¡Más rápido = más puntos!
          </p>
        </div>

        {/* Game Instructions */}
        <div className="grid md:grid-cols-3 gap-4 text-sm animate-bounce-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-premium/10 backdrop-blur-sm rounded-lg p-4 border border-primary/30">
            <div className="text-primary text-3xl mb-2">🥩</div>
            <h3 className="font-playfair font-bold text-meat">Cortes Premium</h3>
            <p className="text-muted-foreground font-inter">Rib eye, arrachera, costilla de calidad</p>
          </div>
          
          <div className="bg-gradient-premium/10 backdrop-blur-sm rounded-lg p-4 border border-secondary/30">
            <div className="text-vegetables text-3xl mb-2">🧅</div>
            <h3 className="font-playfair font-bold text-vegetables">Complementos</h3>
            <p className="text-muted-foreground font-inter">Cebollitas, nopales, queso mexicano</p>
          </div>
          
          <div className="bg-gradient-premium/10 backdrop-blur-sm rounded-lg p-4 border border-secondary/30">
            <div className="text-secondary text-3xl mb-2">🍺</div>
            <h3 className="font-playfair font-bold text-secondary">Cerveza Fría</h3>
            <p className="text-muted-foreground font-inter">Perfecta para acompañar</p>
          </div>
        </div>

        {/* Start Button */}
        <div className="animate-bounce-in" style={{ animationDelay: '0.8s' }}>
          <Button 
            onClick={onStart}
            variant="premium"
            size="lg"
            className="font-playfair font-bold text-xl px-10 py-4 border border-secondary/50 hover:shadow-glow active:scale-95 transition-all duration-200"
          >
            ¡Empezar a Asar! 🔥
          </Button>
        </div>

        {/* Dr. Cortes Branding */}
        <div className="text-sm text-muted-foreground animate-bounce-in font-inter" style={{ animationDelay: '1s' }}>
          Una experiencia premium de <span className="text-secondary font-semibold">Dr. Cortes Carnicería</span>
        </div>

      </div>
    </div>
  );
};