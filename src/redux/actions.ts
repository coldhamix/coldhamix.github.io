import { ADD_FAVORITE_CITY, REMOVE_FAVORITE_CITY, SHOW_CITY_WEATHER } from './actionTypes';

export interface ActionWithCity {
    type: typeof ADD_FAVORITE_CITY | typeof REMOVE_FAVORITE_CITY | typeof SHOW_CITY_WEATHER;
    payload: {
        cityName: string;
    }
}

export const addFavoriteCity = (cityName: string) => ({ type: ADD_FAVORITE_CITY, payload: { cityName } });

export const removeFavoriteCity = (cityName: string) => ({ type: REMOVE_FAVORITE_CITY, payload: { cityName } });

export const showCityWeather = (cityName: string) => ({ type: SHOW_CITY_WEATHER, payload: { cityName } });
