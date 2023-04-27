/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';

import { LoadingPage } from '../../tanks/core/Pages/LoadingPage/LoadingPage';
import '@testing-library/jest-dom';
import { useAppSelector } from '../../hooks';

jest.mock('react-redux');
(useAppSelector as jest.MockedFunction<any>).mockReturnValue(true);

describe('Loading page test', () => {
  it('Render test', () => {
    render(<LoadingPage title="Loading" />);
    expect(screen.getByTestId('tanks-main-page')).toBeInTheDocument();
  });
});
