import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-v3.igdb.com',
  headers: {
    'user-key': process.env.IGDB_KEY
  }
});

export default api;
