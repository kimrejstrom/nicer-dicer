import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'styles.css';
import App from 'app/App';
import { store, persistor } from 'app/store';
import { apocalypseHandler } from 'apocalypseHandler';
import { ServiceWorkerProvider } from 'useServiceWorker';
import { Loading } from 'components/Loading/Loading';

render(
  <Provider store={store}>
    <ServiceWorkerProvider>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <App />
      </PersistGate>
    </ServiceWorkerProvider>
  </Provider>,
  document.getElementById('root'),
);

apocalypseHandler();
