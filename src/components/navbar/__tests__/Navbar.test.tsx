import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { expect } from 'vitest';
import Navbar from '../Navbar';
import { BrowserRouter } from 'react-router-dom';

describe('<Navbar />', () => {
  afterEach(cleanup);
  test('should render the company logo correctly', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
  test('should render a search box for large screen correctly', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('searchbox-lg')).toBeInTheDocument();
  });
  test('should render a search box for small screen correctly', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('searchbox-sm')).toBeInTheDocument();
  });
  test('should render a search button correctly', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );
    expect(screen.getByTestId(/search-btn/i)).toBeInTheDocument();
  });
  test('should render an option for select language', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );
    expect(screen.getByLabelText(/language/i)).toBeInTheDocument();
  });
  test('should render an option for user profile', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );
    expect(screen.getByLabelText(/profile/i)).toBeInTheDocument();
  });
  test('should render an option for cart', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );
    expect(screen.getByLabelText(/cart/i)).toBeInTheDocument();
  });
  test('should render an option to display cart items number', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
  });
});
