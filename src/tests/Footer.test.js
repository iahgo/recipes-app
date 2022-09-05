import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Testa o componente Footer.js', () => {
  it('Testa se o menu está presente', () => {
    renderWithRouter(<Footer />);

    const nav = screen.getByTestId('footer');
    expect(nav).toBeInTheDocument();
  });
  
});