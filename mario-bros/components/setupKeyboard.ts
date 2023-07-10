import KeyboardState from './KeyboardState';

export function setupKeyboard(entity) {
  const input = new KeyboardState();

  input.addMapping('Space', keyState => {
    if (keyState) entity.jump.start();
    else entity.jump.cancel();
  });

  input.addMapping('ArrowRight', keyState => {
    entity.go.dir = keyState;
  });

  input.addMapping('ArrowLeft', keyState => {
    entity.go.dir = -keyState;
  });

  return input;
}
