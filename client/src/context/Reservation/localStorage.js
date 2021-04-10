export const setLocalStorage = (key, initialValue) => {
  localStorage.setItem(key, JSON.stringify(initialValue));
};

// Retrieve information from local storage
export const getLocalStorage = (key, initialValue) => {
  const reservationValue = JSON.parse(localStorage.getItem(key));

  return reservationValue || initialValue;
};

// Remove information from local storage
export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};
