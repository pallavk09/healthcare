const generateUniqueId = (): string => {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
  const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(2, "0"); // Ensure 3 digits for milliseconds

  return `${day}${month}${year}${hours}${minutes}${seconds}${milliseconds}`;
};

export default generateUniqueId;
