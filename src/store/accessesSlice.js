import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accesses: [],
};

export const accessSlice = createSlice({
    name: 'accessSlice',
    initialState,
    reducers: {
        updateAccesses: (state, action) => {
            state.accesses = action.payload;
        },
    },
});

// Action creators
export const { updateAccesses } = accessSlice.actions;
export default accessSlice.reducer;