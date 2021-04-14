const handleAxiosErrors = (error) => {
  if (error.response) {
    console.log(error.response.data);
    const { errors } = error.response.data;
    if (errors) {
      alert(errors[0].msg, 'Something went wrong');
    }
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
  return false;
};

export default handleAxiosErrors;
