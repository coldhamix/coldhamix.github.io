import React, { FunctionComponent, useEffect, useState } from 'react';
import { Card, Heading } from '@shopify/polaris';
import { loadWeatherForCity, WeatherDetails } from '../../rest/weather';
import WeatherCard from './WeatherCard';
import styles from './Weather.module.css';
import WeatherEmptyState from './WeatherEmptyState';

export interface WeatherProps {
    cityName: string;
    favoriteCities: string[];
    addFavoriteCity: (cityName: string) => void;
    removeFavoriteCity: (cityName: string) => void;
}

const Weather: FunctionComponent<WeatherProps> = ({ cityName, favoriteCities, addFavoriteCity, removeFavoriteCity }) => {

    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState<WeatherDetails | null>();
    const [hasError, setHasError] = useState(false);

    function resetState() {
        setLoading(false);
        setHasError(false);
        setWeather(null);
    }

    useEffect(() => {

        resetState();
        setLoading(true);

        const trimmedCityName = cityName.trim();
        if (trimmedCityName.length === 0) {
            setLoading(false);
            return;
        }

        loadWeatherForCity(cityName)
            .then(weather => {
                resetState();
                setWeather(weather);
            })
            .catch(() => {
                resetState();
                setHasError(true);
            });
    }, [cityName]);

    if (!weather || loading || hasError) {
        return <WeatherEmptyState loading={loading}
                                  hasError={hasError}
                                  weather={weather}/>;
    }

    const { location, current, forecast } = weather;
    const city = `${location.name}, ${location.region}, ${location.country}`;
    return (
        <Card title={city}
              actions={buildFavoriteActions(favoriteCities, addFavoriteCity, removeFavoriteCity, city)}
              sectioned>
            <WeatherCard
                condition={current.condition}
                temperature={current.temp_c}/>
            <div className={styles.forecastHeading}>
                <Heading>Forecast</Heading>
            </div>
            {forecast.forecastday.map(forecast => (
                <WeatherCard
                    key={forecast.date}
                    date={forecast.date}
                    condition={forecast.day.condition}
                    temperature={forecast.day.avgtemp_c}/>
            ))}
        </Card>
    );
};

function buildFavoriteActions(
    favoriteCities: string[],
    addFavoriteCity: (cityName: string) => void,
    removeFavoriteCity: (cityName: string) => void,
    city: string,
) {
    return [
        !favoriteCities.includes(city)
            ? { content: 'Add to favorites', onAction: () => addFavoriteCity(city) }
            : { content: 'Remove from favorites', onAction: () => removeFavoriteCity(city) },
    ];
}

export default Weather;
