import axios from 'axios';

export const vehicleEnter = async(formData) => {
    const { data } = await axios.post('/api/vehicle/enter', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
};

export const vehicleExitPost = async(formData) => {
    const { data } = await axios.post('/api/vehicle/exit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
};

export const vehicleEnterPut = async(obj) => {
    const { data } = await axios.put('/api/vehicle/exit', obj);

    return data;
};

//
//
//

export const getAccesses = async() => {
    const { data } = await axios.get('/api/accesses');
    return data;
};