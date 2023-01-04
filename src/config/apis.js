import axios from 'axios';

const url = (route = '') => `http://localhost:5000${route}`;

export const vehicleEnter = async (formData) => {
	const { data } = await axios.post(url('/api/vehicle/enter'), formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});

	return data;
};

export const vehicleExitPost = async (formData) => {
	const { data } = await axios.post(url('/api/vehicle/exit'), formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});

	return data;
};

export const vehicleEnterPut = async (obj) => {
	const { data } = await axios.put(url('/api/vehicle/exit'), obj);

	return data;
};

//
//
//

export const getAccesses = async (id) => {
	const { data } = await axios.get(url(`/api/accesses/${id}`));
	return data;
};

export const getParkingMap = async () => {
	const { data } = await axios.get(url('/api/parking-map'));
	return data;
};
export const getLocationImage = async (prefix) => {
	const { data } = await axios.get(url(`/api/location/image/${prefix}`));
	return data;
};

export const getLocations = async () => {
	const { data } = await axios.get(url('/api/locations'));
	return data;
};

export const addLocation = async (newLoc) => {
	const { data } = await axios.post(url('/api/locations'), newLoc);
	return data;
};

export const configureSpots = async (formData) => {
	const { data } = await axios.post(url('/api/configure-spaces'), formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});

	return data;
};

export const sendSMS = async (to, message) => {
	const { data } = await axios.post(url('/api/send-sms'), { to, message });

	return data;
};

export const testDevTools = async (formData) => {
	const { data } = await axios.post(url('/api/dev-tools'), formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});

	return data;
};

export const getParkingStatus = async () => {
	const { data } = await axios.get(url('/api/parking-status'));

	return data;
};

//
//
//
//

export const register = async (user) => {
	const { data } = await axios.post(url('/api/register'), user);
	return data;
};
export const login = async (user) => {
	const { data } = await axios.post(url('/api/login'), user);
	return data;
};
export const updatePassword = async (obj) => {
	const { data } = await axios.post(url('/api/users/update-password'), obj);
	return data;
};
