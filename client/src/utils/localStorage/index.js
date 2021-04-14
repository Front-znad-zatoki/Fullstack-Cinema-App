export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

// Retrieve information from local storage
export const getLocalStorage = (key) => {
  const reservationValue = JSON.parse(localStorage.getItem(key));
  return reservationValue;
};

// Remove information from local storage
export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};
