import { configureStore, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';

import rootReducer, { RootState } from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: localForage,
  whitelist: ['presets', 'settings'],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
});

let persistor = persistStore(store);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export { store, persistor };
