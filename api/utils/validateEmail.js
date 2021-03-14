const validateEmail = function (email) {
  const re = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
  return re.test(email);
};

export default validateEmail;
