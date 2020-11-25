import { createStore } from 'redux';
import appReducer from './reducers';
import { loadState, saveState } from '../utils/local-storage';

const persistedState = loadState();
const store = createStore(appReducer, persistedState);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
