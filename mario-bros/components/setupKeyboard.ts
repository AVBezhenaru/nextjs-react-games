import KeyboardState from './KeyboardState';

export function setupKeyboard(entity: any) {
  const input = new KeyboardState();

  input.addMapping('Space', (keyState: any) => {
    if (keyState) entity.jump.start();
    else entity.jump.cancel();
  });

  input.addMapping('ArrowRight', (keyState: any) => {
    entity.go.dir += keyState ? 1 : -1;
  });

  input.addMapping('ArrowLeft', (keyState: any) => {
    entity.go.dir += keyState ? -1 : 1;
  });

  return input;
}
