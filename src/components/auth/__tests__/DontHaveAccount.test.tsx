/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';
import { renderWithProviders } from '@/mocks/redux/test-utils';

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
  renderWithProviders(<DontHaveAccount {...status} />);
  expect(screen.getByText("Don't have an Account ?")).toBeInTheDocument();
});
it('should render a button to toggle form', () => {
  renderWithProviders(<DontHaveAccount {...status} />);
  expect(screen.getByRole('button', { name: 'Sign up here' })).toBeInTheDocument();
});
