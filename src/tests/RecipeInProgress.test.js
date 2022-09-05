import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecipeInProgress from '../pages/RecipeInProgress';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter'
import { createMemoryHistory } from 'history';
import { mockObjDrink, mockObjMeal } from './helpers/mockResponse';
import App from '../App';

const oneIng = {
  "cocktails": {
      "178319": [
          "Hpnotiq - 2 oz"
      ]
  },
  "meals": {
      "52768": [
          "digestive biscuits - 175g/6oz"
      ]
  }
}

describe('1', () => {
  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  });

  it("FOOD - 1", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObjMeal),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/foods/52768/in-progress');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})

    const ing0Check = screen.getByTestId('0-check')
    userEvent.click(ing0Check)

    const ing0Uncheck = screen.getByTestId('0-check')
    userEvent.click(ing0Uncheck)
  });
  
  it("DRINK - 1", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObjDrink),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/drinks/178319/in-progress');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})

    const ing0Check = screen.getByTestId('0-check')
    userEvent.click(ing0Check)

    const ing0Uncheck = screen.getByTestId('0-check')
    userEvent.click(ing0Uncheck)
  });

  it("FOOD - 2", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObjMeal),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/foods/52768/in-progress');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})

    const ing0Check = screen.getByTestId('0-check')
    const ing1Check = screen.getByTestId('1-check')
    const ing2Check = screen.getByTestId('2-check')
    const ing3Check = screen.getByTestId('3-check')
    const ing4Check = screen.getByTestId('4-check')
    const ing5Check = screen.getByTestId('5-check')
    const ing6Check = screen.getByTestId('6-check')
    const ing7Check = screen.getByTestId('7-check')
    const ing8Check = screen.getByTestId('8-check')
    userEvent.click(ing0Check)
    userEvent.click(ing1Check)
    userEvent.click(ing2Check)
    userEvent.click(ing3Check)
    userEvent.click(ing4Check)
    userEvent.click(ing5Check)
    userEvent.click(ing6Check)
    userEvent.click(ing7Check)
    userEvent.click(ing8Check)

    const finishBtn = screen.getByTestId('finish-recipe-btn')
    userEvent.click(finishBtn)
  });
  
  it("DRINK - 2", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObjDrink),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/drinks/178319/in-progress');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})

    const ing0Check = screen.getByTestId('0-check')
    const ing1Check = screen.getByTestId('1-check')
    const ing2Check = screen.getByTestId('2-check')
    userEvent.click(ing0Check)
    userEvent.click(ing1Check)
    userEvent.click(ing2Check)

    const finishBtn = screen.getByTestId('finish-recipe-btn')
    userEvent.click(finishBtn)
  });

  it("FOOD - 3", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObjMeal),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/foods/52768/in-progress');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})

    const favoriteBtn = screen.getByTestId('favorite-btn')
    userEvent.click(favoriteBtn)
  });
  
  it("DRINK - 3", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObjDrink),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/drinks/178319/in-progress');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})

    const favoriteBtn = screen.getByTestId('favorite-btn')
    userEvent.click(favoriteBtn)
  });

  it("FOOD - 4", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObjMeal),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/foods/52768/in-progress');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})

    const shareBtn = screen.getByTestId('share-btn')
    jest.spyOn(navigator.clipboard, 'writeText');
    userEvent.click(shareBtn)

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    const linkCopied = await screen.findByText(/link copied!/i);
    expect(linkCopied).toHaveTextContent('Link copied!');
  });
  
  it("DRINK - 4", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObjDrink),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/drinks/178319/in-progress');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})

    const shareBtn = screen.getByTestId('share-btn')
    jest.spyOn(navigator.clipboard, 'writeText');
    userEvent.click(shareBtn)
  });

  it("FOOD - 5", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockObjMeal),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/foods/52768/in-progress');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})

    const favoriteBtn = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
  });
})