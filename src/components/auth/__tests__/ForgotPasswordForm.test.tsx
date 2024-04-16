/* eslint-disable import/no-extraneous-dependencies */
import { renderWithProviders } from '@/mocks/redux/test-utils';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ForgotForm from '../ForgotForm';

describe('Forgot Password form', () => {
  it('should render a company name', () => {
    renderWithProviders(<ForgotForm />);
    const heading = screen.queryByRole('heading', { name: /wondercart/i });
    expect(heading).toBeInTheDocument();
  });
  it('should render a heading', () => {
    renderWithProviders(<ForgotForm />);
    const heading = screen.queryByRole('heading', { name: /Forgot Password/i });
    expect(heading).toBeInTheDocument();
  });
  it('should render a textbox to enter email', () => {
    renderWithProviders(<ForgotForm />);
    const input = screen.queryByRole('textbox', { name: 'email' });
    expect(input).toBeInTheDocument();
  });
  it('should render a button to submit the form', () => {
    renderWithProviders(<ForgotForm />);
    const button = screen.queryByRole('button', { name: /continue/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
  });
  it('should render a button to redirect back to the login form', () => {
    renderWithProviders(<ForgotForm />);
    const button = screen.queryByRole('button', { name: /Back to Login?/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });
  it('should render a error message on empty form submission', async () => {
    renderWithProviders(<ForgotForm />);
    const button = screen.queryByRole('button', { name: /continue/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
    await act(async () => {
      await userEvent.click(button!);
    });
    expect(screen.getByText(/required/i));
  });
  it('should render a info message on successfull form submission', async () => {
    renderWithProviders(<ForgotForm />);

    const textbox = screen.getByRole('textbox', { name: 'email' });

    await act(async () => {
      await userEvent.type(textbox, 'example@gmail.com');
    });
    const button = screen.queryByRole('button', { name: /continue/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
    await act(async () => {
      await userEvent.click(button!);
    });
    expect(screen.getByText(/An email verification link has been send to your email account/i));
  });
});
