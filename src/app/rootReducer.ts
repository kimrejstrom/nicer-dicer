import { combineReducers } from 'redux';
import rollsReducer from 'features/rollInput/rollInputSlice';
import modalReducer from 'components/Modal/modalSlice';
import presetsReducer from 'features/presets/presetsSlice';
import settingsReducer from 'features/settings/settingsSlice';

const rootReducer = combineReducers({
  rolls: rollsReducer,
  modalVisibility: modalReducer,
  presets: presetsReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
