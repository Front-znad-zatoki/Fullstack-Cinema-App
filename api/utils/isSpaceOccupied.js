// eslint-disable-next-line arrow-body-style
const isSpaceOccupied = ([row, column], occupiedSeats) => {
  if (occupiedSeats.length === 0) return false;
  return occupiedSeats.some(
    ([occupiedSeatRow, occupiedSeatColumn]) => {
      let result = false;
      if (
        // eslint-disable-next-line operator-linebreak
        occupiedSeatRow === row &&
        occupiedSeatColumn === column
      ) {
        result = true;
      }
      return result;
    },
  );
};

export default isSpaceOccupied;
