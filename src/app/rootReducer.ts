import { combineReducers } from 'redux';
import themeReducer from 'features/theme/themeSlice';
import rollsReducer from 'features/rollInput/rollInputSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  rolls: rollsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
