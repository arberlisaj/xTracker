const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getCurrentDate = () => {
  const date = new Date();
  return ` ${days[date.getDay()]}, ${
    months[date.getMonth()]
  } ${date.getDate()}`;
};

export default getCurrentDate();
