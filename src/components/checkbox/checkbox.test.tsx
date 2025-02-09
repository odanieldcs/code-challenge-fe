import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Checkbox } from './index';

describe('Checkbox Component', () => {
  it('renders the checkbox', () => {
    render(<Checkbox checked={false} toggleCheckbox={() => {}} />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
  });

  it('renders the checkbox as checked', () => {
    render(<Checkbox checked={true} toggleCheckbox={() => {}} />);
    const checkboxElement = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkboxElement.checked).toBe(true);
  });

  it('calls toggleCheckbox when clicked', () => {
    const toggleCheckboxMock = vi.fn();
    render(<Checkbox checked={false} toggleCheckbox={toggleCheckboxMock} />);
    const checkboxElement = screen.getByRole('checkbox');
    fireEvent.click(checkboxElement);
    expect(toggleCheckboxMock).toHaveBeenCalledTimes(1);
  });

  it('displays checkmark when checked', () => {
    render(<Checkbox checked={true} toggleCheckbox={() => {}} />);
    const checkmarkElement = screen.getByTestId('checkmark');
    expect(checkmarkElement).toBeInTheDocument();
  });

  it('does not display checkmark when unchecked', () => {
    render(<Checkbox checked={false} toggleCheckbox={() => {}} />);
    const checkmarkElement = screen.queryByTestId('checkmark');
    expect(checkmarkElement).not.toBeInTheDocument();
  });
});