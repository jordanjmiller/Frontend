import axios from 'axios';

export const axiosWithAuth = () => {
    const token = sessionStorage.getItem('token');

    return axios.create({
        baseURL: 'https://ddq.herokuapp.com/api',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
    });
};