import { render, screen } from '@testing-library/react';
import DontHaveAccount from '../DontHaveAccount';
import { vi } from 'vitest';

type Status = {
  signIn: Boolean;
  changeSignIn: React.Dispatch<React.SetStateAction<Boolean>>;
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
