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
  
  /**
   * Finds the index of effluent threshold that matches the given effluent value.
   */
  export function findEffluentIndex(effluent: number, effluentSteps: number[]): number {
    for (let i = 0; i < effluentSteps.length; i++) {
      if (effluent <= effluentSteps[i]) {
        return i;
      }
    }
    return effluentSteps.length - 1;
  }
  
  /**
   * Finds the index of albumin threshold that matches the given albumin value.
   */
  export function findAlbuminIndex(albumin: number, albuminThresholds: number[]): number {
    for (let i = 0; i < albuminThresholds.length; i++) {
      if (albumin <= albuminThresholds[i]) {
        return i;
      }
    }
    return albuminThresholds.length - 1;
  }