import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://66d89d0e37b1cadd8055396d.mockapi.io/contacts',
});