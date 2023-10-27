import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stocks: [],
};

const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        set: (state, action) => {
            state.stocks = action.payload;
        },
        // turnOn: (state, action) => {

        // },
        turnOff: (state, action) => {
            return state?.stocks.filter((stock) => stock !== action.payload);
        },
        remove: (state) => {
            state.stocks = [];
        },
    },
});

export const { actions } = stocksSlice;
export default stocksSlice.reducer;
