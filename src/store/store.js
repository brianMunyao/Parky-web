import { configureStore } from '@reduxjs/toolkit';

import widthReducer from './widthSlice';
import accessReducer from './accessesSlice';

export const store = configureStore({
    reducer: {
        appWidthReducer: widthReducer,
        accessesReducer: accessReducer,
    },
    devTools: true,
});