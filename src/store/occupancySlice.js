import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
// 	lastRefresh: null,
// 	occupancyMap: {},
// 	locations: [],
// };
const initialState = {
	lastRefresh: null,
	occupancyMap: {
		// 'GreenSpan Mall': [
		// 	{
		// 		lot_coords: '[[329, 490], [396, 402], [257, 389], [193, 466]]',
		// 		lot_id: 42,
		// 		lot_location_id: 12,
		// 		lot_name: 'GM-42',
		// 		occupied: true,
		// 	},
		// 	{
		// 		lot_coords:
		// 			'[[389, 415], [334, 490], [334, 490], [445, 492], [476, 412]]',
		// 		lot_id: 43,
		// 		lot_location_id: 12,
		// 		lot_name: 'GM-43',
		// 		occupied: false,
		// 	},
		// 	{
		// 		lot_coords:
		// 			'[[482, 422], [458, 497], [458, 497], [595, 500], [595, 500], [605, 422]]',
		// 		lot_id: 44,
		// 		lot_location_id: 12,
		// 		lot_name: 'GM-44',
		// 		occupied: true,
		// 	},
		// 	{
		// 		lot_coords: '[[611, 412], [616, 497], [719, 497], [719, 410]]',
		// 		lot_id: 45,
		// 		lot_location_id: 12,
		// 		lot_name: 'GM-45',
		// 		occupied: false,
		// 	},
		// 	{
		// 		lot_coords: '[[729, 422], [745, 505], [866, 513], [814, 415]]',
		// 		lot_id: 46,
		// 		lot_location_id: 12,
		// 		lot_name: 'GM-46',
		// 		occupied: false,
		// 	},
		// 	{
		// 		lot_coords:
		// 			'[[866, 495], [822, 410], [913, 402], [980, 500], [980, 500]]',
		// 		lot_id: 47,
		// 		lot_location_id: 12,
		// 		lot_name: 'GM-47',
		// 		occupied: true,
		// 	},
		// 	{
		// 		lot_coords:
		// 			'[[1005, 500], [944, 412], [944, 412], [1026, 399], [1122, 461], [1122, 461]]',
		// 		lot_id: 48,
		// 		lot_location_id: 12,
		// 		lot_name: 'GM-48',
		// 		occupied: true,
		// 	},
		// 	{
		// 		lot_coords: '[[27, 665], [190, 670], [296, 536], [131, 510]]',
		// 		lot_id: 49,
		// 		lot_location_id: 12,
		// 		lot_name: 'GM-49',
		// 		occupied: true,
		// 	},
		// 	{
		// 		lot_coords:
		// 			'[[224, 668], [224, 668], [311, 523], [461, 526], [389, 691]]',
		// 		lot_id: 50,
		// 		lot_location_id: 12,
		// 		lot_name: 'GM-50',
		// 		occupied: true,
		// 	},
		// 	{
		// 		lot_coords:
		// 			'[[404, 668], [476, 500], [608, 528], [582, 673], [582, 673]]',
		// 		lot_id: 51,
		// 		lot_location_id: 12,
		// 		lot_name: 'GM-51',
		// 		occupied: false,
		// 	},
		// 	{
		// 		lot_coords:
		// 			'[[598, 662], [611, 533], [611, 533], [740, 536], [765, 668]]',
		// 		lot_id: 52,
		// 		lot_location_id: 12,
		// 		lot_name: 'GM-52',
		// 		occupied: true,
		// 	},
		// 	{
		// 		lot_coords:
		// 			'[[784, 662], [755, 546], [889, 531], [949, 665], [949, 665]]',
		// 		lot_id: 53,
		// 		lot_location_id: 12,
		// 		lot_name: 'GM-53',
		// 		occupied: true,
		// 	},
		// 	{
		// 		lot_coords:
		// 			'[[964, 660], [900, 541], [1036, 526], [1132, 655]]',
		// 		lot_id: 54,
		// 		lot_location_id: 12,
		// 		lot_name: 'GM-54',
		// 		occupied: true,
		// 	},
		// 	{
		// 		lot_coords:
		// 			'[[1153, 642], [1039, 528], [1189, 495], [1264, 585]]',
		// 		lot_id: 55,
		// 		lot_location_id: 12,
		// 		lot_name: 'GM-55',
		// 		occupied: true,
		// 	},
		// ],
		// 'thika road mall': 'Parking lots not configured',
	},
	locations: [
		// {
		// 	admin_id: 1,
		// 	loc_id: 12,
		// 	loc_name: 'GreenSpan Mall',
		// 	prefix: 'GM',
		// },
		// {
		// 	admin_id: 1,
		// 	loc_id: 13,
		// 	loc_name: 'thika road mall',
		// 	prefix: 'TRM',
		// },
	],
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
		setLocations: (state, action) => {
			state.locations = action.payload;
		},
		addNewLocation: (state, action) => {
			const _locations = [...state.locations];
			_locations.push(action.payload);
			state.locations = _locations;
		},
		updateLocations: (state, action) => {
			const _locations = [...state.locations];

			state.locations = _locations.map((acc) =>
				acc.id === action.payload.id ? action.payload : acc
			);
		},
		deleteLocation: (state, action) => {
			const _locations = state.locations.filter(
				(loc) => loc.loc_id !== action.payload
			);

			state.locations = _locations;
		},
	},
});

// Action creators
export const {
	updateLastRefresh,
	updateOccupancyMap,
	setLocations,
	addNewLocation,
	updateLocations,
	deleteLocation,
} = occupancySlice.actions;
export default occupancySlice.reducer;
