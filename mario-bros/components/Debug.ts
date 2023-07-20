// this function for debugging! you can delete this
export function setupMouseControl(canvas: any, entity: any, camera: any) {
  let lastEvent: any;

  ['mousedown', 'mousemove'].forEach((eventName) => {
    canvas.addEventListener(eventName, (event: any) => {
      if (event.buttons === 1) {
        entity.vel.set(0, 0);
        entity.pos.set(event.offsetX + camera.pos.x, event.offsetY + camera.pos.y);
      } else if (
        event.buttons === 2 &&
        lastEvent &&
        lastEvent.buttons === 2 &&
        lastEvent.type === 'mousemove'
      ) {
        camera.pos.x -= event.offsetX - lastEvent.offsetX;
      }

      lastEvent = event;
    });
  });

  canvas.addEventListener('contextmenu', (event: any) => {
    event.preventDefault();
  });
}
