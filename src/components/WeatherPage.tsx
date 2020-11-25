import React, { FunctionComponent, useEffect } from 'react';
import { Card, Layout, Page } from '@shopify/polaris';
import CityAutocomplete from './cities/CityAutocomplete';
import Weather from './weather/Weather';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers';
import { addFavoriteCity, removeFavoriteCity, showCityWeather } from '../redux/actions';
import { Dispatch } from 'redux';
import FavoriteList from './cities/FavoriteList';
import { coordsToString } from '../utils/geolocation';

export interface WeatherPageProps {
    favoriteCities: string[];
    currentCity: string;
    addFavoriteCity: (cityName: string) => void;
    removeFavoriteCity: (cityName: string) => void;
    showCityWeather: (cityName: string) => void;
}

const WeatherPage: FunctionComponent<WeatherPageProps> = (
    { favoriteCities, currentCity, addFavoriteCity, removeFavoriteCity, showCityWeather },
) => {

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => showCityWeather(coordsToString(position)),
            () => showCityWeather(''),
        );
    }, [showCityWeather]);

    return (
        <Page title="Weather App">
            <Layout>
                <Layout.Section secondary>
                    <Card sectioned>
                        <CityAutocomplete onCityChange={showCityWeather}/>
                    </Card>
                    <Card title="Favorite Cities" sectioned>
                        <FavoriteList showCityWeather={showCityWeather}
                                      favoriteCities={favoriteCities}
                                      currentCity={currentCity}/>
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Weather favoriteCities={favoriteCities}
                             addFavoriteCity={addFavoriteCity}
                             removeFavoriteCity={removeFavoriteCity}
                             cityName={currentCity}/>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

const mapStateToProps = ({ favoriteCities, currentCity }: AppState) => ({ favoriteCities, currentCity });
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addFavoriteCity: (cityName: string) => dispatch(addFavoriteCity(cityName)),
        removeFavoriteCity: (cityName: string) => dispatch(removeFavoriteCity(cityName)),
        showCityWeather: (cityName: string) => dispatch(showCityWeather(cityName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage);
