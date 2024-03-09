export const convertStringToDate = (date) => {
  const [day, month, year] = date.split('-');
  let result;
  try {
    result = new Date(`${year}-${month}-${day}`);
    return result;
  } catch (error) {
    return null;
  }
}