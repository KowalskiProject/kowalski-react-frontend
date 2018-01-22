const parseAmountOfHours = (durationExp) => {
  const [hour, minute] = durationExp.split(':');
  return parseInt(hour, 10) + (parseInt(minute, 10) / 60.0);
};

export default parseAmountOfHours;
