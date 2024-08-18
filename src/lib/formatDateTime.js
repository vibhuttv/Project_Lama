const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  return `${formattedDate} ${formattedTime}`;
};
export default formatDateTime;
