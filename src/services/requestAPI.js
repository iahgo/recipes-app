const FIRST_LETTER = 'first-letter';
export const fetchSearchFoods = async (type, value) => {
  let URL;
  if (type === FIRST_LETTER && value.length !== 1) {
    global.alert('Your search must have only 1 (one) character');
    return 'alert';
  }
  if (type === 'ingredient') URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
  if (type === 'name') URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
  if (type === FIRST_LETTER) URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchSearchDrinks = async (type, value) => {
  let URL;
  if (type === FIRST_LETTER && value.length !== 1) {
    global.alert('Your search must have only 1 (one) character');
    return 'alert';
  }
  if (type === 'ingredient') URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;
  if (type === 'name') URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
  if (type === FIRST_LETTER) URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchFoodId = async (page, id) => {
  let URL;
  if (page === 'foods') URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  if (page === 'drinks') URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchCategories = async (page) => {
  let URL;
  const FIVE = 5;
  if (page === 'Foods') {
    URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(URL);
    const data = await response.json();
    if (data.meals) return data.meals.slice(0, FIVE);
  }

  if (page === 'Drinks') {
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(URL);
    const data = await response.json();
    if (data.drinks) return data.drinks.slice(0, FIVE);
  }
};

export const fetchFoodByCategory = async (page, category) => {
  let URL;
  if (page === 'foods') URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  if (page === 'drinks') URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};
