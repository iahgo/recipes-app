import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

function renderWithRouter(component) {
  const history = createBrowserHistory();

  const returnFromRender = render(
    <Router history={ history }>
      {component}
    </Router>,
  );

  return { history, ...returnFromRender };
}

export default renderWithRouter;