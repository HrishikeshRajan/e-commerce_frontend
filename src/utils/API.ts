/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

export const USER = axios.create({
  baseURL: 'http://localhost:4000/api/v1/users/',
});

export const PRODUCT = axios.create({
  baseURL: 'http://localhost:4000/api/v1/product',
});

export const CART = axios.create({
  baseURL: 'http://localhost:4000/api/v1/cart',
});

export const ORDER = axios.create({
  baseURL: 'http://localhost:4000/api/v1/orders/',
  withCredentials: true,
});
