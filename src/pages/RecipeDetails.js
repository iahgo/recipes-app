import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import clipboardCopy from 'clipboard-copy';
import { fetchFoodId, fetchSearchDrinks, fetchSearchFoods } from '../services/requestAPI';
import './RecipeDetails.css';
import {
  getItemStorage, getItemStorageArr, getItemStorageProgressRecipe,
  setItemStorage, setItemStorageOverwrite,
} from '../services/localStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const SIX = 6;

function Recipe() {
  const history = useHistory();
  const { id } = useParams();
  const [food, setFood] = useState([]);
  const [arrIngMeas, setArrIngMeas] = useState([]);
  const [page, setPage] = useState('');
  const [recomendation, setRecomendation] = useState([]);
  const [startRecipe, setStartRecipe] = useState(true);
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const [copiedButton, setCopiedButton] = useState(false);
  const [srcFav, setSrcFav] = useState(whiteHeartIcon);

  const getFoodIdAPI = async () => {
    const strPage = history.location.pathname.split('/')[1];
    setPage(strPage);
    const data = await fetchFoodId(strPage, id);
    setFood(data[Object.keys(data)[0]][0]);
  };

  async function requestRecomendation() {
    if (history.location.pathname.includes('drinks')) {
      const data = await fetchSearchFoods('name', '');
      if (data.meals) return setRecomendation(data.meals.slice(0, SIX));
    }
    if (history.location.pathname.includes('foods')) {
      const data = await fetchSearchDrinks('name', '');
      if (data.drinks) return setRecomendation(data.drinks.slice(0, SIX));
    }
  }

  function removeFavorite() {
    const favFoods = getItemStorage('favoriteRecipes');
    const newFavs = favFoods.filter((fav) => (fav.id !== id));
    setItemStorageOverwrite('favoriteRecipes', newFavs);
    return setSrcFav(whiteHeartIcon);
  }

  useEffect(() => {
    getFoodIdAPI();
    requestRecomendation();
  }, []);

  const handleData = () => {
    const dataInArray = Object.entries(food);
    const arrIng = [];
    dataInArray.forEach(([key, value]) => {
      if (key.includes('Ingredient') && value) arrIng.push(value);
    });
    const arrMeas = [];
    dataInArray.forEach(([key, value]) => {
      if (key.includes('Measure') && value) arrMeas.push(value);
    });
    const arrIngMeasure = [];
    arrIng.forEach((ing, index) => arrIngMeasure.push(`${ing} - ${arrMeas[index]}`));
    setArrIngMeas(arrIngMeasure);
  };

  const isDoneRecipe = () => {
    if (getItemStorage('doneRecipes')) {
      if (getItemStorage('doneRecipes')
        .some((e) => e.id === id)) {
        return setStartRecipe(false);
      }
      return setStartRecipe(true);
    }
  };

  const isProgressRecipe = () => {
    const objProgress = getItemStorageProgressRecipe('inProgressRecipes');
    if (history.location.pathname.includes('foods')) {
      const arrMealsProgress = Object.keys(objProgress.meals);
      if (arrMealsProgress) setRecipeInProgress(arrMealsProgress.some((e) => e === id));
    } else {
      const arrDrinksProgress = Object.keys(objProgress.cocktails);
      if (arrDrinksProgress) setRecipeInProgress(arrDrinksProgress.some((e) => e === id));
    }
  };

  useEffect(() => {
    isProgressRecipe();
  }, [startRecipe]);

  const handleStartRecipe = () => {
    const objProgress = getItemStorageProgressRecipe('inProgressRecipes');
    if (history.location.pathname.includes('foods')) {
      setItemStorage('objProgress', objProgress.meals[id] = recomendation);
    } else {
      setItemStorage('objProgress', objProgress.cocktails[id] = recomendation);
    }
  };

  const shareButton = () => {
    global.alert('Link copied!');
    clipboardCopy(window.location.href);
    setCopiedButton('false');
  };

  const favoriteRecipe = () => {
    const obj = {
      id: food.idMeal || food.idDrink,
      type: page === 'foods' ? 'food' : 'drink',
      nationality: food.strArea || '',
      category: food.strCategory || '',
      alcoholicOrNot: food.strAlcoholic || '',
      name: food.strMeal || food.strDrink,
      image: food.strMealThumb || food.strDrinkThumb,
    };
    setItemStorage('favoriteRecipes', obj);
    return setSrcFav(blackHeartIcon);
  };

  const handleFavorite = () => {
    const favFoods = getItemStorageArr('favoriteRecipes');
    if (favFoods) {
      if (favFoods.some((fav) => (fav.id === id))) {
        return removeFavorite();
      }
      return favoriteRecipe();
    }
  };

  const autoCheck = () => {
    const favFoods = getItemStorageArr('favoriteRecipes');
    if (favFoods.some((fav) => (fav.id === id))) return setSrcFav(blackHeartIcon);
    return setSrcFav(whiteHeartIcon);
  };

  useEffect(() => {
    handleData();
    isDoneRecipe();
    autoCheck();
  }, [food]);

  return (
    <section className="container">
      <h1 data-testid="recipe-title">
        { page === 'foods' ? food.strMeal : food.strDrink }
      </h1>
      <img
        data-testid="recipe-photo"
        src={ page === 'foods' ? food.strMealThumb : food.strDrinkThumb }
        alt={ page === 'foods' ? food.strMeal : food.strDrink }
        style={ { height: '30rem', width: '30rem' } }
      />
      {copiedButton ? (<span>Link copied!</span>) : (
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => shareButton() }
        >
          compartilhar
        </button>
      )}
      <button
        type="button"
        onClick={ handleFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ srcFav }
          alt="heart button"
        />
      </button>
      { page === 'foods' ? <h3 data-testid="recipe-category">{food.strCategory}</h3>
        : <h3 data-testid="recipe-category">{food.strAlcoholic}</h3>}
      <ol>
        {
          arrIngMeas.map((e, index) => (
            <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
              {e}
            </li>
          ))
        }
      </ol>
      <p data-testid="instructions">{food.strInstructions}</p>
      { page === 'foods' && (
        <iframe
          data-testid="video"
          type="text/html"
          width="640"
          height="360"
          src={ food.strYoutube ? food.strYoutube.replace('watch?v=', 'embed/') : '' }
          frameBorder="0"
          allowFullScreen
          title={ food.strMeal }
        />
      )}
      <div className="carousel">
        {
          recomendation.map((e, i) => (
            <div
              key={ i }
              data-testid={ `${i}-recomendation-card` }
              className="item"
            >
              <img
                style={ { height: '10rem' } }
                src={ e.strMealThumb || e.strDrinkThumb }
                alt="recipe thumbnail"
                className="image"
              />
              <p data-testid={ `${i}-recomendation-title` }>
                { e.strMeal || e.strDrink }
              </p>
            </div>))
        }
      </div>
      <footer>
        {startRecipe && (
          <Link
            to={ page === 'foods'
              ? `/foods/${id}/in-progress`
              : `/drinks/${id}/in-progress` }
          >
            <button
              type="button"
              data-testid="start-recipe-btn"
              style={ { position: 'fixed', bottom: '0px' } }
              onClick={ handleStartRecipe }
            >
              {recipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
            </button>
          </Link>
        )}
      </footer>
    </section>
  );
}

export default Recipe;
