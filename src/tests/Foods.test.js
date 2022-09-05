import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecipeInProgress from '../pages/RecipeInProgress';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter'
import { createMemoryHistory } from 'history';
import { mockAllMeals, mockObjDrink, mockObjMeal } from './helpers/mockResponse';
import App from '../App';
import { saveToStorage } from './helpers/mockAPI';
import { setItemStorageOverwrite } from '../services/localStorage';

describe('1', () => {
  it("1", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAllMeals),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/foods');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})
    // debug()
    
    const recipeCard0 = screen.getByTestId('0-recipe-card')
    // const filterDrink = screen.getByTestId('filter-by-drink-btn')
    // const filterAll = screen.getByTestId('filter-by-all-btn')
    // const profileBtn = screen.getByTestId('profile-top-btn')

    userEvent.click(recipeCard0)
    // userEvent.click(filterDrink)
    // userEvent.click(filterAll)
    // userEvent.click(profileBtn)
  });
})