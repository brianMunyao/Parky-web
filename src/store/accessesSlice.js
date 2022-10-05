import { createSlice } from '@reduxjs/toolkit';
import { sortByDate } from '../config/utils';

const initialState = {
	accesses: [],
};

export const accessSlice = createSlice({
	name: 'accessSlice',
	initialState,
	reducers: {
		setAccesses: (state, action) => {
			state.accesses = action.payload;
		},
		addAccesses: (state, action) => {
			const new_accesses = [...state.accesses, action.payload];

			state.accesses = sortByDate(new_accesses, 'entry_time');
		},
		updateAccesses: (state, action) => {
			const new_accesses = [...state.accesses];

			state.accesses = new_accesses.map((acc) =>
				acc.id === action.payload.id ? action.payload : acc
			);
		},
	},
});

// Action creators
export const { setAccesses, addAccesses, updateAccesses } = accessSlice.actions;
export default accessSlice.reducer;
