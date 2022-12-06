import renderer from 'react-test-renderer';
import { expect, it, describe } from '@jest/globals';
// import { render } from '@testing-library/jest-dom';

import HelloTetris from '../pages/tetris/index';

describe('check HelloTetris', () => {
  it('should look like', () => {
    renderer(<HelloTetris />).toJSON();
    const play = screen.getByText('Play');
    expect(play).toBeInTheDocument();
  });
});
