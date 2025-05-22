import { calculateShockProtocol } from '../Shock';
import { ProtocolResult } from '../../types';

describe('calculateShockProtocol', () => {
  it('returns correct values for weight=40kg, albumin=2.0', () => {
    const result: ProtocolResult = calculateShockProtocol(40, 2.0);

    expect(result.BFR).toBe(50);
    expect(result.ACDA).toBe(125);
    expect(result.DFR).toBe(1250);
    expect(result.RFR).toBe(500);
    expect(result.effluent).toBe(2025);
    expect(result.calciumDose).toBe(31);
  });

  it('returns correct values for weight=100kg, albumin=2.0', () => {
    const result: ProtocolResult = calculateShockProtocol(100, 2.0);

    expect(result.BFR).toBe(100);
    expect(result.ACDA).toBe(250);
    expect(result.DFR).toBe(2500);
    expect(result.RFR).toBe(1000);
    expect(result.effluent).toBe(3950);
    expect(result.calciumDose).toBe(62);
  });

  it('returns correct values for weight=200kg, albumin=4.0', () => {
    const result: ProtocolResult = calculateShockProtocol(200, 4.0);

    expect(result.BFR).toBe(150);
    expect(result.ACDA).toBe(300);
    expect(result.DFR).toBe(3750);
    expect(result.RFR).toBe(1500);
    expect(result.effluent).toBe(5800);
    expect(result.calciumDose).toBe(97);
  });

  it('returns correct values for weight=75kg, albumin=1.0', () => {
    const result: ProtocolResult = calculateShockProtocol(75, 1.0);

    expect(result.BFR).toBe(80);
    expect(result.ACDA).toBe(200);
    expect(result.DFR).toBe(2000);
    expect(result.RFR).toBe(800);
    expect(result.effluent).toBe(3180);
    expect(result.calciumDose).toBe(47);
  });
});