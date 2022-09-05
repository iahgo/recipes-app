import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { globalContext } from '../Contexts/globalContext';
import RecipeCard from './RecipeCard';

function Recipes() {
  const history = useHistory();
  const TWELVE = 12;
  const { foods, drinks } = useContext(globalContext);
  return (
    <div style={ { display: 'flex', flexWrap: 'wrap', width: '25rem' } }>
      {history.location.pathname === '/foods'
        && foods
        && foods.slice(0, TWELVE).map((food, index) => (
          <RecipeCard
            key={ food.idFood }
            index={ index }
            recipeName={ food.strMeal }
            thumb={ food.strMealThumb }
            id={ food.idMeal }
            page="foods"
          />))}
      {history.location.pathname === '/drinks'
        && drinks
        && drinks.slice(0, TWELVE).map((drink, index) => (
          <RecipeCard
            key={ drink.idDrink }
            index={ index }
            recipeName={ drink.strDrink }
            thumb={ drink.strDrinkThumb }
            id={ drink.idDrink }
            page="drinks"
          />))}
    </div>
  );
}

export default Recipes;
