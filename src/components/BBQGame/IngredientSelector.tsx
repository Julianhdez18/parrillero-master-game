import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface IngredientSelectorProps {
  selectedMeat: string;
  setSelectedMeat: (meat: string) => void;
  selectedSides: string[];
  setSelectedSides: (sides: string[]) => void;
  hasBeer: boolean;
  setHasBeer: (hasBeer: boolean) => void;
}

const MEAT_TYPES = [
  { name: "Rib Eye", emoji: "🥩", description: "Premium corte" },
  { name: "Arrachera", emoji: "🍖", description: "Tradicional" },
  { name: "Costilla", emoji: "🍗", description: "Jugosa" },
  { name: "T-Bone", emoji: "🥩", description: "Clásico" }
];

const SIDES = [
  { name: "Cebollitas", emoji: "🧅", description: "Asadas" },
  { name: "Nopales", emoji: "🌵", description: "Frescos" },
  { name: "Queso", emoji: "🧀", description: "Derretido" },
  { name: "Salchicha", emoji: "🌭", description: "Extra" }
];

export const IngredientSelector = ({ 
  selectedMeat, 
  setSelectedMeat, 
  selectedSides, 
  setSelectedSides,
  hasBeer,
  setHasBeer 
}: IngredientSelectorProps) => {
  
  const toggleSide = (side: string) => {
    if (selectedSides.includes(side)) {
      setSelectedSides(selectedSides.filter(s => s !== side));
    } else {
      setSelectedSides([...selectedSides, side]);
    }
  };

  const clearSelection = () => {
    setSelectedMeat("");
    setSelectedSides([]);
    setHasBeer(false);
  };

  return (
    <div className="bg-card/90 backdrop-blur-sm rounded-lg p-6 border border-fire/20">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Selecciona Ingredientes</h3>
        {(selectedMeat || selectedSides.length > 0 || hasBeer) && (
          <Button 
            onClick={clearSelection}
            variant="outline"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            🗑️ Limpiar
          </Button>
        )}
      </div>

      {/* Current Selection */}
      {(selectedMeat || selectedSides.length > 0 || hasBeer) && (
        <div className="mb-6 p-4 bg-gradient-fire/10 rounded-lg border border-fire/20">
          <h4 className="text-sm font-medium text-fire mb-2">Selección Actual:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedMeat && (
              <Badge className="bg-meat text-white">
                🥩 {selectedMeat}
              </Badge>
            )}
            {selectedSides.map(side => (
              <Badge key={side} className="bg-vegetables text-white">
                🥗 {side}
              </Badge>
            ))}
            {hasBeer && (
              <Badge className="bg-beer text-white">
                🍺 Cerveza
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Meat Selection */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-meat mb-3">Cortes Premium</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {MEAT_TYPES.map(meat => (
            <Button
              key={meat.name}
              onClick={() => setSelectedMeat(meat.name)}
              variant={selectedMeat === meat.name ? "default" : "outline"}
              className={`h-auto p-4 flex flex-col items-center space-y-2 transition-all ${
                selectedMeat === meat.name 
                  ? "bg-meat text-white border-meat shadow-lg scale-105" 
                  : "hover:border-meat hover:bg-meat/10"
              }`}
            >
              <span className="text-2xl">{meat.emoji}</span>
              <div className="text-center">
                <div className="font-semibold text-sm">{meat.name}</div>
                <div className="text-xs opacity-70">{meat.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Sides Selection */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-vegetables mb-3">Complementos</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SIDES.map(side => (
            <Button
              key={side.name}
              onClick={() => toggleSide(side.name)}
              variant={selectedSides.includes(side.name) ? "default" : "outline"}
              className={`h-auto p-4 flex flex-col items-center space-y-2 transition-all ${
                selectedSides.includes(side.name)
                  ? "bg-vegetables text-white border-vegetables shadow-lg scale-105"
                  : "hover:border-vegetables hover:bg-vegetables/10"
              }`}
            >
              <span className="text-2xl">{side.emoji}</span>
              <div className="text-center">
                <div className="font-semibold text-sm">{side.name}</div>
                <div className="text-xs opacity-70">{side.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Beer Selection */}
      <div>
        <h4 className="text-lg font-semibold text-beer mb-3">Bebida</h4>
        <Button
          onClick={() => setHasBeer(!hasBeer)}
          variant={hasBeer ? "default" : "outline"}
          className={`h-auto p-4 flex items-center space-x-3 transition-all ${
            hasBeer 
              ? "bg-beer text-white border-beer shadow-lg scale-105" 
              : "hover:border-beer hover:bg-beer/10"
          }`}
        >
          <span className="text-3xl">🍺</span>
          <div className="text-left">
            <div className="font-semibold">Cerveza Fría</div>
            <div className="text-xs opacity-70">Perfecta para acompañar</div>
          </div>
          {hasBeer && (
            <span className="ml-auto text-lg">✓</span>
          )}
        </Button>
      </div>

    </div>
  );
};