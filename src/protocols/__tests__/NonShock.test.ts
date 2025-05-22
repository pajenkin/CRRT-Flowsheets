import { calculateNonShockProtocol } from '../NonShock';
import { ProtocolResult } from '../../types';

describe('calculateNonShockProtocol', () => {
  it('returns correct values for weight=40kg, albumin=4.0', () => {
    const result: ProtocolResult = calculateNonShockProtocol(40, 4.0);

    expect(result.BFR).toBe(80);
    expect(result.ACDA).toBe(200);
    expect(result.DFR).toBe(500);
    expect(result.RFR).toBe(500);
    expect(result.effluent).toBe(1380);
    expect(result.calciumDose).toBe(20);
  });

  it('returns correct values for weight=100kg, albumin=2.0', () => {
    const result: ProtocolResult = calculateNonShockProtocol(100, 2.0);

    expect(result.BFR).toBe(150);
    expect(result.ACDA).toBe(300);
    expect(result.DFR).toBe(1200);
    expect(result.RFR).toBe(1200);
    expect(result.effluent).toBe(2950);
    expect(result.calciumDose).toBe(43);
  });

  it('returns correct values for weight=200kg, albumin=2.0', () => {
    const result: ProtocolResult = calculateNonShockProtocol(200, 2.0);

    expect(result.BFR).toBe(150);
    expect(result.ACDA).toBe(300);
    expect(result.DFR).toBe(1950);
    expect(result.RFR).toBe(1950);
    expect(result.effluent).toBe(4450);
    expect(result.calciumDose).toBe(60);
  });

  it('returns correct values for weight=150kg, albumin=6.0', () => {
    const result: ProtocolResult = calculateNonShockProtocol(150, 6.0);

    expect(result.BFR).toBe(150);
    expect(result.ACDA).toBe(300);
    expect(result.DFR).toBe(1950);
    expect(result.RFR).toBe(1950);
    expect(result.effluent).toBe(4450);
    expect(result.calciumDose).toBe(73);
  });

  it('returns correct calcium dose for weight=40kg, albumin=2.4 (bin boundary)', () => {
    const result: ProtocolResult = calculateNonShockProtocol(40, 2.4);
  
    expect(result.BFR).toBe(80);
    expect(result.ACDA).toBe(200);
    expect(result.DFR).toBe(500);
    expect(result.RFR).toBe(500);
    expect(result.effluent).toBe(1380);
    expect(result.calciumDose).toBe(19);
  });
});