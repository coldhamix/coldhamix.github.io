import React, { FunctionComponent } from 'react';
import { WeatherDetailsCondition } from '../../rest/weather';
import { MediaCard } from '@shopify/polaris';
import styles from './WeatherCard.module.css';
import moment from 'moment';

export interface WeatherCardProps {
    date?: string;
    condition: WeatherDetailsCondition;
    temperature: number;
}

const WeatherCard: FunctionComponent<WeatherCardProps> = ({ date, condition, temperature }) => {
    const title = date ? moment(date).format('DD MMMM') : condition.text;
    const description = `${date ? `${condition.text},` : ''} ${temperature}°C`;
    return (
        <MediaCard title={title}
                   description={description}
                   size="small">
            <div className={styles.card}>
                <img alt="" src={condition.icon}/>
            </div>
        </MediaCard>
    );
};

export default WeatherCard;
