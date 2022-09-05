import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { globalContext } from '../Contexts/globalContext';
import { fetchSearchFoods } from '../services/requestAPI';

function Foods() {
  const { setFoods } = useContext(globalContext);
  useEffect(() => {
    async function requestFoods() {
      const data = await fetchSearchFoods('name', '');
      setFoods(data.meals);
    }
    requestFoods();
  }, []);

  return (
    <>
      <Header title="Foods" isTrue foods />
      <Recipes />
      <Footer />
    </>
  );
}

export default Foods;
