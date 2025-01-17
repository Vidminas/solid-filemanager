import React from 'react';
import { createRoot } from 'react-dom/client';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './Reducers/reducer';
import * as serviceWorker from './serviceWorker';
import { CacheProvider } from "@emotion/react";
import { TssCacheProvider } from "tss-react";
import createCache from "@emotion/cache";
import App from './App';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const store = createStore(reducer, applyMiddleware(thunk));
const muiCache = createCache({
    "key": "mui",
    "prepend": true
});

const tssCache = createCache({
    "key": "tss"
});

const root = createRoot(document.getElementById('root')!);
root.render(
    <Provider store={store}>
        <CacheProvider value={muiCache}>
            <TssCacheProvider value={tssCache}> 
                <App />
            </TssCacheProvider>
        </CacheProvider>
    </Provider >
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// see issue https://github.com/Otto-AA/solid-filemanager/issues/26
serviceWorker.unregister();
/*
serviceWorker.register({
    onUpdate: (config) => {
        console.group('serviceWorker.onUpdate');
        console.log(config);
        console.groupEnd();
    },
    onSuccess: (config) => {
        console.group('serviceWorker.onSuccess');
        console.log(config);
        console.groupEnd();
    }
});
*/