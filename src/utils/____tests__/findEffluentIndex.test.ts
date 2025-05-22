import { findEffluentIndex } from '../lookup';
import { effluentStepsShock } from '../../constants/shockConstants';
import { effluentStepsNonShock } from '../../constants/nonShockConstants';

describe('findEffluentIndex (Shock)', () => {
  it('returns index 0 for effluent = 2100', () => {
    expect(findEffluentIndex(2100, effluentStepsShock)).toBe(0);
  });

  it('returns index 0 for effluent = 2099', () => {
    expect(findEffluentIndex(2099, effluentStepsShock)).toBe(0);
  });

  it('returns index 1 for effluent = 2500', () => {
    expect(findEffluentIndex(2500, effluentStepsShock)).toBe(1);
  });

  it('returns index 1 for effluent = 2499', () => {
    expect(findEffluentIndex(2499, effluentStepsShock)).toBe(1);
  });

  it('returns index 10 for effluent = 6000 (above max)', () => {
    expect(findEffluentIndex(6000, effluentStepsShock)).toBe(10);
  });
});

describe('findEffluentIndex (NonShock)', () => {
  it('returns index 0 for effluent = 1399', () => {
    expect(findEffluentIndex(1399, effluentStepsNonShock)).toBe(0);
  });

  it('returns index 0 for effluent = 1400', () => {
    expect(findEffluentIndex(1400, effluentStepsNonShock)).toBe(0);
  });

  it('returns index 2 for effluent = 2000', () => {
    expect(findEffluentIndex(2000, effluentStepsNonShock)).toBe(2);
  });

  it('returns index 1 for effluent = 1699', () => {
    expect(findEffluentIndex(1699, effluentStepsNonShock)).toBe(1);
  });

  it('returns index 11 for effluent = 6000 (above max)', () => {
    expect(findEffluentIndex(6000, effluentStepsNonShock)).toBe(11);
  });
});