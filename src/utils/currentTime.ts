export const currentTime = () => {
  const now = new Date();
  now.setHours(now.getHours() - 3);
  return now;
};
