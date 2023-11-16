/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';
import DontHaveAccount from '../DontHaveAccount';

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

it('should render a text which suggest "Don\'t have an Account?"', () => {
  render(<DontHaveAccount {...status} />);
  expect(screen.getByText("Don't have an Account?")).toBeInTheDocument();
});
it('should render a button with text "Sign up"', () => {
  render(<DontHaveAccount {...status} />);
  expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
});
