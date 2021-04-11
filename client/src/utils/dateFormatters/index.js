export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString();
};
export const formatDateAndTime = (date) => {
  const newDate = new Date(date);
  return `${newDate.toLocaleString()}`;
};
