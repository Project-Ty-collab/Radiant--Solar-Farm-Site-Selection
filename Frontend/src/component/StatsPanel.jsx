import React from "react";
import { Sun, Ruler, Grid } from "lucide-react";

const StatsPanel = ({ sunshine, area, maxPanels }) => {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-4 w-72">
      <h3 className="text-lg font-semibold mb-3">🌞 Site Stats</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Sun className="text-yellow-500" />
          <span>Sunshine Hours/year</span>
          <strong>{sunshine}</strong>
        </div>
        <div className="flex items-center justify-between">
          <Ruler className="text-blue-500" />
          <span>Area (m²)</span>
          <strong>{area}</strong>
        </div>
        <div className="flex items-center justify-between">
          <Grid className="text-green-600" />
          <span>Max Panels</span>
          <strong>{maxPanels}</strong>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
