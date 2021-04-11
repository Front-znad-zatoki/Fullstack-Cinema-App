const convertRowsAndColumnsToAlphanumeric = (rowNr, columnNr) => {
  return `${String.fromCharCode(rowNr + 65)}${columnNr + 1}`;
};
export default convertRowsAndColumnsToAlphanumeric;
