import { ADD_FAVORITE_CITY, REMOVE_FAVORITE_CITY, SHOW_CITY_WEATHER } from './actionTypes';
import { ActionWithCity } from './actions';

export interface AppState {
    favoriteCities: string[];
    currentCity: string;
}

const initialState: AppState = {
    favoriteCities: [],
    currentCity: '',
};

export default function appReducer(state: AppState = initialState, action: ActionWithCity) {
    switch (action.type) {

        case ADD_FAVORITE_CITY: {
            const { cityName } = action.payload;
            return addFavoriteCity(state, cityName);
        }

        case REMOVE_FAVORITE_CITY: {
            const { cityName } = action.payload;
            return removeFavoriteCity(state, cityName);
        }

        case SHOW_CITY_WEATHER: {
            const { cityName } = action.payload;
            return showCityWeather(state, cityName);
        }

        default:
            return state;
    }
}


function addFavoriteCity(state: AppState, cityName: string): AppState {
    const favorites = [...state.favoriteCities];

    const index = favorites.indexOf(cityName);
    if (index === -1) {
        favorites.push(cityName);
    }

    return { favoriteCities: favorites, currentCity: cityName };
}


function removeFavoriteCity(state: AppState, cityName: string): AppState {
    const favorites = [...state.favoriteCities];

    const index = favorites.indexOf(cityName);
    if (index >= 0) {
        favorites.splice(index, 1);
    }

    return { ...state, favoriteCities: favorites };
}

function showCityWeather(state: AppState, cityName: string): AppState {
    return { ...state, currentCity: cityName };
}
