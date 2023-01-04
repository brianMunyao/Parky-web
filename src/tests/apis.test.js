import axios from 'axios';

it('api', async () => {
	return axios.get('/api').then((res) => {
		expect(res.data).toBe('basic');
	});
});
