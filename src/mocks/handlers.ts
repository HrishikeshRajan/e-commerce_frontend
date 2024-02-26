/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/register`, () => HttpResponse.json({
    message: {
      message: 'An verification link has been sent to your email address',
    },
    success: true,
    statusCode: 201,
  }, { status: 201 })),
];
