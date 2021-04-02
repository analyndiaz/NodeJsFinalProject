class DateHelper {
  getDateString = (date, includeTime) => {
    const dd = String(date.getUTCDate()).padStart(2, "0");
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    const yyyy = date.getUTCFullYear();

    if (includeTime) {
      const hh = String(date.getUTCHours()).padStart(2, "0");
      const min = String(date.getUTCMinutes()).padStart(2, "0");
      const ss = String(date.getUTCSeconds()).padStart(2, "0");

      return `${yyyy}-${mm}-${dd}_${hh}_${min}_${ss}`;
    }

    return `[${yyyy}-${mm}-${dd}]`;
  };
}

module.exports = new DateHelper();
