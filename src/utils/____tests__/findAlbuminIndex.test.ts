import { findAlbuminIndex } from '../lookup';

describe('findAlbuminIndex', () => {
  it('returns bin 0 for albumin = 0.5', () => {
    expect(findAlbuminIndex(0.5)).toBe(0);
  });

  it('returns bin 0 for albumin = 0.7', () => {
    expect(findAlbuminIndex(0.7)).toBe(0);
  });

  it('returns bin 1 for albumin = 0.8', () => {
    expect(findAlbuminIndex(0.8)).toBe(1);
  });

  it('returns bin 1 for albumin = 1.2', () => {
    expect(findAlbuminIndex(1.2)).toBe(1);
  });

  it('returns bin 2 for albumin = 1.3', () => {
    expect(findAlbuminIndex(1.3)).toBe(2);
  });

  it('returns bin 3 for albumin = 1.92645', () => {
    expect(findAlbuminIndex(1.9)).toBe(3);
  });

  it('returns bin 4 for albumin = 2.4', () => {
    expect(findAlbuminIndex(2.4)).toBe(4);
  });

  it('returns bin 8 for albumin = 4.7', () => {
    expect(findAlbuminIndex(4.7)).toBe(8);
  });

  it('returns bin 9 for albumin = 4.8', () => {
    expect(findAlbuminIndex(4.8)).toBe(9);
  });

  it('returns bin 9 for albumin = 5.0', () => {
    expect(findAlbuminIndex(5.0)).toBe(9);
  });
});
