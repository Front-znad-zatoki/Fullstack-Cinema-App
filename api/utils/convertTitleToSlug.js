// eslint-disable-next-line import/prefer-default-export
export const slugify = (text) => {
  const slug = text
    .normalize('NFD')
    // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '')
    // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '')
    // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, '-');
  // separator
  return slug;
};
