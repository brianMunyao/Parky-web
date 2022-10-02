import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	lastRefresh: null,
	occupancyMap: {},
	locations: [],
};

export const occupancySlice = createSlice({
	name: 'occupancySlice',
	initialState,
	reducers: {
		updateLastRefresh: (state, action) => {
			state.lastRefresh = action.payload;
		},
		updateOccupancyMap: (state, action) => {
			state.occupancyMap = action.payload;
		},
		updateLocations: (state, action) => {
			state.locations = action.payload;
		},
	},
});

// Action creators
export const { updateLastRefresh, updateOccupancyMap, updateLocations } =
	occupancySlice.actions;
export default occupancySlice.reducer;
