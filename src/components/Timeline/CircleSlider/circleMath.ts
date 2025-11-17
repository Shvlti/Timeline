export const getStep = (count: number) => 360 / count;

export const getPosition = (index: number, count: number, radius: number) => {
  const step = getStep(count);
  const angle = (index * step * Math.PI) / 180;

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
};