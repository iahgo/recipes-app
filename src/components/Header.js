import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import {
  fetchCategories,
  fetchFoodByCategory,
  fetchSearchDrinks,
  fetchSearchFoods,
} from '../services/requestAPI';
import { globalContext } from '../Contexts/globalContext';

function Header({ title, isTrue }) {
  // const history = useHistory();
  const { setFoods, setDrinks } = useContext(globalContext);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [filters, setFilters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  async function getFilters() {
    const response = await fetchCategories(title);
    setFilters(response);
  }

  useEffect(() => {
    getFilters();
  }, []);

  async function clearCategory() {
    if (title === 'Foods') {
      const response = await fetchSearchFoods('name', '');
      return setFoods(response.meals);
    }
    const response = await fetchSearchDrinks('name', '');
    return setDrinks(response.drinks);
  }

  const pageFood = async (category) => {
    if (title === 'Foods') {
      if (selectedCategory !== category) {
        setSelectedCategory(category);
        const response = await fetchFoodByCategory('foods', category);
        return setFoods(response.meals);
      }
      if (selectedCategory === category) {
        setSelectedCategory('All');
        const response = await fetchSearchFoods('name', '');
        return setFoods(response.meals);
      }
    }
  };

  const handleCategory = async (category) => {
    pageFood(category);
    if (title === 'Drinks') {
      if (selectedCategory !== category) {
        setSelectedCategory(category);
        const response = await fetchFoodByCategory('drinks', category);
        console.log('dif', response);
        return setDrinks(response.drinks);
      }
      if (selectedCategory === category) {
        setSelectedCategory('All');
        const response = await fetchSearchDrinks('name', '');
        console.log('equal', response);
        return setDrinks(response.drinks);
      }
    }
  };

  return (
    <header>
      <div className="contentHeader">
        <div className="iconHeader">
          <Link to="/profile">
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </Link>
        </div>
        <div className="TitleHeader">
          <h1 data-testid="page-title">{title}</h1>
        </div>
        {isTrue && (
          <button
            className="buttonSearch"
            type="button"
            onClick={ () => setDisplayMenu(!displayMenu) }
          >
            <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
          </button>
        )}
        {displayMenu && <SearchBar />}
      </div>
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => clearCategory() }
        >
          All
        </button>
        {filters
          && filters.map(({ strCategory }) => (
            <button
              data-testid={ `${strCategory}-category-filter` }
              type="button"
              key={ strCategory }
              // onClick={ () => selectCategory(strCategory) }
              onClick={ () => handleCategory(strCategory) }
            >
              { strCategory }
            </button>
          ))}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isTrue: PropTypes.bool.isRequired,
};

export default Header;
