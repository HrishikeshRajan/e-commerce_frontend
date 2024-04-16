/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-extraneous-dependencies */
import {
  screen, cleanup, fireEvent,
  act,
} from '@testing-library/react';
import { expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/mocks/redux/test-utils';
import { server } from '@/mocks/node';
import { HttpResponse, delay, http } from 'msw';
import Signin from '../Signin';

afterEach(cleanup);

describe('Sign in Component ', () => {
  it('should render a heading', () => {
    renderWithProviders(<Signin />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Wondercart/i);
  });
  it('should render a textbox to enter an email address', () => {
    renderWithProviders(<Signin />);
    expect(screen.getByRole('textbox', { name: 'email' })).toBeInTheDocument();
  });
  it('should render a textbox to enter the password', () => {
    renderWithProviders(<Signin />);
    expect(screen.getByTestId('password')).toBeInTheDocument();
  });
  it('should render a button with the text "Sign in"', () => {
    renderWithProviders(<Signin />);
    const button = screen.getByRole('button', { name: /Sign in/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeEnabled();
  });
  it('should not render a button with the text "Signing in', () => {
    renderWithProviders(<Signin />);
    const button = screen.queryByTestId('loading');
    expect(button).not.toBeInTheDocument();
  });
  it('should render forgot passowrd button"', () => {
    renderWithProviders(<Signin />);
    const button = screen.getByRole('button', { name: /Forgot Password/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  describe('Integration test', () => {
    it('should not render sign in form after user login', async () => {
      renderWithProviders(<Signin />);

      const email:HTMLInputElement = screen.getByLabelText('Email');
      fireEvent.change(email, { target: { value: 'jennie.nichols@example.com' } });

      const password:HTMLInputElement = screen.getByLabelText('Password');
      fireEvent.change(password, { target: { value: 'Addisont*&%1234*#$' } });

      const button = screen.getByRole('button', { name: 'Sign in' });

      await act(async () => {
        await userEvent.click(button);
      });
      expect(screen.queryByRole('button', { name: 'Sign in', hidden: true })).not.toBeInTheDocument();
      expect(screen.queryByRole('textbox', { name: /Email/i })).not.toBeInTheDocument();
      expect(screen.queryByTestId('password')).not.toBeInTheDocument();
    });
    it('submit button should be replaced by a disabled button during authentication', async () => {
      renderWithProviders(<Signin />);

      const email:HTMLInputElement = screen.getByLabelText('Email');
      fireEvent.change(email, { target: { value: 'jennie.nichols@example.com' } });

      const password:HTMLInputElement = screen.getByLabelText('Password');
      fireEvent.change(password, { target: { value: 'Addisont*&%1234*#$' } });

      const button = screen.getByRole('button', { name: 'Sign in' });

      server.use(http.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/login`, async () => {
        await delay(400);
        return HttpResponse.json({
          message: {
            refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Implbm5pZS5uaWNob2xzQGV4YW1wbGUuY29tIiwiaWQiOiI2NWRkN2FkY2E4MjUwOTM0MWQ5MTk4YWEiLCJsb2dnZWRJbiI6dHJ1ZSwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDkwMTM5MDMsImV4cCI6MTcwOTE4NjcwM30.ZzPuKoIieN5__xawZ2durONxx_OvMEyHCPuepb4CNbY',
            user: {
              _id: '65dd7adca82509341d9198aa',
              fullname: 'Jennie Nichols',
              email: 'jennie.nichols@example.com',
              role: 'user',
              emailVerified: true,
              isPrimeUser: false,
              seller: false,
              address: [],
              __v: 0,
            },
          },
          success: true,
          statusCode: 200,
        }, { status: 200 });
      }));
      await act(async () => {
        await userEvent.click(button);
      });
      const loadingButton = screen.queryByTestId('loading');
      expect(loadingButton).toBeInTheDocument();
      expect(loadingButton).toBeDisabled();
    });
    it('should render error messages on empty form submission', async () => {
      renderWithProviders(<Signin />);

      const email:HTMLInputElement = screen.getByLabelText('Email');
      fireEvent.change(email, { target: { value: '' } });

      const password:HTMLInputElement = screen.getByLabelText('Password');
      fireEvent.change(password, { target: { value: '' } });

      await act(async () => {
        await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
      });

      server.use(http.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/login`, async () => HttpResponse.json({
        message: {
          error: [
            {
              code: 'too_small',
              minimum: 4,
              type: 'string',
              inclusive: true,
              exact: false,
              message: 'String must contain at least 4 character(s)',
              path: [
                'email',
              ],
            },
          ],
        },
        success: false,
        statusCode: 422,
      }, { status: 422 })));

      expect(screen.getAllByText(/Required/i).length).toBe(2);
    });
  });
});
