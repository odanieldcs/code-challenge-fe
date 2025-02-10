import { act, renderHook } from '@testing-library/react';
import { useToDoStore } from './todoStore';
import { saveToStorage } from '../utils/storage';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../utils/storage', () => ({
    loadFromStorage: vi.fn(),
    saveToStorage: vi.fn(),
  }));
  
  describe('useToDoStore', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });
  
    it('should initialize with empty tasks', () => {
      const { result } = renderHook(() => useToDoStore());
      expect(result.current.tasks).toEqual([]);
    });
  
    it('should add a new task', () => {
      const { result } = renderHook(() => useToDoStore());
      const newTaskTitle = 'New Task';
  
      act(() => {
        result.current.addTask(newTaskTitle);
      });
  
      expect(result.current.tasks.length).toBe(1);
      expect(result.current.tasks[0].title).toBe(newTaskTitle);
      expect(result.current.tasks[0].completed).toBe(false);
      expect(saveToStorage).toHaveBeenCalledWith('todo_tasks', result.current.tasks);
    });
  
    it('should mark a task as complete and incomplete', () => {
      const { result } = renderHook(() => useToDoStore());
      act(() => {
        result.current.addTask('Task');
      });
  
      const taskId = result.current.tasks[0].id;
  
      act(() => {
        result.current.markTaskComplete(taskId);
      });
      expect(result.current.tasks[0].completed).toBe(true);
  
      act(() => {
        result.current.markTaskIncomplete(taskId);
      });
      expect(result.current.tasks[0].completed).toBe(false);
  
      expect(saveToStorage).toHaveBeenCalledTimes(3);
    });
  });