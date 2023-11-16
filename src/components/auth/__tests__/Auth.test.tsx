/* eslint-disable import/no-extraneous-dependencies */
import {
  render, screen, cleanup, fireEvent,
} from '@testing-library/react';
import { expect } from 'vitest';
import React from 'react';
import Auth from '../Auth';

afterEach(cleanup);

describe('<Auth />', () => {
  it('should render an Sign in form by default', () => {
    render(<Auth />);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Sign In' }),
    ).toBeInTheDocument();
  });
  it('should render an Sign up form when clicked on Don\'t have an Account', () => {
    render(<Auth />);
    expect(screen.getByRole('form')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('DHA'));
    expect(
      screen.getByRole('heading', { name: 'Sign Up' }),
    ).toBeInTheDocument();
  });
});
