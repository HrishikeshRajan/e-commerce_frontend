import { render, screen, cleanup } from '@testing-library/react';
import { expect } from 'vitest';
import Signin from '../Signin';

afterEach(cleanup);

describe('<Signin />', () => {
  it('should render an HTML form', () => {
    render(<Signin />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
  it('should render with a heading Sign Up', () => {
    render(<Signin />);
    expect(screen.getByRole('heading',{level:2})).toBeInTheDocument();
  });

  it('should render a textbox to enter email address', () => {
    render(<Signin />);
    expect(screen.getByLabelText('Email',{exact:true})).toBeInTheDocument();
  });
  it('should render a textbox to enter password', () => {
    render(<Signin />);
    expect(screen.getByLabelText('Password',{exact:true})).toBeInTheDocument();
  });

  it('should render a button for with text Signin', () => {
    render(<Signin />);
    expect(screen.getByRole('button',{name:'Sign in'})).toBeInTheDocument();
  });

});
