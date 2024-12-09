export function formatDate(dateString: string) {
  const date = new Date(dateString);

  // Get the day, month, and year
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if day is single digit
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
  const year = date.getFullYear();

  // Format the date in DD/MM/YYYY
  return `${day}/${month}/${year}`;
}
