import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	appWidth: window.innerWidth,
};

export const mainSlice = createSlice({
	name: 'mainSlice',
	initialState,
	reducers: {
		updateAppWidth: (state, action) => {
			state.appWidth = action.payload;
		},
	},
});

// Action creators
export const { updateAppWidth } = mainSlice.actions;
export default mainSlice.reducer;
