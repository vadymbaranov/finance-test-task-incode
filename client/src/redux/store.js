import { configureStore } from '@reduxjs/toolkit';
import stocksReducer from './stocks';

const store = configureStore({
    reducer: {
        stocks: stocksReducer,
    },
});

export default store;
