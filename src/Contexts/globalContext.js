import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const globalContext = createContext({});

function GlobalProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  return (
    <globalContext.Provider
      value={ {
        foods,
        setFoods,
        drinks,
        setDrinks,
      } }
    >
      {children}
    </globalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes,
}.isRequired;

export default GlobalProvider;
