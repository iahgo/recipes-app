import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer>
      <nav
        style={ { position: 'fixed', bottom: '0px' } }
        data-testid="footer"
      >
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="drinks page"
          />
        </Link>
        <Link to="/foods">
          <img
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt="foods page"
          />
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
