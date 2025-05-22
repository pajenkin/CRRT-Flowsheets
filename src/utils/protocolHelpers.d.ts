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
export declare function getCalculatedResult(protocolType: number, weight: number, albumin: number): ResultWithWarning | string;
export {};
