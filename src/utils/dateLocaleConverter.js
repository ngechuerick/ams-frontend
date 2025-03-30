export function formatDateStr(dateStr) {
  const date = new Date(dateStr);

  const options = {
    timeZone: 'Africa/Nairobi',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  const localeString = date.toLocaleString('en-KE', options);

  return localeString;
}

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**Lets calculate due date. It should be on date 5 every month */

export function calcDueDate(dateStr) {
  const userlastPayment = new Date(dateStr);
  const lastPaymentDay = userlastPayment.getDate();
  const lastPaymentMonth = userlastPayment.getMonth() + 1;

  console.log(lastPaymentDay, lastPaymentMonth);

  const dueDate = 5;
  const date = new Date();
  const curMonth = date.getMonth() + 1;
  const curDay = date.getDate();

  /**IF we are still on the same month return */
  if (lastPaymentMonth === curMonth) {
    console.log('Not yet due');
    return;
  } else if (curDay > dueDate) {
    console.log('Your rent is due.');
  }
}

// calcDueDate('2025-03-19T20:42:23.577+00:00');
