export const dateToEnUsString = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US');
};
