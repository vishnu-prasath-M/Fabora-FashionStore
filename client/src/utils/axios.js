import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://fabora-fashionstore.onrender.com/api',

});

export default instance;
