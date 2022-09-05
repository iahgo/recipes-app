import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter'

const EMAIL_VALID = 'teste@teste.com'
// const EMAIL_INVALID = 'teste'
const PASSWORD_VALID = '1234567'
// const PASSWORD_INVALID = '132'

describe('1', () => {
  it('1', () => {
    const {history} = renderWithRouter(<Login />)

    const emailInput = screen.getByTestId('email-input')
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveTextContent('')

    const passwordInput = screen.getByTestId('password-input')
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveTextContent('')

    const loginBtn = screen.getByTestId('login-submit-btn')
    expect(loginBtn).toBeInTheDocument()
    expect(loginBtn).toBeDisabled()

    userEvent.type(emailInput, EMAIL_VALID)
    userEvent.type(passwordInput, PASSWORD_VALID)
    userEvent.click(loginBtn)
    expect(history.location.pathname).toBe('/foods')
  })
})