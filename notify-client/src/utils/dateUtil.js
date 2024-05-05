export const getDateFormat = (post_date) => {
  const hour = post_date.getHours().toString().padStart(2, '0');
  const minute = post_date.getMinutes().toString().padStart(2, '0');
  const second = post_date.getHours().toString().padStart(2, '0');
  
  const day = post_date.getDate().toString().padStart(2, '0');
  const month = (post_date.getMonth() + 1).toString().padStart(2, '0');
  const year = post_date.getFullYear().toString();

  return `${hour}:${minute}:${second} - ${day}/${month}/${year}`;
}