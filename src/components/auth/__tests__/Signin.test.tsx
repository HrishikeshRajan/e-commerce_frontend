import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { expect } from 'vitest';
import Signin from '../Signin';
import { vi } from 'vitest';
afterEach(cleanup);

describe('<Signin />', () => {
  it('should render an HTML form', () => {
    render(<Signin />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
  it('should render with a heading Sign Up', () => {
    render(<Signin />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
  it('should render a textbox to enter email address', () => {
    render(<Signin />);
    expect(screen.getByLabelText('Email', { exact: true })).toBeInTheDocument();
  });
  it('should render a textbox to enter password', () => {
    render(<Signin />);
    expect(
      screen.getByLabelText('Password', { exact: true }),
    ).toBeInTheDocument();
  });
  it('should render a button for with text "Signin"', () => {
    render(<Signin />);
    expect(screen.getByRole('button', { name: 'Signin' })).toBeInTheDocument();
  });

  describe('Form submit', () => {
    it('should render error message for login with unregistered email and password', async() => {
      //@ts-ignore
      globalThis.fetch = vi.fn(() => {
        return Promise.resolve({
          json: () => {
            return Promise.resolve({
              success: false,
              statusCode: 400,
              message: {
                error: 'Invalid email or password',
              },
            });
          },
        });
      });
      render(<Signin />);
      const email = screen.getByLabelText('Email');
      fireEvent.change(email, {
        target: {
          value: 'example@gmail.com',
        },
      });
      const password = screen.getByLabelText('Password');
      fireEvent.change(password, {
        target: {
          value: 'example@#Rot12121',
        },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Signin' }));
      const headingElement = await screen.findByText(
        /Invalid email or password/i,
      );
      expect(headingElement).toBeInTheDocument();
    });
    it('should render error message for login with empty email and password', async () => {
      //@ts-ignore
      globalThis.fetch = vi.fn(() => {
        return Promise.resolve({
          json: () => {
            return Promise.resolve({
              success: false,
              statusCode: 422,
              message: {
                error: [
                  {
                    code: 'invalid_type',
                    expected: 'string',
                    received: 'undefined',
                    path: ['email'],
                    message: 'Required',
                  },
                  {
                    code: 'invalid_type',
                    expected: 'string',
                    received: 'undefined',
                    path: ['password'],
                    message: 'Required',
                  },
                ],
              },
            });
          },
        });
      });
      render(<Signin />);
      const email = screen.getByLabelText('Email');
      fireEvent.change(email, {
        target: {
          value: '',
        },
      });
      const password = screen.getByLabelText('Password');
      fireEvent.change(password, {
        target: {
          value: '',
        },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Signin' }));
      const headingElement = await screen.findAllByText(/Required/i);
      expect(headingElement.length).toBeLessThanOrEqual(2);
    });
  });
});
