import { render, screen } from '@testing-library/react';
import HaveAnAccount from '../HaveAnAccount';
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

it('should render a text which suggest "Have an Account?"', () => {
  render(<HaveAnAccount {...status} />);
  expect(screen.getByText("Have an Account?")).toBeInTheDocument();
});
it('should render a button with text "Sign in"', () => {
  render(<HaveAnAccount {...status} />);
  expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
});
