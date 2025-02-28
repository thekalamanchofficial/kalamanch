const isDateTitleFormat = (dateString: string): boolean => {
  const regex =
    /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (January|February|March|April|May|June|July|August|September|October|November|December) ([1-9]|[12][0-9]|3[01]), \d{4} at (0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
  return regex.test(dateString);
};

export default isDateTitleFormat;
