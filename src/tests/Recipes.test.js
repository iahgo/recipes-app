import React from "react";
import { screen } from "@testing-library/react";
import { responseDrinksCategory, responseFoodsCategory } from './helpers/mockResponse'
import renderWithRouter from "./helpers/renderWithRouter";
import App from '../App'

describe("Testa o componente Recipes.js", () => {
  // beforeEach(api);
  // afterEach(() => jest.clearAllMocks());

  it("testa componentes", async () => {
    // limpar mocks antes de cada teste
      const getCaregories = jest.spyOn(global, 'fetch')
        .mockResolvedValue({
          json: jest.fn().mockResolvedValue(responseFoodsCategory),
        });

      const { debug, history } = renderWithRouter(<App />);
      history.push('/foods');
      const btn = await screen.findByTestId(`4-recipe-card`);
      expect(btn).toBeInTheDocument();

      
    });
    
    it("testa o componente na rota /drinks", async () => {
      // limpar mocks antes de cada teste
      const getCaregories = jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(responseDrinksCategory),
      });
      
      const { debug, history } = renderWithRouter(<App />);
      history.push('/drinks');
    // expect(global.fetch).toHaveBeenCalled();
    const btn = await screen.findByTestId(`4-recipe-card`);
    expect(btn).toBeInTheDocument();
  });
});
