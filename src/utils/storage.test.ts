import { beforeEach, describe, expect, it } from 'vitest';
import { loadFromStorage, saveToStorage } from './storage';

describe('Storage Utilities', () => {
    beforeEach(() => {
      localStorage.clear();
    });
  
    it('should save data to localStorage', () => {
      const key = 'testKey';
      const data = { a: 1, b: 'hello' };
      saveToStorage(key, data);
      const storedData = localStorage.getItem(key);
      expect(storedData).toBe(JSON.stringify(data));
    });
  
    it('should load data from localStorage', () => {
      const key = 'testKey';
      const data = { a: 1, b: 'hello' };
      localStorage.setItem(key, JSON.stringify(data));
      const loadedData = loadFromStorage(key, null);
      expect(loadedData).toEqual(data);
    });
  
    it('should return the default value if key does not exist', () => {
      const key = 'nonExistentKey';
      const defaultValue = { c: 3 };
      const loadedData = loadFromStorage(key, defaultValue);
      expect(loadedData).toBe(defaultValue);
    });
  
    it('should handle different data types correctly', () => {
      const stringKey = 'stringKey';
      const stringData = 'hello world';
      saveToStorage(stringKey, stringData);
      expect(loadFromStorage(stringKey, '')).toBe(stringData);
  
      const numberKey = 'numberKey';
      const numberData = 12345;
      saveToStorage(numberKey, numberData);
      expect(loadFromStorage(numberKey, 0)).toBe(numberData);
  
      const booleanKey = 'booleanKey';
      const booleanData = true;
      saveToStorage(booleanKey, booleanData);
      expect(loadFromStorage(booleanKey, false)).toBe(booleanData);
  
      const arrayKey = 'arrayKey';
      const arrayData = [1, 2, 3];
      saveToStorage(arrayKey, arrayData);
      expect(loadFromStorage(arrayKey, [])).toEqual(arrayData);
  
      const nullKey = 'nullKey';
      const nullData = null;
      saveToStorage(nullKey, nullData);
      expect(loadFromStorage(nullKey, 'default')).toBeNull();
  
      const undefinedKey = 'undefinedKey';
      const undefinedData = undefined;
      saveToStorage(undefinedKey, undefinedData);
      expect(loadFromStorage(undefinedKey, 'default')).toBeNull();
    });
  
    it('should handle JSON parsing errors gracefully', () => {
      const key = 'invalidJSONKey';
      localStorage.setItem(key, '{invalid json}');
      const defaultValue = { error: true };
      const loadedData = loadFromStorage(key, defaultValue);
      expect(loadedData).toEqual(defaultValue);
    });
  });