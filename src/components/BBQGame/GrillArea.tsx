import bbqGrill from "@/assets/bbq-grill.jpg";

interface GrillAreaProps {
  selectedMeat: string;
  selectedSides: string[];
  hasBeer: boolean;
}

export const GrillArea = ({ selectedMeat, selectedSides, hasBeer }: GrillAreaProps) => {
  return (
    <div className="bg-gradient-premium/5 backdrop-blur-sm rounded-lg p-6 border border-secondary/30 shadow-premium">
      
      {/* Grill Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl animate-flame-dance">🔥</span>
        <h3 className="text-2xl font-playfair font-bold text-primary">Parrilla Premium Encendida</h3>
        <span className="text-3xl animate-flame-dance" style={{ animationDelay: '0.5s' }}>🔥</span>
      </div>

      {/* Grill Visual */}
      <div className="relative mb-6">
        <div className="relative overflow-hidden rounded-lg border-4 border-grill shadow-fire">
          <img 
            src={bbqGrill} 
            alt="Parrilla BBQ" 
            className="w-full h-64 object-cover"
          />
          
          {/* Overlay effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Flames */}
          <div className="absolute bottom-0 left-1/4 w-8 h-12 bg-gradient-fire rounded-full blur-sm animate-flame-dance opacity-80"></div>
          <div className="absolute bottom-0 right-1/4 w-8 h-12 bg-gradient-fire rounded-full blur-sm animate-flame-dance opacity-80" style={{ animationDelay: '0.7s' }}></div>
          <div className="absolute bottom-0 left-1/2 w-10 h-16 bg-gradient-fire rounded-full blur-sm animate-flame-dance opacity-90" style={{ animationDelay: '0.3s' }}></div>
          
          {/* Smoke effect */}
          <div className="absolute top-4 left-1/3 w-16 h-16 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-8 right-1/3 w-12 h-12 bg-white/10 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>

          {/* Cooking items */}
          {selectedMeat && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-meat-cooked rounded-lg p-3 shadow-lg border-2 border-grill animate-sizzle">
                <span className="text-2xl">🥩</span>
                <div className="text-xs text-white font-semibold mt-1">{selectedMeat}</div>
              </div>
            </div>
          )}

          {selectedSides.length > 0 && (
            <div className="absolute top-1/4 left-1/4 space-y-1">
              {selectedSides.map((side, index) => (
                <div 
                  key={side}
                  className="bg-vegetables rounded p-2 shadow-md border border-grill-light animate-sizzle"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <span className="text-sm">🥗</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Grill Status */}
        <div className="absolute -top-2 -right-2 bg-fire text-white rounded-full p-2 shadow-fire animate-glow-pulse">
          <span className="text-lg">🔥</span>
        </div>
      </div>

      {/* Cooking Status */}
      <div className="bg-grill/10 rounded-lg p-4 border border-grill/20">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-grill">Estado de la Parrilla</h4>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-fire rounded-full animate-pulse"></div>
            <span className="text-sm text-fire font-medium">Encendida</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className={`text-2xl transition-all ${selectedMeat ? 'animate-bounce-in' : 'opacity-50'}`}>
              🥩
            </div>
            <div className="text-xs text-muted-foreground">
              {selectedMeat || "Sin carne"}
            </div>
          </div>

          <div className="space-y-1">
            <div className={`text-2xl transition-all ${selectedSides.length > 0 ? 'animate-bounce-in' : 'opacity-50'}`}>
              🥗
            </div>
            <div className="text-xs text-muted-foreground">
              {selectedSides.length > 0 ? `${selectedSides.length} complementos` : "Sin complementos"}
            </div>
          </div>

          <div className="space-y-1">
            <div className={`text-2xl transition-all ${hasBeer ? 'animate-bounce-in' : 'opacity-50'}`}>
              🍺
            </div>
            <div className="text-xs text-muted-foreground">
              {hasBeer ? "Cerveza fría" : "Sin bebida"}
            </div>
          </div>
        </div>

        {/* Cooking Tips */}
        <div className="mt-4 p-3 bg-fire/10 rounded border border-fire/20">
          <p className="text-sm text-fire text-center">
            💡 <strong>Tip:</strong> {
              !selectedMeat ? "Selecciona un corte premium para empezar" :
              selectedSides.length === 0 ? "Añade complementos para una comida completa" :
              !hasBeer ? "Una cerveza fría completa la experiencia" :
              "¡Perfecto! Listo para servir a tus amigos"
            }
          </p>
        </div>
      </div>

    </div>
  );
};