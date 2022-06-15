import { configureStore } from '@reduxjs/toolkit';

import configSlice from '../slices/configSlice';

export const store = configureStore({
    reducer: {
        config: configSlice.reducer,
    },
});