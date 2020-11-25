import React from 'react';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import WeatherPage from './components/WeatherPage';

import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
    return (
        <AppProvider i18n={enTranslations}>
            <Provider store={store}>
                <WeatherPage/>
            </Provider>
        </AppProvider>
    );
}

export default App;
