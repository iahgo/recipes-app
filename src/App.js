import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import GlobalProvider from './Contexts/globalContext';
import RecipeInProgress from './pages/RecipeInProgress';
import './App.css';

function App() {
  return (
    <main>
      <GlobalProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/foods/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />
          <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </GlobalProvider>
    </main>
  );
}

export default App;
