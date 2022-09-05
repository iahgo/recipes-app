import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Profile', () => {
    it('testa a tela de Perfil',() => {
        const {debug} = renderWithRouter(<Profile/>);
    });

    it('testa botao favorite',() => {
        const {history} = renderWithRouter(<Profile />);

        const FavoriteButton = screen.getByTestId('profile-favorite-btn');
        expect(FavoriteButton).toBeInTheDocument();

        userEvent.click(FavoriteButton);
        expect(history.location.pathname).toBe('/favorite-recipes');
    });

    it('testa botao done',() => {
        const {history} = renderWithRouter(<Profile />);

        const DoneButton = screen.getByTestId('profile-done-btn');
        expect(DoneButton).toBeInTheDocument();

        userEvent.click(DoneButton);
        expect(history.location.pathname).toBe('/done-recipes');
    });

    it('testa botao logout',() => {
        const {history} = renderWithRouter(<Profile />);

        const LogoutButton = screen.getByTestId('profile-logout-btn');
        expect(LogoutButton).toBeInTheDocument();

        userEvent.click(LogoutButton);
        expect(history.location.pathname).toBe('/');
    });
    it ('testa o email',() => {
        localStorage.setItem('user', JSON.stringify('teste@teste.com'));
        const {history} = renderWithRouter(<Profile />);

        const email = screen.getByTestId('profile-email');
        expect(email).toHaveTextContent('teste@teste.com')
    })
})
