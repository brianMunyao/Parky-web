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

export const getAccesses = async (id) => {
	const { data } = await axios.get(`/api/accesses/${id}`);
	return data;
};

export const getParkingMap = async () => {
	const { data } = await axios.get('/api/parking-map');
	return data;
};
export const getLocationImage = async (prefix) => {
	const { data } = await axios.get(`/api/location/image/${prefix}`);
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

export const configureSpots = async (formData) => {
	const { data } = await axios.post('/api/configure-spaces', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});

	return data;
};

//
//
//
//

export const register = async (user) => {
	const { data } = await axios.post('/api/register', user);
	return data;
};
export const login = async (user) => {
	const { data } = await axios.post('/api/login', user);
	return data;
};
