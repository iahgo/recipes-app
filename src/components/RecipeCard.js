import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeCard({ index, recipeName, thumb, id, page }) {
  const history = useHistory();
  const handleImage = () => {
    history.push(`/${page}/${id}`);
  };
  return (
    // https://www.themealdb.com/api/json/v1/1/search.php?s=
    <div
      type="button"
      data-testid={ `${index}-recipe-card` }
      style={ { padding: '0.5rem' } }
      onClick={ handleImage }
      aria-hidden="true"
    >
      <img
        style={ { height: '10rem' } }
        src={ thumb }
        alt="recipe thumbnail"
        data-testid={ `${index}-card-img` }
      />
      <p
        data-testid={ `${index}-card-name` }
      >
        { recipeName }
      </p>
    </div>
  );
}

RecipeCard.propTypes = {
  recipeName: PropTypes.string,
  index: PropTypes.number,
  thumb: PropTypes.string,
}.isRequired;

export default RecipeCard;
