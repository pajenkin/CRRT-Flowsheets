// src/protocols/Shock.ts

import { ProtocolResult } from '../types/ProtocolResult';
import { roundTo } from '../utils/rounding';
import { getParamsForWeight, findEffluentIndex, findAlbuminIndex } from '../utils/lookup';

/**
 * Calculates CRRT flow values for Shock protocol.
 * @param weight Patient weight in kg.
 * @param albumin Patient albumin in g/dL.
 * @returns Calculated ProtocolResult object.
 */

// Constants for Shock Table
const ShockTable = [
  { weight: 50, BFR: 50, ACDA: 125, DFR: 1250, RFR: 500 },
  { weight: 60, BFR: 60, ACDA: 150, DFR: 1500, RFR: 600 },
  { weight: 70, BFR: 70, ACDA: 175, DFR: 1750, RFR: 700 },
  { weight: 80, BFR: 80, ACDA: 200, DFR: 2000, RFR: 800 },
  { weight: 90, BFR: 90, ACDA: 225, DFR: 2250, RFR: 900 },
  { weight: 100, BFR: 100, ACDA: 250, DFR: 2500, RFR: 1000 },
  { weight: 110, BFR: 110, ACDA: 375, DFR: 2750, RFR: 1100 },
  { weight: 120, BFR: 120, ACDA: 300, DFR: 3000, RFR: 1200 },
  { weight: 130, BFR: 130, ACDA: 300, DFR: 3250, RFR: 1300 },
  { weight: 140, BFR: 140, ACDA: 300, DFR: 3500, RFR: 1400 },
  { weight: 150, BFR: 150, ACDA: 300, DFR: 3750, RFR: 1500 }
];

// Calcium Dosing Table
const calciumTableS = [
  { effluent: 2100, CalciumDose: [28,29,30,31,32,32,33,34,35,36] },
  { effluent: 2500, CalciumDose: [34,35,36,37,38,39,40,41,42,43] },
  { effluent: 2850, CalciumDose: [39,41,42,43,44,45,47,48,49,50] },
  { effluent: 3250, CalciumDose: [45,47,48,50,51,52,53,55,55,57] },
  { effluent: 3650, CalciumDose: [51,52,54,56,57,58,60,61,62,64] },
  { effluent: 4000, CalciumDose: [56,58,60,62,63,65,67,68,69,71] },
  { effluent: 4400, CalciumDose: [62,64,66,68,69,71,73,75,76,78] },
  { effluent: 4750, CalciumDose: [68,70,72,74,75,78,80,82,83,85] },
  { effluent: 5150, CalciumDose: [72,74,77,79,81,83,85,87,89,91] },
  { effluent: 5500, CalciumDose: [76,78,81,84,85,88,90,92,94,97] },
  { effluent: 5850, CalciumDose: [79,82,85,87,90,92,94,97,99,101] }
];

export function calculateShockProtocol(weight: number, albumin: number): ProtocolResult {
    // Helper to get parameters based on weight
    // function getParamsForWeight(weight: number, table: { weight: number; BFR: number; ACDA: number; DFR: number; RFR: number; }[]) {
    //     if (weight >= 150) {
    //     return table.find(row => row.weight >= 150);
    //     } else if (weight <= 50) {
    //     return table.find(row => row.weight <= 50);
    //     } else {
    //     const roundedWeight = Math.ceil(weight / 10) * 10;
    //     return table.find(row => row.weight === roundedWeight);
    //     }
    // }
    
    const ptParams = getParamsForWeight(weight, ShockTable);
  
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