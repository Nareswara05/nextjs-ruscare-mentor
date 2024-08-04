import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.ruscarestudent.com/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`,
        'Accept': 'application/json'
    },
});

export default instance;
