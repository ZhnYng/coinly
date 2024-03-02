export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'SGD',
  });
};

export const formatMoney = (amount: number) => {
  return (amount / 100).toFixed(2)
}

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const toLocalISOString = (date:Date) => {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  localDate.setSeconds(0);
  localDate.setMilliseconds(0);
  return localDate.toISOString().slice(0, -1);
}
