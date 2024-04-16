/* eslint-disable import/no-extraneous-dependencies */
import {
  render, screen, cleanup, fireEvent,
  act,
} from '@testing-library/react';

import e from '@testing-library/user-event';
import { expect } from 'vitest';
import { server } from '@/mocks/node';
import { HttpResponse, http } from 'msw';
import Signup from '../Signup';

afterEach(cleanup);

const toggleAuthState = ():void => {};
describe('<Signup />', () => {
  it('should render a heading with text Sign up', () => {
    render(<Signup toggleAuthState={toggleAuthState} />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
  it('should render a label with text Fullname', () => {
    render(<Signup toggleAuthState={toggleAuthState} />);
    expect(screen.getByLabelText('Fullname', { exact: true })).toBeInTheDocument();
  });
  it('should render a textbox to enter fullname', () => {
    render(<Signup toggleAuthState={toggleAuthState} />);
    expect(screen.getByRole('textbox', { name: 'fullname' })).toBeInTheDocument();
  });
  it('should render a label with text email', () => {
    render(<Signup toggleAuthState={toggleAuthState} />);
    expect(screen.getByLabelText('Fullname', { exact: true })).toBeInTheDocument();
  });
  it('should render a textbox to enter email address', () => {
    render(<Signup toggleAuthState={toggleAuthState} />);
    expect(screen.getByRole('textbox', { name: 'email' })).toBeInTheDocument();
  });
  it('should render a label with text password', () => {
    render(<Signup toggleAuthState={toggleAuthState} />);
    expect(screen.getByLabelText('Password', { exact: true })).toBeInTheDocument();
  });
  it('should render a button to submit the form', () => {
    render(<Signup toggleAuthState={toggleAuthState} />);
    const button = screen.getByRole('button', { name: 'Continue' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeEnabled();
  });
  describe('Integration test', () => {
    it('should render info message on successfull form submission', async () => {
      render(<Signup toggleAuthState={toggleAuthState} />);

      const fullname:HTMLInputElement = screen.getByRole('textbox', { name: 'fullname' });
      fireEvent.change(fullname, { target: { value: 'Jennie Nichols' } });

      const email:HTMLInputElement = screen.getByLabelText('Email');
      fireEvent.change(email, { target: { value: 'jennie.nichols@example.com' } });

      const password:HTMLInputElement = screen.getByLabelText('Password');
      fireEvent.change(password, { target: { value: 'Addisont*&%1234*#$' } });

      const button = screen.getByRole('button', { name: 'Continue' });

      await act(async () => {
        await e.click(button);
      });
      expect(screen.getByRole('heading', { name: 'An verification link has been sent to your email address' })).toBeInTheDocument();
    });
    it('should render a button with text "Back to Login" after successfull form submission', async () => {
      render(<Signup toggleAuthState={toggleAuthState} />);

      const fullname:HTMLInputElement = screen.getByRole('textbox', { name: 'fullname' });
      fireEvent.change(fullname, { target: { value: 'Jennie Nichols' } });

      const email:HTMLInputElement = screen.getByLabelText('Email');
      fireEvent.change(email, { target: { value: 'jennie.nichols@example.com' } });

      const password:HTMLInputElement = screen.getByLabelText('Password');
      fireEvent.change(password, { target: { value: 'Addisont*&%1234*#$' } });

      const button = screen.getByRole('button', { name: 'Continue' });

      await act(async () => {
        e.click(button);
      });
      expect(screen.getByRole('button', { name: 'Back to login' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'An verification link has been sent to your email address' })).toBeInTheDocument();
    });
    it('should render error messages on empty form submission', async () => {
      render(<Signup toggleAuthState={toggleAuthState} />);

      const fullname:HTMLInputElement = screen.getByRole('textbox', { name: 'fullname' });
      fireEvent.change(fullname, { target: { value: '' } });

      const email:HTMLInputElement = screen.getByLabelText('Email');
      fireEvent.change(email, { target: { value: '' } });

      const password:HTMLInputElement = screen.getByLabelText('Password');
      fireEvent.change(password, { target: { value: '' } });

      const button = screen.getByRole('button', { name: 'Continue' });

      server.use(http.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/register`, async () => HttpResponse.json({
        message: {
          error: [
            {
              code: 'too_small',
              minimum: 3,
              type: 'string',
              inclusive: true,
              exact: false,
              message: 'fullname must be at least 2 characters',
              path: [
                'fullname',
              ],
            },
            {
              validation: 'email',
              code: 'invalid_string',
              message: 'Please provide a valid email address',
              path: [
                'email',
              ],
            },
            {
              code: 'too_small',
              minimum: 3,
              type: 'string',
              inclusive: true,
              exact: false,
              message: 'Email address must be at least 3 characters',
              path: [
                'email',
              ],
            },
            {
              code: 'too_small',
              minimum: 8,
              type: 'string',
              inclusive: true,
              exact: false,
              message: 'Password must be at least 8 characters',
              path: [
                'password',
              ],
            },
            {
              validation: 'regex',
              code: 'invalid_string',
              message: 'Password must contain at least one letter and one number',
              path: [
                'password',
              ],
            },
            {
              code: 'invalid_type',
              expected: 'string',
              received: 'undefined',
              path: [
                'recaptchaToken',
              ],
              message: 'Required',
            },
          ],
        },
        success: false,
        statusCode: 422,
      }, { status: 422 })));
      await act(async () => {
        await e.click(button);
      });
      expect(screen.getAllByText(/required/i).length).toBe(3);
    });
    it('should render error message on duplicate email form submission', async () => {
      render(<Signup toggleAuthState={toggleAuthState} />);

      const fullname:HTMLInputElement = screen.getByRole('textbox', { name: 'fullname' });
      fireEvent.change(fullname, { target: { value: 'Jennie Nichols' } });

      const email:HTMLInputElement = screen.getByLabelText('Email');
      fireEvent.change(email, { target: { value: 'jennie.nichols@example.com' } });

      const password:HTMLInputElement = screen.getByLabelText('Password');
      fireEvent.change(password, { target: { value: 'Addisont*&%1234*#$' } });

      const button = screen.getByRole('button', { name: 'Continue' });

      server.use(http.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/register`, () => HttpResponse.json({
        message: {
          error: 'Invalid Email or Password',
        },
        success: false,
        statusCode: 409,
      }, { status: 409 })));
      await act(async () => {
        e.click(button);
      });

      expect(screen.getByText('Invalid Email or Password')).toBeInTheDocument();
    });
  });
});
