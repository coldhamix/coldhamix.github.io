import React, { FunctionComponent } from 'react';
import { Card, Spinner } from '@shopify/polaris';
import { WeatherDetails } from '../../rest/weather';

export interface WeatherEmptyStateProps {
    loading: boolean;
    hasError: boolean;
    weather: WeatherDetails | null | undefined;
}

const WeatherEmptyState: FunctionComponent<WeatherEmptyStateProps> = ({ loading, hasError, weather }) => {
    return <Card title="Weather" sectioned>
        {!loading && !weather && <p>Search for any city or select one from your favorites</p>}
        {loading && <Spinner size="large" color="teal"/>}
        {hasError && <p>Unknown error occurred</p>}
    </Card>;
};

export default WeatherEmptyState;
