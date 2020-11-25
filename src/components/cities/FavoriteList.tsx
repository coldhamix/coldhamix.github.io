import React, { FunctionComponent } from 'react';
import { OptionList } from '@shopify/polaris';

export interface FavoriteListProps {
    favoriteCities: string[];
    currentCity: string;
    showCityWeather: (cityName: string) => void;
}

type OptionListChangeListener = (selected: string[]) => void;

const FavoriteList: FunctionComponent<FavoriteListProps> = ({ favoriteCities, currentCity, showCityWeather }) => {
    const showFavoriteCityWeather: OptionListChangeListener = ([cityName]) => showCityWeather(cityName);

    if (favoriteCities.length === 0) {
        return <div>No favorite cities yet</div>;
    }

    return (
        <OptionList
            onChange={showFavoriteCityWeather}
            options={favoriteCities.map(city => ({ value: city, label: city }))}
            selected={[currentCity]}
        />
    );
};

export default FavoriteList;
