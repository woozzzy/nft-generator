import { configureStore } from '@reduxjs/toolkit';

import configSlice from '../slices/configSlice';
import layerSlice from '../slices/layerSlice';

export const store = configureStore({
    reducer: {
        config: configSlice.reducer,
        layer: layerSlice.reducer,
    },
});