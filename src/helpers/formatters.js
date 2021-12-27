export const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format;
  
export const formatPercentage = new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format;
  
export const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
export const formatDate = (dateString) => {
    const dt = new Date(dateString);
    return dateFormatter
      .formatToParts(dt)
      .map(({ type, value }) => (type == "literal" ? "-" : value))
      .join("");
  };
  
export  const formatDateRange = (startDate, endDate) => {
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const startDateParts = dateFormatter.formatToParts(new Date(startDate));
    const endDateParts = dateFormatter.formatToParts(new Date(endDate));
  
    return `${startDateParts[0].value} ${startDateParts[2].value} - ${endDateParts[0].value} ${endDateParts[2].value}, ${endDateParts[4].value}`;
  }
  
export const suffixNumber = (number) => {
  let _number = "" + number;
  if (number >= 1000) {
    const suffixes = ["", "K", "M", "B", "T"];
    const suffixNum = Math.floor(("" + number).length / 3);

    let shortValue = 0;
    for (let precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? number / Math.pow(1000, suffixNum)
          : number
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }

    _number =
      (shortValue % 1 != 0 ? shortValue.toFixed(1) : shortValue) +
      suffixes[suffixNum];
  }
  return _number;
};

export const formatNumber = new Intl.NumberFormat().format