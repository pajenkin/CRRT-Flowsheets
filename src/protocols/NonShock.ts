// src/protocols/NonShock.ts

import { ProtocolResult } from '../types/ProtocolResult';
import { getParamsForWeight, findEffluentIndex, findAlbuminIndex, calculateEffluent } from '../utils/lookup';
import {
  effluentStepsNonShock,
  calciumTableNS,
  NonShockTable
} from '../constants/nonShockConstants';


export function calculateNonShockProtocol(weight: number, albumin: number): ProtocolResult {
  const ptParams = getParamsForWeight(weight, NonShockTable);

  if (!ptParams) {
    throw new Error('Invalid weight. Must be between 50 and 150 kg.');
  }

  //const effluent = ptParams.BFR + ptParams.ACDA + ptParams.DFR + ptParams.RFR + 100;
  const effluent = calculateEffluent(ptParams);
  const effIndex = findEffluentIndex(effluent, effluentStepsNonShock);
  const albIndex = findAlbuminIndex(albumin);
  
  const calciumDose = calciumTableNS[effIndex].CalciumDose[albIndex];
  
  return {
    BFR: ptParams.BFR,
    DFR: ptParams.DFR,
    ACDA: ptParams.ACDA,
    RFR: ptParams.RFR,
    effluent,
    calciumDose,
    weight,
  };
}