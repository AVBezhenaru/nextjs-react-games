import KeyboardState from './KeyboardState';

export function setupKeyboard(entity) {
  const SPACE = 32;
  const input = new KeyboardState();

  input.addMapping(SPACE, keyState => {
    if (keyState) entity.jump.start();
    else entity.jump.cancel();
  });

  input.addMapping(39, keyState => {
    entity.go.dir = keyState;
  });

  input.addMapping(37, keyState => {
    entity.go.dir = -keyState;
  });

  return input;
}
