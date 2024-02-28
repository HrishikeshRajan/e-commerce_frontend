/* eslint-disable import/no-extraneous-dependencies */
import {
  getResponse, http, HttpResponse,
} from 'msw';

export const handlers = [
  http.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/register`, async () => HttpResponse.json({
    message: {
      message: 'An verification link has been sent to your email address',
    },
    success: true,
    statusCode: 201,
  }, { status: 201 })),
  http.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/verify`, async () => HttpResponse.json({
    message: {
      message: 'Greate! Your account has been verified!',
      meta: 'Now it\'s shopping time',
    },
    success: true,
    statusCode: 202,
  }, { status: 202 })),
  http.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/login`, async () => HttpResponse.json({
    message: {
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Implbm5pZS5uaWNob2xzQGV4YW1wbGUuY29tIiwiaWQiOiI2NWRkN2FkY2E4MjUwOTM0MWQ5MTk4YWEiLCJsb2dnZWRJbiI6dHJ1ZSwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDkwMTM5MDMsImV4cCI6MTcwOTE4NjcwM30.ZzPuKoIieN5__xawZ2durONxx_OvMEyHCPuepb4CNbY',
      user: {
        _id: '65dd7adca82509341d9198aa',
        fullname: 'Jennie Nichols',
        email: 'jennie.nichols@example.com',
        role: 'user',
        emailVerified: true,
        isPrimeUser: false,
        seller: false,
        address: [],
        __v: 0,
      },
    },
    success: true,
    statusCode: 200,
  }, { status: 200 })),
  http.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/forgot`, async () => HttpResponse.json({
    message: {
      message: 'An email verification link has been send to your email accounts',

    },
    success: true,
    statusCode: 200,
  }, { status: 200 })),
];

export const myResponse = async (path:string) => {
  const request = new Request(`${import.meta.env.VITE_BASE_URL}/${path}`, { method: 'POST' });
  const response = await getResponse(handlers, request);
  return response?.json();
};
