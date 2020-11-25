import { API_KEY, responseToJson } from './commons';

export function loadCitiesForAutocomplete(query: string): Promise<CityForAutocomplete[]> {
    return fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`)
        .then(responseToJson);
}

export interface CityForAutocomplete {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
}
