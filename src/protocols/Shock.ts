// src/protocols/Shock.ts

import { ProtocolResult } from '../types/ProtocolResult';
import { getParamsForWeight, findEffluentIndex, findAlbuminIndex, calculateEffluent } from '../utils/lookup';

import {
    effluentStepsShock,
    shockTable,
    calciumTableS
  } from '../constants/shockConstants';
  

/**
 * Calculates CRRT flow values for Shock protocol.
 * @param weight Patient weight in kg.
 * @param albumin Patient albumin in g/dL.
 * @returns Calculated ProtocolResult object.
 */

export function calculateShockProtocol(weight: number, albumin: number): ProtocolResult {
    //Helpers for weight checks. 
    const ptParams = getParamsForWeight(weight, shockTable);
  
    if (!ptParams) {
      throw new Error('Invalid weight. Must be between 50 and 150 kg.');
    }
  
    //const effluent = ptParams.BFR + ptParams.ACDA + ptParams.DFR + ptParams.RFR + 100;
    const effluent = calculateEffluent(ptParams);
    const effIndex = findEffluentIndex(effluent, effluentStepsShock);
    const albIndex = findAlbuminIndex(albumin);
    
    const calciumDose = calciumTableS[effIndex].CalciumDose[albIndex];

    return {
      BFR: ptParams.BFR,
      DFR: ptParams.DFR,
      ACDA: ptParams.ACDA,
      RFR: ptParams.RFR,
      effluent,
      calciumDose,
      weight
    };
  }