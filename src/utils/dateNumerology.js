// Date Numerology Calculations

export const calculateDateNumerology = (month, day, year) => {
  const m = parseInt(month) || 0;
  const d = parseInt(day) || 0;
  const y = parseInt(year) || 0;
  
  const yearStr = String(y).padStart(4, '0');
  const firstTwoYear = parseInt(yearStr.substring(0, 2)) || 0;
  const lastTwoYear = parseInt(yearStr.substring(2, 4)) || 0;
  
  const sumDigits = (num) => String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  const sumDigitsStr = (str) => str.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  
  const mDigitSum = sumDigits(m);
  const dDigitSum = sumDigits(d);
  const yDigitSum = sumDigits(y);
  const lastTwoYearDigitSum = sumDigitsStr(yearStr.substring(2, 4));
  
  const productAllDigits = (String(m) + String(d) + yearStr).split('').reduce((prod, digit) => {
    const n = parseInt(digit);
    return n === 0 ? prod : prod * n;
  }, 1);
  
  const productMDLastTwo = (String(m) + String(d) + yearStr.substring(2, 4)).split('').reduce((prod, digit) => {
    const n = parseInt(digit);
    return n === 0 ? prod : prod * n;
  }, 1);
  
  return [
    {
      label: '(' + m + ') + (' + d + ') + (' + firstTwoYear + ') + (' + lastTwoYear + ')',
      value: m + d + firstTwoYear + lastTwoYear,
    },
    {
      label: '(' + m + ') + (' + d + ') + ' + yearStr.split('').join('+'),
      value: m + d + yDigitSum,
    },
    {
      label: String(m).split('').join('+') + ' + ' + String(d).split('').join('+') + ' + ' + yearStr.split('').join('+'),
      value: mDigitSum + dDigitSum + yDigitSum,
    },
    {
      label: '(' + m + ') + (' + d + ') + (' + lastTwoYear + ')',
      value: m + d + lastTwoYear,
    },
    {
      label: String(m).split('').join('+') + ' + ' + String(d).split('').join('+') + ' + ' + yearStr.substring(2, 4).split('').join('+'),
      value: mDigitSum + dDigitSum + lastTwoYearDigitSum,
    },
    {
      label: '(' + m + ') + (' + d + ')',
      value: m + d,
    },
    {
      label: String(m).split('').join('+') + ' + ' + String(d).split('').join('+') + ' + (' + firstTwoYear + ') + (' + lastTwoYear + ')',
      value: mDigitSum + dDigitSum + firstTwoYear + lastTwoYear,
    },
    {
      label: '(' + m + ') + (' + d + ') + ' + yearStr.substring(2, 4).split('').join('+'),
      value: m + d + lastTwoYearDigitSum,
    },
    {
      label: String(m).split('').join('+') + ' + ' + String(d).split('').join('+') + ' + (' + lastTwoYear + ')',
      value: mDigitSum + dDigitSum + lastTwoYear,
    },
    {
      label: (String(m) + String(d) + yearStr).split('').join(' x '),
      value: productAllDigits,
    },
    {
      label: (String(m) + String(d) + yearStr.substring(2, 4)).split('').join(' x '),
      value: productMDLastTwo,
    },
  ];
};

export const getDayOfYear = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  if (isLeapYear) daysInMonth[1] = 29;
  
  let dayOfYear = day;
  for (let i = 0; i < month; i++) {
    dayOfYear += daysInMonth[i];
  }
  return dayOfYear;
};

export const getDaysLeftInYear = (date) => {
  const year = date.getFullYear();
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const totalDaysInYear = isLeapYear ? 366 : 365;
  return totalDaysInYear - getDayOfYear(date);
};

export const calculateDuration = (startDate, endDate, includeEndDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  let days = Math.round(Math.abs(end - start) / (1000 * 60 * 60 * 24));
  if (includeEndDate) days += 1;
  
  return { totalDays: days };
};
