import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { globalContext } from '../Contexts/globalContext';
import { fetchSearchDrinks } from '../services/requestAPI';

function Drinks() {
  const { setDrinks } = useContext(globalContext);
  useEffect(() => {
    async function requestFoods() {
      const data = await fetchSearchDrinks('name', '');
      setDrinks(data.drinks);
    }
    requestFoods();
  }, []);

  return (
    <>
      <Header title="Drinks" isTrue drinks />
      <Recipes />
      <Footer />
    </>
  );
}

export default Drinks;
