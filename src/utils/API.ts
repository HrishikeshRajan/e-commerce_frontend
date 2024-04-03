/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

export const CART = axios.create({
  baseURL: 'http://localhost:4000/api/v1/cart',
});
