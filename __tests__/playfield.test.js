// import React from 'react';
// import renderer from 'react-test-renderer';
// import { expect, test, describe } from '@jest/globals';
// import { render } from '@testing-library/jest-dom';
// import { Provider } from 'react-redux';

// import PlayField from '../tetris2/components/playfield/playfield';
// import { store } from '../store';

// describe('PlayField', () => {
//   test('snapshot renders', () => {
//     const component = renderer.create(
//       <Provider store={store}>
//         <PlayField />
//       </Provider>,
//     );
//     expect(component).not.toBeNull();
//     // );
//     // const tree = component.toJSON();
//     // expect(tree).toMatchSnapshot();
//   });
// });
import { expect, it, describe } from '@jest/globals';
// import { render } from '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

import Cell from '../tetris2/components/cell/cell';

describe('check cell component', () => {
  it('should look like this', () => {
    const component = renderer.create(<Cell type={1} />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
