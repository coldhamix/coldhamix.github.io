import { API_KEY, responseToJson } from './commons';

export function loadWeatherForCity(query: string, forecastDays = 3) {
    return fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=${forecastDays}`)
        .then(responseToJson);
}

export interface WeatherDetails {
    location: WeatherDetailsLocation;
    current: WeatherDetailsCurrent,
    forecast: WeatherDetailsForecast;
}

export interface WeatherDetailsLocation {
    name: string;
    country: string;
    region: string;
    localtime: string;
}

export interface WeatherDetailsCurrent {
    condition: WeatherDetailsCondition;
    temp_c: number;
}

export interface WeatherDetailsForecast {
    forecastday: WeatherDetailsForecastInfo[]
}

export interface WeatherDetailsForecastInfo {
    date: string;
    day: WeatherDetailsForecastInfoForDay;
}

export interface WeatherDetailsForecastInfoForDay {
    condition: WeatherDetailsCondition;
    avgtemp_c: number;
}

export interface WeatherDetailsCondition {
    text: string;
    icon: string;
}
