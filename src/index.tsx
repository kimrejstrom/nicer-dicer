import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'styles.css';
import App from 'app/App';
import store from 'app/store';
import { apocalypseHandler } from 'apocalypseHandler';
import { ServiceWorkerProvider } from 'useServiceWorker';

render(
  <Provider store={store}>
    <ServiceWorkerProvider>
      <App />
    </ServiceWorkerProvider>
  </Provider>,
  document.getElementById('root'),
);

apocalypseHandler();
