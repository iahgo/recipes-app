import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecipeInProgress from '../pages/RecipeInProgress';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter'
import { createMemoryHistory } from 'history';
import { mockObjDrink, mockObjMeal } from './helpers/mockResponse';
import App from '../App';
import { saveToStorage } from './helpers/mockAPI';
import { setItemStorageOverwrite } from '../services/localStorage';

const favoriteRecipes = [
  {
      "id": "178319",
      "type": "drink",
      "nationality": "",
      "category": "Cocktail",
      "alcoholicOrNot": "Alcoholic",
      "name": "Aquamarine",
      "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg"
  },
  {
      "id": "52768",
      "type": "food",
      "nationality": "British",
      "category": "Dessert",
      "alcoholicOrNot": "",
      "name": "Apple Frangipan Tart",
      "image": "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg"
  }
]

describe('1', () => {
  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  });

  it("1", async () => {
    setItemStorageOverwrite('favoriteRecipes', favoriteRecipes)
    const { debug, history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    
    const filterFood = screen.getByTestId('filter-by-food-btn')
    const filterDrink = screen.getByTestId('filter-by-drink-btn')
    const filterAll = screen.getByTestId('filter-by-all-btn')
    const profileBtn = screen.getByTestId('profile-top-btn')

    userEvent.click(filterFood)
    userEvent.click(filterDrink)
    userEvent.click(filterAll)
    userEvent.click(profileBtn)
  });

  it("2", async () => {
    setItemStorageOverwrite('favoriteRecipes', favoriteRecipes)
    const { debug, history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    
    const imageBtn = screen.getByTestId('0-horizontal-image')
    userEvent.click(imageBtn)
    history.push('/favorite-recipes');
    
    const nameBtn = screen.getByTestId('0-horizontal-name')
    userEvent.click(nameBtn)
    history.push('/favorite-recipes');

  });
  
  it("3", async () => {
    setItemStorageOverwrite('favoriteRecipes', favoriteRecipes)
    const { debug, history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    
    const shareBtn = screen.getByTestId('0-horizontal-share-btn')
    jest.spyOn(navigator.clipboard, 'writeText');
    userEvent.click(shareBtn)
    
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    // const linkCopied = screen.getByText(/link copied!/i)
    // expect(linkCopied).toHaveTextContent('Link copied!');
  });
  
  it("2", async () => {
    setItemStorageOverwrite('favoriteRecipes', favoriteRecipes)
    const { debug, history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn')
    userEvent.click(favoriteBtn)
  });
})