import { AppState } from '../redux/reducers';

const LOCAL_STORAGE_PERSIST_KEY = 'weatherAppState';

export const loadState = (): AppState | undefined => {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_PERSIST_KEY);
        if (serializedState === null) {
            return undefined;
        }
        const parsed = JSON.parse(serializedState);
        return { ...parsed, currentCity: '' };
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: AppState): void => {
    try {
        const serializedState = JSON.stringify({ favoriteCities: state.favoriteCities });
        localStorage.setItem(LOCAL_STORAGE_PERSIST_KEY, serializedState);
    } catch {
    }
};
