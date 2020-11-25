import React, { FunctionComponent, useCallback, useState } from 'react';
import { Autocomplete, Icon } from '@shopify/polaris';
import { SearchMinor } from '@shopify/polaris-icons';
import { loadCitiesForAutocomplete } from '../../rest/cities';
import styles from './CityAutocomplete.module.css';

export interface OptionDescriptor {
    value: string;
    label: React.ReactNode;
}

export interface CityAutocompleteProps {
    onCityChange: (city: string) => void;
}

const CityAutocomplete: FunctionComponent<CityAutocompleteProps> = ({ onCityChange }) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [options, setOptions] = useState<OptionDescriptor[]>([]);

    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    const updateText = useCallback(
        (value) => {
            setInputValue(value);

            if (!loading) {
                setLoading(true);
            }

            loadCitiesForAutocomplete(value)
                .then(cities => {
                    setLoading(false);
                    setOptions(cities.map(city => ({ label: city.name, value: city.name })));
                })
                .catch(() => {
                    setLoading(false);
                    setOptions([]);
                });
        },
        [loading],
    );

    const updateSelection = useCallback(([selectedCity]) => {
        setInputValue(selectedCity);
        setSelected([selectedCity]);
        onCityChange(selectedCity);
    }, [onCityChange]);

    const textField = (
        <Autocomplete.TextField
            onChange={updateText}
            label=""
            value={inputValue}
            prefix={<Icon source={SearchMinor} color="inkLighter"/>}
            placeholder="Search"
        />
    );

    return (
        <div>
            <Autocomplete
                options={options}
                selected={selected}
                onSelect={updateSelection}
                loading={loading}
                textField={textField}
                emptyState={<div className={styles.empty}>No cities match your request</div>}
            />
        </div>
    );
};

export default CityAutocomplete;
