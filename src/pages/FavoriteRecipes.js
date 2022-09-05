import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getItemStorage, setItemStorageOverwrite } from '../services/localStorage';

function FavoriteRecipes() {
  const history = useHistory();

  const [copiedButton, setCopiedButton] = useState(false);
  const [arrDoneRecipes, setArrDoneRecipes] = useState(getItemStorage('favoriteRecipes'));

  const shareButton = (e) => {
    global.alert('Link copied!');
    const url = e.type === 'food' ? `foods/${e.id}` : `drinks/${e.id}`;
    clipboardCopy(`http://localhost:3000/${url}`);
    setCopiedButton('false');
  };

  const handleFilter = ({ target: { id } }) => {
    if (id === 'Food') {
      return setArrDoneRecipes(getItemStorage('favoriteRecipes')
        .filter((e) => e.type === 'food'));
    }
    if (id === 'Drinks') {
      return setArrDoneRecipes(getItemStorage('favoriteRecipes')
        .filter((e) => e.type === 'drink'));
    }
    return setArrDoneRecipes(getItemStorage('favoriteRecipes'));
  };

  const handleImage = (e) => {
    history.push(`/${e.type}s/${e.id}`);
  };

  const handleFavoriteRecipe = (e) => {
    const recipeFavorited = getItemStorage('favoriteRecipes');
    const newArray = recipeFavorited.filter((recipe) => recipe.id !== e.id);
    setItemStorageOverwrite('favoriteRecipes', newArray);
    setArrDoneRecipes(newArray);
  };

  return (
    <section>
      <header>
        <div className="iconHeader">
          <Link to="/profile">
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </Link>
          <h1 data-testid="page-title">Favorite Recipes</h1>
        </div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          id="All"
          onClick={ handleFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          id="Food"
          onClick={ handleFilter }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          id="Drinks"
          onClick={ handleFilter }
        >
          Drinks
        </button>
      </header>
      <main>
        {arrDoneRecipes
          && arrDoneRecipes.map((e, i) => (
            <div style={ { border: '1px solid black' } } key={ i }>
              <button type="button" onClick={ () => handleImage(e) }>
                <img
                  src={ e.image }
                  alt={ e.name }
                  data-testid={ `${i}-horizontal-image` }
                  style={ { height: '180px', width: '180px' } }
                />
              </button>
              <p data-testid={ `${i}-horizontal-top-text` }>
                {e.type === 'food'
                  ? (`${e.nationality} - ${e.category}`)
                  : (`${e.alcoholicOrNot} - ${e.category}`) }
              </p>
              <button type="button" onClick={ () => handleImage(e) }>
                <h3 data-testid={ `${i}-horizontal-name` }>{e.name}</h3>
              </button>
              {/* <p data-testid={ `${i}-horizontal-done-date` }>{e.doneDate}</p> */}
              {copiedButton ? (
                <span>Link copied!</span>
              ) : (
                <button
                  type="button"
                  onClick={ () => shareButton(e) }
                >
                  <img
                    src={ shareIcon }
                    alt="Share Icon"
                    data-testid={ `${i}-horizontal-share-btn` }
                  />
                </button>
              )}
              <button
                type="button"
                onClick={ () => handleFavoriteRecipe(e) }
              >
                <img
                  src={ blackHeartIcon }
                  alt="Favorite"
                  data-testid={ `${i}-horizontal-favorite-btn` }
                />
              </button>
            </div>))}
      </main>
    </section>
  );
}

export default FavoriteRecipes;
