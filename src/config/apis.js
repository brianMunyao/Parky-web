import axios from 'axios';

export const vehicleEnter = async (formData) => {
	const { data } = await axios.post('/api/vehicle/enter', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});

	return data;
};

export const vehicleExitPost = async (formData) => {
	const { data } = await axios.post('/api/vehicle/exit', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});

	return data;
};

export const vehicleEnterPut = async (obj) => {
	const { data } = await axios.put('/api/vehicle/exit', obj);

	return data;
};

//
//
//

export const getAccesses = async () => {
	const { data } = await axios.get('/api/accesses');
	return data;
};

export const getParkingMap = async () => {
	const { data } = await axios.get('/api/parkingMap');
	return data;
};

export const getLocations = async () => {
	const { data } = await axios.get('/api/locations');
	return data;
};

export const addLocation = async (newLoc) => {
	const { data } = await axios.post('/api/locations', newLoc);
	return data;
};

//
//
//
//

export const register = async (user) => {
	const { data } = await axios.post('/api/register', { user });
	return data;
};
export const login = async (user) => {
	const { data } = await axios.post('/api/login', { user });
	return data;
};
