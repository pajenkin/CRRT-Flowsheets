// src/utils/protocolHelpers.ts

import { calculateNonShockProtocol } from '../protocols/NonShock';
import { calculateShockProtocol } from '../protocols/Shock';
import { ProtocolResult } from '../types/ProtocolResult';

/**
 * Validates input and calculates the CRRT protocol result.
 * @param protocolType 1 = Non-Shock, 2 = Shock
 * @param weight Patient weight in kg
 * @param albumin Patient albumin in g/dL
 * @returns Either a ProtocolResult or an error message string
 */
type ResultWithWarning = {
  result: ProtocolResult;
  warning?: string;
};

// export function getCalculatedResult(
//   protocolType: number,
//   weight: number,
//   albumin: number
// ): ResultWithWarning | string {
//   if (weight < 5 || weight > 300) {
//     return 'Double Check!! Weight is typically between 40 and 150 kg';
//   }

//   if (albumin < 0.5 || albumin > 6.0) {
//     return 'Double Check!! Albumin is typically between 1.0 and 6.0 g/dL';
//   }

//   const result =
//     protocolType === 1
//       ? calculateNonShockProtocol(weight, albumin)
//       : calculateShockProtocol(weight, albumin);

//   let warning = '';
//   if (weight < 20 || weight > 150) {
//     warning += '⚠️ Weight is outside normal protocol range (20–150 kg). ';
//   }
//   if (albumin < 1.0 || albumin > 5.0) {
//     warning += '⚠️ Albumin is outside normal range (1.0–5.0 g/dL).';
//   }

//   return warning
//     ? { result, warning: warning.trim() }
//     : { result };
// }

export function getCalculatedResult(
  protocolType: number,
  weight: number,
  albumin: number
): ResultWithWarning | string {
  if (isNaN(weight) || isNaN(albumin)) {
    return 'Please enter valid numbers for weight and albumin.';
  }

  if (weight <= 0 || albumin <= 0) {
    return 'Weight and albumin must be positive values.';
  }

  if (protocolType !== 1 && protocolType !== 2) {
    return 'Please select a valid protocol type.';
  }

  const result =
    protocolType === 1
      ? calculateNonShockProtocol(weight, albumin)
      : calculateShockProtocol(weight, albumin);

  let warning = '';
  if (weight < 5 || weight > 300) {
    warning += 'Double Check!! Weight is typically between 40 and 150 kg. ';
  } else if (weight < 20 || weight > 150) {
    warning += '⚠️ Weight is outside normal protocol range (20–150 kg). ';
  }

  if (albumin < 0.5 || albumin > 6.0) {
    warning += 'Double Check!! Albumin is typically between 1.0 and 6.0 g/dL.';
  } else if (albumin < 1.0 || albumin > 5.0) {
    warning += '⚠️ Albumin is outside normal range (1.0–5.0 g/dL).';
  }

  return warning.trim() ? { result, warning: warning.trim() } : { result };
}