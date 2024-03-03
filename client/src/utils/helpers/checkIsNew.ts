export const checkIsNew = (date: Date) => {
  const createdAt = new Date(date);

  const currentDate = new Date();

  const differenceInMilliseconds = currentDate.getTime() - createdAt.getTime();

  const millisecondsInSevenDays = 7 * 24 * 60 * 60 * 1000;

  const isWithinSevenDays = differenceInMilliseconds <= millisecondsInSevenDays;

  return isWithinSevenDays;
};
