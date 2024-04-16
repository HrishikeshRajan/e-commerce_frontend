import { renderWithProviders } from '@/mocks/redux/test-utils';
import { screen } from '@testing-library/react';
import ForgotPassword from '../ForgotPassword';

describe('Forgot Password Button', () => {
  it('should render a button with text "Forgot password ?"', async () => {
    renderWithProviders(<ForgotPassword />);
    expect(screen.queryByRole('button', { name: /Forgot password/i })).toBeInTheDocument();
  });
  it('The button should be enabled', async () => {
    renderWithProviders(<ForgotPassword />);
    expect(screen.queryByRole('button', { name: /Forgot password/i })).toBeEnabled();
  });
  it('The button should be of type button', async () => {
    renderWithProviders(<ForgotPassword />);
    expect(screen.queryByRole('button', { name: /Forgot password/i })).toHaveAttribute('type', 'button');
  });
});
