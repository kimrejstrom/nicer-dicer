import { combineReducers } from 'redux';
import themeReducer from 'features/theme/themeSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
