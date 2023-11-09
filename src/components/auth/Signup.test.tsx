import { render, screen, cleanup } from '@testing-library/react';
import { expect } from 'vitest';
import Signup from './Signup';

afterEach(cleanup);

describe('<Signup />', () => {
  it('should render an HTML form', () => {
    render(<Signup />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
  it('should render with a heading Sign Up', () => {
    render(<Signup />);
    expect(screen.getByRole('heading',{level:2})).toBeInTheDocument();
  });
  it('should render a textbox to enter fullname', () => {
    render(<Signup />);
    expect(screen.getByLabelText('Fullname',{exact:true})).toBeInTheDocument();
  });
  it('should render a textbox to enter email address', () => {
    render(<Signup />);
    expect(screen.getByLabelText('Email',{exact:true})).toBeInTheDocument();
  });
  it('should render a textbox to enter password', () => {
    render(<Signup />);
    expect(screen.getByLabelText('Password',{exact:true})).toBeInTheDocument();
  });
  it('should render a textbox to enter confirm password', () => {
    render(<Signup />);
    expect(screen.getByLabelText('Confirm Password',{exact:true})).toBeInTheDocument();
  });
  it('should render a button for with text signup', () => {
    render(<Signup />);
    expect(screen.getByRole('button',{name:'Sign Up'})).toBeInTheDocument();
  });
  it('should render a text which suggest "Have an Account?"', () => {
    render(<Signup />);
    expect(screen.getByText('Have an Account?')).toBeInTheDocument();
  });
  it('should render a button with text "Sign In"', () => {
    render(<Signup />);
    expect(screen.getByRole('button',{name:'Sign In'})).toBeInTheDocument()
  });
});
