export const switchFrame = (frames: number[][], curFrame: number[]) => {
  const ind = frames.indexOf(curFrame);
  if (ind + 1 > frames.length - 1) return frames[0];
  return frames[ind + 1];
};
