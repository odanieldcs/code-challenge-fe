import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Input } from './index';

describe('Input Component', () => {
  it('renders the input', () => {
    render(<Input size="lg" value="" variant="outlined" onChange={() => {}} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('displays the correct value', () => {
    render(<Input size="sm" value="test value" variant="transparent" onChange={() => {}} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('test value');
  });

  it('calls onChange when the value is changed', () => {
    const onChangeMock = vi.fn();
    render(<Input size="sm" value="" variant="outlined" onChange={onChangeMock} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(onChangeMock).toHaveBeenCalledWith('new value');
  });

  it('calls handleEnter when Enter key is pressed', () => {
    const handleEnterMock = vi.fn();
    render(<Input size="sm" value="" variant="outlined" onChange={() => {}} handleEnter={handleEnterMock} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(handleEnterMock).toHaveBeenCalledTimes(1);
  });

  it('applies the correct variant class names', () => {
    render(<Input size="sm" value="" variant="outlined" onChange={() => {}} />);
    const inputContainer = screen.getByTitle('');
    expect(inputContainer).toHaveClass('bg-input border border-stroke rounded-[10px] px-3 hover:border-checked');
  });

  it('applies the correct size class names', () => {
    render(<Input size="sm" value="" variant="outlined" onChange={() => {}} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('h-[29px]');
  });
});
