/**
 * Generic function to lookup parameters based on patient weight.
 * Returns the nearest match from a given lookup table.
 */
export declare function getParamsForWeight<T extends {
    weight: number;
}>(weight: number, table: T[]): T | undefined;
export declare function findEffluentIndex(effluent: number, thresholds: number[]): number;
export declare function findAlbuminIndex(albumin: number): number;
export declare function calculateEffluent(params: {
    BFR: number;
    ACDA: number;
    DFR: number;
    RFR: number;
}): number;
