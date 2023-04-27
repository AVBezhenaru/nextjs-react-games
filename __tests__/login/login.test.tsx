/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';

import LoginForm from '../../user/forms/loginForm';
import '@testing-library/jest-dom';
import { useAppSelector } from '../../hooks';

jest.mock('react-redux');
(useAppSelector as jest.MockedFunction<any>).mockReturnValue([]);

describe('Login form test', () => {
  it('Render test', () => {
    render(<LoginForm />);
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });
  it('Snapshot login form', () => {
    const component = render(<LoginForm />);
    expect(component).toMatchSnapshot();
  });
});
