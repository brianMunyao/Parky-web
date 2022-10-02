import { configureStore } from '@reduxjs/toolkit';

import mainReducer from './mainSlice';
import accessReducer from './accessesSlice';
import occupancyReducer from './occupancySlice';

export const store = configureStore({
	reducer: {
		mainReducer: mainReducer,
		accessesReducer: accessReducer,
		occupancyReducer: occupancyReducer,
	},
	devTools: true,
});
