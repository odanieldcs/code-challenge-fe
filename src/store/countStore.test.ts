import { describe, expect, it } from 'vitest';
import { useCountStore } from './countStore';

describe('store :: useCountStore', () => {
  it('should increment the counter', () => {
    useCountStore.getState().increment();
    expect(useCountStore.getState().count).toBe(1);
  });

  it('must decrement the counter', () => {
    useCountStore.getState().decrement();
    expect(useCountStore.getState().count).toBe(0);
  });
});
