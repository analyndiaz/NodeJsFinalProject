const getDateRangeFilter = (startdate, numDays) => {
  let dateFilter = {};
  let rangeDate = new Date(startdate);

  dateFilter.$gte = new Date(startdate);
  rangeDate.setDate(rangeDate.getDate() + numDays);
  dateFilter.$lt = rangeDate;

  return dateFilter;
};

module.exports = { getDateRangeFilter };
