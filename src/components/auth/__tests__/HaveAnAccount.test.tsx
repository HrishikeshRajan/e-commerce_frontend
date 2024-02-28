/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */

import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';
import { renderWithProviders } from '@/mocks/redux/test-utils';
import HaveAnAccount from '../HaveAnAccount';

type Status = {
  signIn: boolean;
  changeSignIn: React.Dispatch<React.SetStateAction<boolean>>;
};
const mockChangeSignIn = vi.fn();
const status: Status = {
  signIn: true,
  changeSignIn: mockChangeSignIn,
};

afterEach(() => {
  vi.clearAllMocks();
});

it('should render a text which suggest "Have an Account?"', () => {
  renderWithProviders(<HaveAnAccount {...status} />);
  expect(screen.queryByText('Have an Account ?')).toBeInTheDocument();
});
it('should render a button with text "Sign in"', () => {
  renderWithProviders(<HaveAnAccount {...status} />);
  expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
});
