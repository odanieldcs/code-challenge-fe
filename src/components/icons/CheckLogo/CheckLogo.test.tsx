import { render, screen } from '@testing-library/react';
import { CheckLogo } from './CheckLogo';
import { describe, expect, it } from 'vitest';

describe('CheckLogo', () => {
    it('renders without errors', () => {
        render(<CheckLogo />);
    });

    it('applies the className prop', () => {
        const testClassName = 'test-class';
        render(<CheckLogo className={testClassName} />);
        const svgElement = screen.getByTestId('check-logo');
        expect(svgElement).toHaveClass(testClassName);
    });

    it('applies the color prop to both paths', () => {
        const testColor = '#FF0000';
        render(<CheckLogo color={testColor} />);
        const path1 = screen.getByTestId('check-logo-path-1');
        const path2 = screen.getByTestId('check-logo-path-2');
        expect(path1).toHaveAttribute('stroke', testColor);
        expect(path2).toHaveAttribute('stroke', testColor);
    });

    it('uses the default color when color prop is not provided', () => {
        render(<CheckLogo />);
        const path1 = screen.getByTestId('check-logo-path-1');
        const path2 = screen.getByTestId('check-logo-path-2');
        expect(path1).toHaveAttribute('stroke', '#578F5D');
        expect(path2).toHaveAttribute('stroke', '#578F5D');
    });

    it('renders the correct SVG structure', () => {
        render(<CheckLogo />);
        const svgElement = screen.getByTestId('check-logo');
        const path1 = screen.getByTestId('check-logo-path-1');
        const path2 = screen.getByTestId('check-logo-path-2');

        expect(svgElement).toBeInTheDocument();
        expect(path1).toBeInTheDocument();
        expect(path2).toBeInTheDocument();

        expect(path1).toHaveAttribute('d', expect.any(String));
        expect(path2).toHaveAttribute('d', expect.any(String));
        expect(path1).toHaveAttribute('stroke-width', '4');
        expect(path2).toHaveAttribute('stroke-width', '4');
        expect(path1).toHaveAttribute('stroke-linecap', 'round');
        expect(path2).toHaveAttribute('stroke-linecap', 'round');
        expect(path1).toHaveAttribute('stroke-linejoin', 'round');
        expect(path2).toHaveAttribute('stroke-linejoin', 'round');
    });
});
