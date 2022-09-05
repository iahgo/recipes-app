import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { Link, useHistory } from 'react-router-dom';
import { getItemStorage } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function DoneRecipes() {
  const history = useHistory();

  const [copiedButton, setCopiedButton] = useState(false);
  const [arrDoneRecipes, setArrDoneRecipes] = useState(getItemStorage('doneRecipes'));

  const shareButton = (e) => {
    global.alert('Link copied!');
    const url = e.type === 'food' ? `foods/${e.id}` : `drinks/${e.id}`;
    clipboardCopy(`http://localhost:3000/${url}`);
    setCopiedButton('false');
  };

  const handleFilter = ({ target: { id } }) => {
    if (id === 'Food') {
      return setArrDoneRecipes(getItemStorage('doneRecipes')
        .filter((e) => e.type === 'food'));
    }
    if (id === 'Drinks') {
      return setArrDoneRecipes(getItemStorage('doneRecipes')
        .filter((e) => e.type === 'drink'));
    }
    return setArrDoneRecipes(getItemStorage('doneRecipes'));
  };

  const handleImage = (e) => {
    history.push(`/${e.type}s/${e.id}`);
  };

  return (
    <section>
      <header>
        <div className="iconHeader">
          <Link to="/profile">
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </Link>
          <h1 data-testid="page-title">Done Recipes</h1>
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
            <p data-testid={ `${i}-horizontal-done-date` }>{e.doneDate}</p>
            {/* <button type="button">
              <img
                src={ shareIcon }
                alt="Share Icon"
                data-testid={ `${i}-horizontal-share-btn` }
              />
            </button> */}
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
            {e.tags
            && e.tags.map((tag, index) => (
              <p key={ index } data-testid={ `${i}-${tag}-horizontal-tag` }>{tag}</p>
            ))}
          </div>))}
      </main>
    </section>
  );
}

export default DoneRecipes;
