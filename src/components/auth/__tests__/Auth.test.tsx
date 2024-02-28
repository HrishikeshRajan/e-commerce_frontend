/* eslint-disable import/no-extraneous-dependencies */
import {
  screen, cleanup, fireEvent,
} from '@testing-library/react';
import { expect } from 'vitest';
import React from 'react';
import { renderWithProviders } from '@/mocks/redux/test-utils';
import Auth from '../Auth';

afterEach(cleanup);

describe('Auth ', () => {
  it('should toggle the form to Sign up form', () => {
    renderWithProviders(<Auth />);
    fireEvent.click(screen.getByTestId('DHA'));
    expect(
      screen.getByRole('textbox', { name: 'fullname' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'email' }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Password'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Sign up' }),
    ).toBeInTheDocument();
  });
  it('should toggle the Sign up form back to Sign in form', () => {
    renderWithProviders(<Auth />);
    fireEvent.doubleClick(screen.getByTestId('DHA'));
    expect(
      screen.queryByRole('textbox', { name: 'fullname' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'email' }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Password'),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Sign up' }),
    ).not.toBeInTheDocument();
  });
});
