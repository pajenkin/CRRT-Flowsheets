// src/protocols/NonShock.ts

import { ProtocolResult } from '../types/ProtocolResult';
import { getParamsForWeight, findEffluentIndex, findAlbuminIndex } from '../utils/lookup';

// Constants for NonShock Table (adjust these values as needed)
const NonShockTable = [
  { weight: 50, BFR: 45, ACDA: 110, DFR: 1100, RFR: 450 },
  { weight: 60, BFR: 54, ACDA: 132, DFR: 1320, RFR: 540 },
  { weight: 70, BFR: 63, ACDA: 154, DFR: 1540, RFR: 630 },
  { weight: 80, BFR: 72, ACDA: 176, DFR: 1760, RFR: 720 },
  { weight: 90, BFR: 81, ACDA: 198, DFR: 1980, RFR: 810 },
  { weight: 100, BFR: 90, ACDA: 220, DFR: 2200, RFR: 900 },
  { weight: 110, BFR: 99, ACDA: 242, DFR: 2420, RFR: 990 },
  { weight: 120, BFR: 108, ACDA: 264, DFR: 2640, RFR: 1080 },
  { weight: 130, BFR: 117, ACDA: 286, DFR: 2860, RFR: 1170 },
  { weight: 140, BFR: 126, ACDA: 308, DFR: 3080, RFR: 1260 },
  { weight: 150, BFR: 135, ACDA: 330, DFR: 3300, RFR: 1350 }
];

// Calcium Dosing Table (same shape as Shock but values may differ)
const calciumTableS = [
  { effluent: 2000, CalciumDose: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34] },
  { effluent: 2400, CalciumDose: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39] },
  { effluent: 2800, CalciumDose: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44] },
  { effluent: 3200, CalciumDose: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49] },
  { effluent: 3600, CalciumDose: [45, 46, 47, 48, 49, 50, 51, 52, 53, 54] },
  { effluent: 4000, CalciumDose: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59] },
  { effluent: 4400, CalciumDose: [55, 56, 57, 58, 59, 60, 61, 62, 63, 64] },
  { effluent: 4800, CalciumDose: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69] },
  { effluent: 5200, CalciumDose: [65, 66, 67, 68, 69, 70, 71, 72, 73, 74] },
  { effluent: 5600, CalciumDose: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79] },
  { effluent: 6000, CalciumDose: [75, 76, 77, 78, 79, 80, 81, 82, 83, 84] }
];
export function calculateNonShockProtocol(weight: number, albumin: number): ProtocolResult {
  // Helper to get parameters based on weight
  function getParamsForWeight(weight: number, table: { weight: number; BFR: number; ACDA: number; DFR: number; RFR: number; }[]) {
    if (weight >= 150) {
      return table.find(row => row.weight >= 150);
    } else if (weight <= 50) {
      return table.find(row => row.weight <= 50);
    } else {
      const roundedWeight = Math.ceil(weight / 10) * 10;
      return table.find(row => row.weight === roundedWeight);
    }
  }
  
  const ptParams = getParamsForWeight(weight, NonShockTable);

  if (!ptParams) {
    throw new Error('Invalid weight. Must be between 50 and 150 kg.');
  }

  const effluent = ptParams.BFR + ptParams.ACDA + ptParams.DFR + ptParams.RFR + 100;

  const effluentSteps = calciumTableS.map(e => e.effluent);
  const albuminThresholds = [0.7, 1.1, 1.5, 1.9, 2.3, 2.7, 3.1, 3.5, 3.9, 4.3];

  const effluentIndex = findEffluentIndex(effluent, effluentSteps);
  const albuminIndex = findAlbuminIndex(albumin, albuminThresholds);

  const calciumDose = calciumTableS[effluentIndex]?.CalciumDose[albuminIndex] ?? 0;

  return {
    BFR: ptParams.BFR,
    DFR: ptParams.DFR,
    ACDA: ptParams.ACDA,
    RFR: ptParams.RFR,
    effluent,
    calciumDose
  };
}