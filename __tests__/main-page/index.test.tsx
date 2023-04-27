/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

import { Main } from '../../user/main/main';
import '@testing-library/jest-dom';

describe('Tests main page', () => {
  it('Test render', () => {
    render(<Main />);
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });
  it('Snapshot main page', () => {
    const component = render(<Main />);
    expect(component).toMatchSnapshot();
  });
  it('Button registration test', () => {
    render(<Main />, { wrapper: MemoryRouterProvider });
    fireEvent.click(screen.getByText('guest'));
    expect(mockRouter.asPath).toEqual('/registration');
  });
  it('Button login test', () => {
    render(<Main />, { wrapper: MemoryRouterProvider });
    fireEvent.click(screen.getByText('login'));
    expect(mockRouter.asPath).toEqual('/login');
  });
});
