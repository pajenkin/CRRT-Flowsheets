import { ProtocolResult } from '../types/ProtocolResult';
/**
 * Calculates CRRT flow values for Shock protocol.
 * @param weight Patient weight in kg.
 * @param albumin Patient albumin in g/dL.
 * @returns Calculated ProtocolResult object.
 */
export declare function calculateShockProtocol(weight: number, albumin: number): ProtocolResult;
