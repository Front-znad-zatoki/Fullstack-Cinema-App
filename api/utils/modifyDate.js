const modifyDate = (startDate, minutes) =>
  new Date(startDate.getTime() + minutes * 60000);

export default modifyDate;
