import { combineReducers } from 'redux';
import rollsReducer from 'features/rollInput/rollInputSlice';

const rootReducer = combineReducers({
  rolls: rollsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
