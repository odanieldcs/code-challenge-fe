import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('../icons/CheckLogo', () => ({
    CheckLogo: () => <div data-testid="check-logo" />,
}));

describe('Navbar Component', () => {
    it('renders the Navbar with the correct elements', () => {
        render(<Navbar />);

        const navbarElement = screen.getByRole('navigation');
        expect(navbarElement).toBeInTheDocument();
        expect(navbarElement).toHaveClass('bg-stoneGray-300');

        expect(screen.getByText('TODO List')).toBeInTheDocument();

        expect(screen.getByTestId('check-logo')).toBeInTheDocument();
    });

    it('renders the title with correct text, font-size and font-weight', () => {
        render(<Navbar />);
        const title = screen.getByRole('heading', { level: 1 });
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('TODO List');
        expect(title).toHaveClass('text-2xl');
        expect(title).toHaveClass('font-bold');
    });
});