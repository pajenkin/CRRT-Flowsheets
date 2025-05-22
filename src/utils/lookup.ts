// src/utils/lookup.ts

/**
 * Generic function to lookup parameters based on patient weight.
 * Returns the nearest match from a given lookup table.
 */
export function getParamsForWeight<T extends { weight: number }>(
    weight: number,
    table: T[]
  ): T | undefined {
    if (weight >= 150) {
      return table.find(row => row.weight >= 150);
    } else if (weight <= 50) {
      return table.find(row => row.weight <= 50);
    } else {
      const roundedWeight = Math.ceil(weight / 10) * 10;
      return table.find(row => row.weight === roundedWeight);
    }
  }

export function findEffluentIndex(effluent: number, thresholds: number[]): number {
    if (effluent <= thresholds[0]) return 0;
    for (let i = 1; i < thresholds.length; i++) {
      if (effluent <= thresholds[i]) {
        return i;
      }
    }
    return thresholds.length - 1; // cap to last bin if effluent > all
  }

export function findAlbuminIndex(albumin: number): number {
    if (albumin <= 0.7) return 0;
  
    const bin = Math.floor((albumin - 0.8) / 0.5) + 1;
    return Math.min(bin, 9);
  }

  export function calculateEffluent(params: { BFR: number; ACDA: number; DFR: number; RFR: number }): number {
    return params.BFR + params.ACDA + params.DFR + params.RFR + 100;
  }