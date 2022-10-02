import md5 from 'md5';
import moment from 'moment';

export const isLoggedIn = (cookies) => {
    if (cookies.user === undefined) return false;
    return true;
};

export const encrypt = (message) => {
    return md5(message);
};

export const convertMoney = (val, curr) => {
    return curr !== '' ?
        'Ksh ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') :
        val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const addEllipsis = (num, word) => {
    return word.length > num ? word.substring(0, num - 2) + '..' : word;
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