// ColorLegend.jsx

import { useRisk } from "./riskContext";
export default function ColorLegend() {
  const { selectedRisks, riskLevels } = useRisk();

  const colors = {
    low: "#ffeda0",
    medium: "#feb24c",
    high: "#f03b20",
  };

  const levelNames = {
    low: "Низкий",
    medium: "Средний",
    high: "Высокий",
  };

  return (
    <div className="fixed right-4 top-20 bg-white p-4 rounded-xl shadow-lg z-10">
      <h3 className="font-bold mb-2">Уровни риска</h3>
      {Object.entries(colors).map(([level, color]) => (
        <div key={level} className="flex items-center gap-2 mb-1">
          <div style={{ backgroundColor: color }} className="w-4 h-4" />
          <span className="capitalize">{levelNames[level]} Риск</span>
        </div>
      ))}
    </div>
  );
}
