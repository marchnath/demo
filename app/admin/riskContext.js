// RiskContext.js
"use client";
import { createContext, useState, useContext } from "react";

const RiskContext = createContext();

export function RiskProvider({ children }) {
  const [selectedRisks, setSelectedRisks] = useState([]);
  const [riskLevels, setRiskLevels] = useState({});

  return (
    <RiskContext.Provider
      value={{ selectedRisks, setSelectedRisks, riskLevels, setRiskLevels }}
    >
      {children}
    </RiskContext.Provider>
  );
}

export const useRisk = () => useContext(RiskContext);
