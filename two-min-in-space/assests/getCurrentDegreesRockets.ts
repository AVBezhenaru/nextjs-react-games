export const getCurrentDegreesRockets = (
  spaceshipXpos: number,
  spaceshipYpos: number,
  rocket: Record<string, number>,
) => {
  const vectorX = spaceshipXpos - rocket.spaceshipXpos; // используем текущие координаты корабля из объекта ракеты
  const vectorY = spaceshipYpos - rocket.spaceshipYpos;
  const motionVector = Math.sqrt(vectorX ** 2 + vectorY ** 2);
  const sin = vectorX / motionVector;
  if (rocket.spaceshipYpos > spaceshipYpos) {
    return -180 - (-Math.asin(sin) * 180) / Math.PI;
  }
  if (rocket.spaceshipYpos < spaceshipYpos) {
    return -(Math.asin(sin) * 180) / Math.PI;
  }
};
