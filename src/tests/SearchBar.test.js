import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter'
import SearchBar from '../components/SearchBar';
// import GlobalProvider from '../Contexts/globalContext';
// <GlobalProvider>
// <globalContext.Consumer>
//   <SearchBar />
// </globalContext.Consumer>
// </GlobalProvider>

describe('1', () => {
  it('1', () => {
    const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
    const {history} = renderWithRouter(<SearchBar />)
    history.push('/foods')

    const searchInput = screen.getByTestId('search-input')
    const ingredientRadio = screen.getByTestId('ingredient-search-radio')
    const nameRadio = screen.getByTestId('name-search-radio')
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio')
    const searchBtn = screen.getByTestId('exec-search-btn')

    userEvent.type(searchInput, 'a')
    userEvent.click(ingredientRadio)
    userEvent.click(searchBtn)
    userEvent.click(nameRadio)
    userEvent.click(searchBtn)
    userEvent.click(firstLetterRadio)
    userEvent.click(searchBtn)
    userEvent.type(searchInput, 'a')
    userEvent.click(searchBtn)
    expect(alertMock).toHaveBeenCalledTimes(1)

  })
  it('2', () => {
    const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
    const {history} = renderWithRouter(<SearchBar />)
    history.push('/drinks')

    const searchInput = screen.getByTestId('search-input')
    const ingredientRadio = screen.getByTestId('ingredient-search-radio')
    const nameRadio = screen.getByTestId('name-search-radio')
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio')
    const searchBtn = screen.getByTestId('exec-search-btn')

    userEvent.type(searchInput, 'a')
    userEvent.click(ingredientRadio)
    userEvent.click(searchBtn)
    userEvent.click(nameRadio)
    userEvent.click(searchBtn)
    userEvent.click(firstLetterRadio)
    userEvent.click(searchBtn)
    userEvent.type(searchInput, 'a')
    userEvent.click(searchBtn)
    expect(alertMock).toHaveBeenCalledTimes(1)

  })
  it('3', async () => {
    const {history} = renderWithRouter(<SearchBar />)
    history.push('/foods')
    const searchInput = screen.getByTestId('search-input')
    const nameRadio = screen.getByTestId('name-search-radio')
    const searchBtn = screen.getByTestId('exec-search-btn')
    
    userEvent.type(searchInput, 'Arrabiata')
    userEvent.click(nameRadio)
    userEvent.click(searchBtn)
    await new Promise((r) => setTimeout(r, 2000));
  })
  it('4', async () => {
    const {history} = renderWithRouter(<SearchBar />)
    history.push('/drinks')
    const searchInput = screen.getByTestId('search-input')
    const nameRadio = screen.getByTestId('name-search-radio')
    const searchBtn = screen.getByTestId('exec-search-btn')

    userEvent.type(searchInput, 'Aquamarine')
    userEvent.click(nameRadio)
    userEvent.click(searchBtn)
    await new Promise((r) => setTimeout(r, 2000));
  })
})