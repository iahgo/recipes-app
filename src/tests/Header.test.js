import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from 'history';
import { mockAllMeals, responseDrinksCategory, responseFoodsCategory } from "./helpers/mockResponse";
import renderWithRouter from "./helpers/renderWithRouter";
import Header from "../components/Header";
import App from '../App'
import { click } from "@testing-library/user-event/dist/click";

const foodCategory = [
  {
      "strCategory": "Beef"
  },
  {
      "strCategory": "Breakfast"
  },
  {
      "strCategory": "Chicken"
  },
  {
      "strCategory": "Dessert"
  },
  {
      "strCategory": "Goat"
  }
]

const drinkCategory = [
  {
      "strCategory": "Ordinary Drink"
  },
  {
      "strCategory": "Cocktail"
  },
  {
      "strCategory": "Shake"
  },
  {
      "strCategory": "Other/Unknown"
  },
  {
      "strCategory": "Cocoa"
  }
]

describe("Header", () => {
  test("FOOD - CATEGORY EQUAL", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(foodCategory),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/foods');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})
    All
    debug()
  });

  test("1", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(foodCategory),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/foods');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})
    
    const all = screen.getByTestId('All-category-filter')
    userEvent.click(all)
  });

  test("2", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategory),
    });
    const { debug, history } = renderWithRouter(<App />);
    history.push('/drinks');
    await waitFor(() => {expect(global.fetch).toHaveBeenCalled()})
    
    const all = screen.getByTestId('All-category-filter')
    userEvent.click(all)
  });



  test("FOOD", async () => {
    const history = createMemoryHistory();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseFoodsCategory),
    });

    const { debug } = renderWithRouter(<Header title="Foods" isTrue foods />);
    history.push('/foods');
    const chickenCategory = await screen.findByTestId('Chicken-category-filter')
    userEvent.click(chickenCategory)
    const allCategory = await screen.findByTestId('All-category-filter')
    userEvent.click(allCategory)
  });

  test("DRINK", async () => {
    const history = createMemoryHistory();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseDrinksCategory),
    });
      
    history.push('/drinks');
    const { debug } = renderWithRouter(<Header title="Drinks" isTrue drinks />);
    const cocktailCategory = await screen.findByTestId('Cocktail-category-filter')
    userEvent.click(cocktailCategory)
    const allCategory = await screen.findByTestId('All-category-filter')
    userEvent.click(allCategory)
  });

  test("Open Search", async () => {
    const history = createMemoryHistory();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseDrinksCategory),
    });
      
    history.push('/drinks');
    const { debug } = renderWithRouter(<Header title="Drinks" isTrue drinks />);
    const searchBtn = await screen.findByTestId('search-top-btn')
    userEvent.click(searchBtn)
  });

  test("Clica 2 vezes na categoria FOOD", async () => {
    const getCaregories = jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(responseFoodsCategory),
      });

    const { debug, history } = renderWithRouter(<Header title="Foods" isTrue foods />);
    history.push('/foods');
    // expect(global.fetch).toHaveBeenCalled();

    const beef = await screen.findByTestId('Beef-category-filter');
    userEvent.click(beef);
    userEvent.click(beef);
    await new Promise((r) => setTimeout(r, 2000)); 
  });

  test("Clica 2 vezes na categoria DRINK", async () => {
    const history = createMemoryHistory();
    const getCaregories = jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(responseDrinksCategory),
      });
      
    history.push('/drinks');
    const { debug } = renderWithRouter(<Header title="Drinks" isTrue drinks />);
    const cocktail = await screen.findByTestId('Cocktail-category-filter');
    userEvent.click(cocktail);
    userEvent.click(cocktail);

    await new Promise((r) => setTimeout(r, 2000)); 
  });
});
