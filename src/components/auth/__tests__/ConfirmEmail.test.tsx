/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '@/mocks/redux/test-utils';
import { server } from '@/mocks/node';
import { HttpResponse, delay, http } from 'msw';
import { StatusCodes } from 'http-status-codes';
import ConfirmEmail from '../ConfirmEmail';

describe('Confirm Email', () => {
  it('should render a heading', () => {
    renderWithProviders(<ConfirmEmail />);
    expect(screen.getByText(/wondercart/i)).toBeInTheDocument();
  });
  it('should render a waiting message during verification', () => {
    server.use(http.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/verify`, async () => {
      await delay(200);
      return HttpResponse.json({
        message: {
          message: 'Greate! Your account has been verified!',
          meta: 'Now it\'s shopping time',
        },
        success: true,
        statusCode: StatusCodes.ACCEPTED,
      }, { status: StatusCodes.ACCEPTED });
    }));
    renderWithProviders(<ConfirmEmail />);
    expect(screen.getByRole('heading', { name: /Please wait while we confirm your email./i })).toBeInTheDocument();
  });
  it('should render a loading animation during verification', () => {
    server.use(http.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/verify`, async () => {
      await delay(200);
      return HttpResponse.json({
        message: {
          message: 'Greate! Your account has been verified!',
          meta: 'Now it\'s shopping time',
        },
        success: true,
        statusCode: StatusCodes.ACCEPTED,
      }, { status: StatusCodes.ACCEPTED });
    }));
    renderWithProviders(<ConfirmEmail />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  it('should render a success message after successfull verification', async () => {
    renderWithProviders(<ConfirmEmail />);
    expect(await screen.findByText(/Greate! Your account has been verified!/i)).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Please wait while we confirm your email./i })).not.toBeInTheDocument();
  });
  it('should render a button to login after successfull verification', async () => {
    renderWithProviders(<ConfirmEmail />);
    expect(await screen.findByRole('button', { name: /SHOP NOW/i })).toBeInTheDocument();
  });
  it('should render an error message on expired token', async () => {
    server.use(http.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/verify`, async () => HttpResponse.json({
      message: {
        error: 'Verification link has been expired',
      },
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    }, { status: StatusCodes.INTERNAL_SERVER_ERROR })));
    renderWithProviders(<ConfirmEmail />);
    expect(await screen.findByText(/Verification link has been expired/i)).toBeInTheDocument();

    expect(screen.queryByText(/Greate! Your account has been verified!/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Please wait while we confirm your email./i })).not.toBeInTheDocument();
  });
  it('should render a button to try again the on failed verification', async () => {
    server.use(http.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/verify`, async () => HttpResponse.json({
      message: {
        error: 'Verification link has been expired',
      },
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    }, { status: StatusCodes.INTERNAL_SERVER_ERROR })));
    renderWithProviders(<ConfirmEmail />);
    expect(await screen.findByRole('button', { name: /try again/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /SHOP NOW/i })).not.toBeInTheDocument();
  });
});
