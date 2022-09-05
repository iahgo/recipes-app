export const setItemStorageOverwrite = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemStorage = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return '';
};

export const getItemStorageArr = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return [];
};

export const getItemStorageProgressRecipe = (key) => {
  if (localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key));
  return { cocktails: {}, meals: {} };
};

export const setItemStorage = (key, value) => {
  const prev = JSON.parse(localStorage.getItem(key));
  if (prev) {
    localStorage.setItem(key, JSON.stringify([...prev, value]));
    return;
  }
  localStorage.setItem(key, JSON.stringify([value]));
};

// const removeItemStorage = (key) => {
//   localStorage.removeItem(key);
// };

// const clearStorage = () => {
//   localStorage.clear();
// };

// [{
//   id: id-da-receita,
//   type: food-ou-drink,
//   nationality: nacionalidade-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//   name: nome-da-receita,
//   image: imagem-da-receita
// }]
