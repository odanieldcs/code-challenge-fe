import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { ColorPicker } from './index';

describe('ColorPicker Component', () => {
  it('renders the color picker', () => {
    render(<ColorPicker value="#DDE4F1" onChange={() => {}} />);
    const colorPickerElement = screen.getByTestId('color-picker-button');
    expect(colorPickerElement).toBeInTheDocument();
  });

  it('displays the correct color', () => {
    render(<ColorPicker value="#DDE4F1" onChange={() => {}} />);
    const colorPickerElement = screen.getByTestId('color-picker-button');
    expect(colorPickerElement).toHaveStyle({ backgroundColor: '#DDE4F1' });
  });

  it('calls onChange when a new color is selected', () => {
    const onChangeMock = vi.fn();
    render(<ColorPicker value="#DDE4F1" onChange={onChangeMock} />);
    const colorInputElement = screen.getByTestId('color-picker-input');
    fireEvent.change(colorInputElement, { target: { value: '#266fc3' } });
    expect(onChangeMock).toHaveBeenCalledWith('#266fc3');
  });
});
