import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { mockAllDrinks, mockAllMeals, mockObj52977, mockObjDrink, mockObjMeal } from './helpers/mockResponse'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import { setItemStorageOverwrite } from '../services/localStorage';

const inProgressRecipes = { cocktails: {}, meals: {} }

const doneRecipes = [
  {
    "id": "11111",
    "type": "food",
      "nationality": "British",
      "category": "Dessert",
      "alcoholicOrNot": "",
      "name": "Apple Frangipan Tart",
      "image": "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
      "doneDate": "30/8/2022",
      "tags": [
          "Tart",
          "Baking",
          "Fruity"
      ]
  },
  {
      "id": "22222",
      "type": "drink",
      "nationality": "",
      "category": "Cocktail",
      "alcoholicOrNot": "Alcoholic",
      "name": "Aquamarine",
      "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
      "doneDate": "30/8/2022",
      "tags": []
  }
]

const favoriteRecipes = [
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

  it("FOOD - 1", async () => {
    setItemStorageOverwrite('inProgressRecipes', inProgressRecipes)
    setItemStorageOverwrite('doneRecipes', doneRecipes)
    setItemStorageOverwrite('favoriteRecipes', favoriteRecipes)
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObjMeal),
    });
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAllDrinks),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/foods/52768');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})
    
    const startRecipeBtn = screen.getByTestId('start-recipe-btn')
    userEvent.click(startRecipeBtn)
  });
  it("FOOD - 2", async () => {
    setItemStorageOverwrite('inProgressRecipes', inProgressRecipes)
    setItemStorageOverwrite('doneRecipes', doneRecipes)
    setItemStorageOverwrite('favoriteRecipes', favoriteRecipes)
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObjMeal),
    });
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAllDrinks),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/foods/11111');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})
    
    // const startRecipeBtn = screen.getByTestId('start-recipe-btn')
    // userEvent.click(startRecipeBtn)
  });
  it("DRINK - 2", async () => {
    setItemStorageOverwrite('inProgressRecipes', inProgressRecipes)
    setItemStorageOverwrite('doneRecipes', doneRecipes)
    setItemStorageOverwrite('favoriteRecipes', favoriteRecipes)
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObjDrink),
    });
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAllMeals),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/drinks/22222');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})
    
    // const startRecipeBtn = screen.getByTestId('start-recipe-btn')
    // userEvent.click(startRecipeBtn)
  });

  it("DRINK - 1", async () => {
    setItemStorageOverwrite('inProgressRecipes', inProgressRecipes)
    setItemStorageOverwrite('doneRecipes', doneRecipes)
    setItemStorageOverwrite('favoriteRecipes', favoriteRecipes)
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObjDrink),
    });
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAllMeals),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/drinks/178319');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})
    
    const startRecipeBtn = screen.getByTestId('start-recipe-btn')
    userEvent.click(startRecipeBtn)
  });

  it("FOOD", async () => {
    setItemStorageOverwrite('inProgressRecipes', inProgressRecipes)
    setItemStorageOverwrite('doneRecipes', doneRecipes)
    setItemStorageOverwrite('favoriteRecipes', favoriteRecipes)
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObjMeal),
    });
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAllDrinks),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/foods/52768');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})
    
    const shareBtn = screen.getByTestId('share-btn')
    jest.spyOn(navigator.clipboard, 'writeText');
    userEvent.click(shareBtn)
    
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    
    const favoriteBtn = screen.getByTestId('favorite-btn')
    userEvent.click(favoriteBtn)
    userEvent.click(favoriteBtn)
  });

  it("DRINK", async () => {
    setItemStorageOverwrite('inProgressRecipes', inProgressRecipes)
    setItemStorageOverwrite('doneRecipes', doneRecipes)
    setItemStorageOverwrite('favoriteRecipes', favoriteRecipes)
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObjDrink),
    });
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAllMeals),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/drinks/178319');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})
    
    const shareBtn = screen.getByTestId('share-btn')
    jest.spyOn(navigator.clipboard, 'writeText');
    userEvent.click(shareBtn)
    
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    
    const favoriteBtn = screen.getByTestId('favorite-btn')
    userEvent.click(favoriteBtn)
    userEvent.click(favoriteBtn)
  });

  it("NO FAVORITE", async () => {
    setItemStorageOverwrite('inProgressRecipes', inProgressRecipes)
    setItemStorageOverwrite('doneRecipes', doneRecipes)
    setItemStorageOverwrite('favoriteRecipes', favoriteRecipes)
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObjMeal),
    });
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAllDrinks),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/foods/52768');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})
    
    const favoriteBtn = screen.getByTestId('favorite-btn')
    userEvent.click(favoriteBtn)
    debug()
  });


  it("FOOD", async () => {
    setItemStorageOverwrite('inProgressRecipes', inProgressRecipes)
    setItemStorageOverwrite('doneRecipes', doneRecipes)
    setItemStorageOverwrite('favoriteRecipes', favoriteRecipes)
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObj52977),
    });
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAllDrinks),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/foods/52977');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})
    
    const startRecipeBtn = screen.getByTestId('start-recipe-btn')
    userEvent.click(startRecipeBtn)
  });
})