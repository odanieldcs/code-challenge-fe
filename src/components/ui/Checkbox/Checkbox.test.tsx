import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { describe, expect, it, vi } from 'vitest';

describe('Checkbox', () => {
    it('renders without errors', () => {
        render(<Checkbox checked={false} onChange={() => { }} label="Test Label" />);
        expect(screen.getByTestId('checkbox-container')).toBeInTheDocument();
    });

    it('calls onChange when clicked', () => {
        const onChangeMock = vi.fn();
        render(<Checkbox checked={false} onChange={onChangeMock} label="Test Label" />);
        const input = screen.getByTestId('checkbox-input');
        fireEvent.click(input);
        expect(onChangeMock).toHaveBeenCalledTimes(1);
    });

    it('displays the checkmark when checked', () => {
        render(<Checkbox checked={true} onChange={() => { }} label="Test Label" />);
        expect(screen.getByTestId('checkbox-check-icon')).toBeVisible();
    });

    it('hides the checkmark when unchecked', () => {
        render(<Checkbox checked={false} onChange={() => { }} label="Test Label" />);
        expect(screen.queryByTestId('checkbox-check-icon')).toBeNull();
    });

    it('applies the correct styles when checked', () => {
        render(<Checkbox checked={true} onChange={() => { }} label="Test Label" />);
        const input = screen.getByTestId('checkbox-input');
        const label = screen.getByTestId('checkbox-label');
        expect(input).toHaveClass('bg-stoneGray-700');
        expect(label).toHaveClass('line-through text-stoneGray-700');
    });

    it('applies the correct styles when unchecked', () => {
        render(<Checkbox checked={false} onChange={() => { }} label="Test Label" />);
        const input = screen.getByTestId('checkbox-input');
        const label = screen.getByTestId('checkbox-label');
        expect(input).not.toHaveClass('bg-stoneGray-700');
        expect(label).toHaveClass('text-stoneGray-800');
        expect(label).not.toHaveClass('line-through');
    });

    it('displays the label text', () => {
        const testLabel = 'My Test Label';
        render(<Checkbox checked={false} onChange={() => { }} label={testLabel} />);
        expect(screen.getByTestId('checkbox-label')).toHaveTextContent(testLabel);
    });

    it('should have the correct id and htmlFor attributes', () => {
        render(<Checkbox checked={false} onChange={() => { }} label="Test Label" />);
        const input = screen.getByTestId('checkbox-input');
        const label = screen.getByTestId('checkbox-label');

        expect(input).toHaveAttribute('id', 'checkboxDefault');
        expect(label).toHaveAttribute('for', 'checkboxDefault');
    });
});