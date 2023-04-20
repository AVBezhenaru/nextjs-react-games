export const msToMinString = (inputMs: number) => {
  const ms = (inputMs % 1000) / 100;
  const sec = Math.trunc((inputMs / 1000) % 60);
  const min = Math.trunc(inputMs / 1000 / 60);

  const secStr = String(sec).padStart(2, '0');
  const minStr = String(min).padStart(2, '0');

  return `${minStr}:${secStr}:${ms}`;
};
