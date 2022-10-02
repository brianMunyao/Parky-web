import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    appWidth: window.innerWidth,
};

export const widthSlice = createSlice({
    name: 'appWidthSlice',
    initialState,
    reducers: {
        updateAppWidth: (state, action) => {
            state.appWidth = action.payload;
        },
    },
});

// Action creators
export const { updateAppWidth } = widthSlice.actions;
export default widthSlice.reducer;