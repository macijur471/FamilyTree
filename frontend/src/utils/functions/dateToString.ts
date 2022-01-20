export const dateToString = (date: Date) => {
  const month = date.getMonth() + 1;

  return (
    date.getFullYear() +
    "-" +
    (month < 10 ? `0${month}` : month) +
    "-" +
    date.getDate()
  );
};
