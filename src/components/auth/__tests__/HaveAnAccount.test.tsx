/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */

import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';
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

it.skip('should render a text which suggest "Have an Account?"', () => {
  render(<HaveAnAccount {...status} />);
  expect(screen.getByText('Have an Account?')).toBeInTheDocument();
});
it.skip('should render a button with text "Sign in"', () => {
  render(<HaveAnAccount {...status} />);
  expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
});
