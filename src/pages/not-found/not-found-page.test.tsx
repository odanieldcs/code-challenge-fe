import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import NotFoundPage from './index';

describe('NotFoundPage', () => {
  it('renders the 404 heading', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    const headingElement = screen.getByText('404');
    expect(headingElement).toBeInTheDocument();
  });

  it('renders the "Página Não Encontrada" text', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    const notFoundText = screen.getByText('Página Não Encontrada');
    expect(notFoundText).toBeInTheDocument();
  });

  it('renders the apology text', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    const apologyText = screen.getByText('Desculpe, a página que você está procurando não existe.');
    expect(apologyText).toBeInTheDocument();
  });

  it('renders the "Voltar para a página inicial" link', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    const linkElement = screen.getByRole('link', { name: 'Voltar para a página inicial' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});