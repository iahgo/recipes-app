import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchSearchFoods, fetchSearchDrinks } from '../services/requestAPI';
import { globalContext } from '../Contexts/globalContext';

function SearchBar() {
  const { setFoods, setDrinks } = useContext(globalContext);
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  // const [arrFoods, setArrFoods] = useState([]);

  const handleChange = ({ target: { name, value, type } }) => {
    if (type === 'text') return setSearch(value);
    return setSelectedOption(name);
  };

  const redirect = (page, arrData) => {
    if (page === '/foods') history.push(`/foods/${arrData[0].idMeal}`);
    if (page === '/drinks') history.push(`/drinks/${arrData[0].idDrink}`);
  };

  const getFoodsAPI = async () => {
    const data = await fetchSearchFoods(selectedOption, search);
    if (data !== 'alert' && data.meals !== null) {
      if (data.meals.length === 1) redirect('/foods', data.meals);
      if (data.meals.length !== 1) setFoods(data.meals);
    } if (data.meals === null) {
      alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const getDrinksAPI = async () => {
    const data = await fetchSearchDrinks(selectedOption, search);
    if (data !== 'alert' && data.drinks !== null) {
      if (data.drinks.length === 1) redirect('/drinks', data.drinks);
      if (data.drinks.length !== 1) setDrinks(data.drinks);
    } if (data.drinks === null) {
      alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const getRequestAPI = () => {
    if (history.location.pathname === '/foods') getFoodsAPI();
    if (history.location.pathname === '/drinks') getDrinksAPI();
  };

  const handleSearch = () => {
    getRequestAPI();
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={ search }
          onChange={ handleChange }
          data-testid="search-input"
          placeholder="Search Recipe"
        />
      </div>

      <div>
        <label htmlFor="ingredient">
          <input
            name="ingredient"
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            checked={ selectedOption === 'ingredient' }
            onChange={ handleChange }
          />
          ingredient
        </label>

        <label htmlFor="name">
          <input
            name="name"
            id="name"
            type="radio"
            data-testid="name-search-radio"
            checked={ selectedOption === 'name' }
            onChange={ handleChange }
          />
          Name
        </label>

        <label htmlFor="first-letter">
          <input
            name="first-letter"
            id="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
            checked={ selectedOption === 'first-letter' }
            onChange={ handleChange }
          />
          First-Letter
        </label>

      </div>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
