import md5 from 'md5';
import moment from 'moment';

export const isLoggedIn = (cookies) => {
	if (cookies.user === undefined || typeof cookies.user === 'string')
		return false;
	return true;
};

export const encrypt = (message) => {
	return md5(message);
};

export const convertMoney = (val, curr) => {
	return curr !== ''
		? 'Ksh ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		: val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const addEllipsis = (num, word) => {
	return word.length > num ? word.substring(0, num - 2) + '..' : word;
};

export const capitalize = (str = '') => {
	const arr = str.split(' ');
	let res = '';
	arr.forEach((word) => {
		res += ' ' + word.charAt(0).toUpperCase() + word.slice(1);
	});
	return res;
	// return str.charAt(0).toUpperCase() + str.slice(1);
};

export const removeSpaces = (str = '') => {
	return str.toLowerCase().replace(/\s/g, '');
};

export const getFee = (mins = 0) => {
	if (mins <= 15) return 0;
	else if (mins <= 30) return 20;
	else if (mins <= 60) return 50;
	else {
		const hrs = Math.ceil(mins / 60);
		return hrs * 50;
	}
};

export const sortByDate = (arr = [], key, descending = true) => {
	if (descending) return arr.sort((a, b) => moment(b[key]).diff(a[key]));

	return arr.sort((a, b) => moment(a[key]).diff(b[key]));
};

export const getMonthlyData = (arr = [], key = 'entry_time') => {
	let temp = {};

	arr.forEach((acc) => {
		const date = '01-' + moment(acc[key]).format('MM-YYYY');

		if (Object.keys(temp).includes(date)) {
			temp = { ...temp };
			temp[date] = [...temp[date], acc];
		} else {
			temp[date] = [acc];
		}
	});

	return temp;
};

export const getMonthlyTotals = (arr = [], key = 'amount') => {
	const monthlyData = getMonthlyData(arr);
	const result = [];

	Object.keys(monthlyData).forEach((month) => {
		const temp = {
			name: month, //moment(month, 'DD-MM-YYYY').format('MMM'),
			amount: getFeeSum(monthlyData[month], key),
		};
		result.push(temp);
	});

	let temp = result.sort((a, b) => moment(a.name).diff(b.name));

	temp = temp.map((a) => ({
		...a,
		name: moment(a.name, 'DD-MM-YYYY').format('MMM'),
	}));

	return temp;
};

export const getFeeSum = (arr = [], key = 'amount') => {
	let res = 0;
	arr.forEach((v) => {
		res += v[key];
	});

	return res;
};

export const getTimeDiff = (time1, time2) => {
	const diff = moment(time1).diff(time2, 'milliseconds');

	if (diff > 1000) {
		return `${diff / 1000} secs`;
	}
	return `${diff} ms`;
};
