import { describe, it, expect } from 'vitest';
import { getTextColor } from './get-text-color';

describe('getTextColor', () => {
  it('returns white for dark colors', () => {
    expect(getTextColor('#000000')).toBe('#FFFFFF');
    expect(getTextColor('#220529')).toBe('#FFFFFF');
  });

  it('returns black for light colors', () => {
    expect(getTextColor('#FFFFFF')).toBe('#000000');
    expect(getTextColor('#DDE4F1')).toBe('#000000');
  });

  it('returns white for medium colors', () => {
    expect(getTextColor('#4691E8')).toBe('#FFFFFF');
    expect(getTextColor('#FF7F7F')).toBe('#FFFFFF');
  });

  it('handles invalid color inputs', () => {
    expect(getTextColor('invalid')).toBe('#000000');
    expect(getTextColor('#123')).toBe('#FFFFFF');
  });
});