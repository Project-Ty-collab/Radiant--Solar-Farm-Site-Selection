import React from "react";

const EnergyPanel = ({ panelCount, onPanelChange, yearlyEnergy }) => {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-4 w-72">
      <h3 className="text-lg font-semibold mb-3">⚡ Energy Estimation</h3>
      <p className="text-xl font-bold text-green-600 mb-2">
        {yearlyEnergy} kWh/year
      </p>
      <div className="mb-2">
        <label className="text-sm">Panel Count: {panelCount}</label>
        <input
          type="range"
          min="10"
          max="100"
          value={panelCount}
          onChange={(e) => onPanelChange(Number(e.target.value))}
          className="w-full accent-green-600"
        />
      </div>
    </div>
  );
};

export default EnergyPanel;
