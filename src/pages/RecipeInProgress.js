import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { fetchFoodId } from '../services/requestAPI';
import { getItemStorage, getItemStorageArr, getItemStorageProgressRecipe,
  setItemStorage, setItemStorageOverwrite,
} from '../services/localStorage';
import './RecipeInProgress.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const history = useHistory();
  const { id } = useParams();

  const [food, setFood] = useState([]);
  const [copiedButton, setCopiedButton] = useState(false);
  const [page, setPage] = useState();
  const [arrIngMeas, setArrIngMeas] = useState([]);
  const [arrCheck, setArrCheck] = useState([]);
  const [isDisabledFinish, setIsDisabledFinish] = useState(true);
  const [srcFav, setSrcFav] = useState(whiteHeartIcon);

  const getFoodIdAPI = async () => {
    const strPage = history.location.pathname.split('/')[1];
    setPage(strPage);
    // if (history.location.pathname.includes('foods')
    //   || history.location.pathname.includes('drinks')) {
    const data = await fetchFoodId(strPage, id);
    setFood(data[Object.keys(data)[0]][0]);
    // }
  };

  useEffect(() => {
    getFoodIdAPI();
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

  const autoCheck = () => {
    const itemsProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (page === 'foods' && itemsProgress) setArrCheck(itemsProgress.meals[id]);
    if (page === 'drinks' && itemsProgress) setArrCheck(itemsProgress.cocktails[id]);
  };

  const autoCheckFav = () => {
    const favFoods = getItemStorageArr('favoriteRecipes');
    if (favFoods.some((fav) => (fav.id === id))) return setSrcFav(blackHeartIcon);
    return setSrcFav(whiteHeartIcon);
  };

  useEffect(() => {
    handleData();
    autoCheck();
    autoCheckFav();
  }, [food]);

  const disabledFinish = () => {
    if (arrCheck !== undefined
      && arrIngMeas.length === arrCheck.length) return setIsDisabledFinish(false);
    return setIsDisabledFinish(true);
  };

  useEffect(() => {
    disabledFinish();
  }, [arrCheck, arrIngMeas]);

  const shareButton = () => {
    global.alert('Link copied!');
    const url = page === 'foods' ? `foods/${id}` : `drinks/${id}`;
    clipboardCopy(`http://localhost:3000/${url}`);
    setCopiedButton('false');
  };

  // function handleFavorite() {
  //   const favFoods = getItemStorage('favoriteRecipes');
  //   if (favFoods || isFavorite) {
  //     if (history.location.pathname.includes('foods')) {
  //       return favFoods.some((fav) => (fav.id === food.idMeal));
  //     } if (history.location.pathname.includes('drinks')) {
  //       return favFoods.some((fav) => (fav.id === food.idDrink));
  //     }
  //   }
  // }

  function removeFavorite() {
    const favFoods = getItemStorage('favoriteRecipes');
    const newFavs = favFoods.filter((fav) => (fav.id !== id));
    setItemStorageOverwrite('favoriteRecipes', newFavs);
    return setSrcFav(whiteHeartIcon);
  }

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

  const addMarked = (ing) => {
    const itemsInProgress = getItemStorageProgressRecipe('inProgressRecipes');
    const newStorage = { ...itemsInProgress };
    if (page === 'foods' && arrCheck) newStorage.meals[id] = [...arrCheck, ing];
    if (page === 'drinks' && arrCheck) newStorage.cocktails[id] = [...arrCheck, ing];
    if (page === 'foods' && !arrCheck) newStorage.meals[id] = [ing];
    if (page === 'drinks' && !arrCheck) newStorage.cocktails[id] = [ing];
    setItemStorageOverwrite('inProgressRecipes', newStorage);
    if (!arrCheck) return setArrCheck([ing]);
    return setArrCheck([...arrCheck, ing]);
  };

  const handleMarkedIng = ({ target: { checked } }, ing) => {
    if (checked === true) return addMarked(ing);
    const itemsInProgress = getItemStorageProgressRecipe('inProgressRecipes');
    const newStorage = { ...itemsInProgress };
    if (page === 'foods') newStorage.meals[id] = arrCheck.filter((e) => e !== ing);
    if (page === 'drinks') newStorage.cocktails[id] = arrCheck.filter((e) => e !== ing);
    setItemStorageOverwrite('inProgressRecipes', newStorage);
    return setArrCheck(arrCheck.filter((e) => e !== ing));
  };

  const handleFinishRecipe = () => {
    let arrTags = '';
    if (food.strTags) {
      arrTags = food.strTags.split(',');
    }
    const date = new Date().toLocaleDateString().split('/');
    const removeDay = date.splice(1, 1)[0];
    const newArr = [removeDay].concat(date).join('/');
    const value = {
      id,
      type: page === 'foods' ? 'food' : 'drink',
      nationality: food.strArea || '',
      category: food.strCategory || '',
      alcoholicOrNot: food.strAlcoholic || '',
      name: food.strMeal || food.strDrink,
      image: food.strMealThumb || food.strDrinkThumb,
      doneDate: newArr, // quando-a-receita-foi-concluida,
      tags: arrTags || [], // array-de-tags-da-receita-ou-array-vazio
    };
    setItemStorage('doneRecipes', value);
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

  return (
    <section>
      <img
        src={ food.strMealThumb || food.strDrinkThumb }
        alt={ food.strMeal || food.strDrink }
        data-testid="recipe-photo"
        style={ { height: '15rem', width: '15rem' } }
      />
      <h1 data-testid="recipe-title">{food.strMeal || food.strDrink}</h1>
      { page === 'foods' ? <h3 data-testid="recipe-category">{food.strCategory}</h3>
        : <h3 data-testid="recipe-category">{food.strAlcoholic}</h3>}
      {copiedButton ? (
        <span>Link copied!</span>
      ) : (
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
        // onClick={handleFavorite() ? removeFavorite : favoriteRecipe}
        onClick={ handleFavorite }
      >
        <img
          data-testid="favorite-btn"
          // src={ handleFavorite() ? blackHeartIcon : whiteHeartIcon }
          src={ srcFav }
          alt="heart button"
        />
      </button>
      <ol>
        {
          arrIngMeas.map((el, index) => (
            <div data-testid={ `${index}-ingredient-step` } key={ index }>
              <input
                name={ index }
                id={ index }
                type="checkbox"
                onChange={ (event) => handleMarkedIng(event, el) }
                data-testid={ `${index}-check` }
                checked={ arrCheck !== undefined
                  ? arrCheck.some((e) => e === el) : false }
              />
              <label
                htmlFor={ index }
                className={ arrCheck
                  && arrCheck.some((e) => e === index) ? 'markedIngredient' : '' }
              >
                {el}
              </label>
            </div>
          ))
        }
      </ol>
      <p data-testid="instructions">{food.strInstructions}</p>
      <footer>
        <Link to="/done-recipes">
          <button
            type="button"
            onClick={ handleFinishRecipe }
            data-testid="finish-recipe-btn"
            style={ { position: 'fixed', bottom: '0px' } }
            disabled={ isDisabledFinish }
          >
            Finish Recipe
          </button>
        </Link>
      </footer>
    </section>
  );
}

export default RecipeInProgress;
