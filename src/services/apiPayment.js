import axios from 'axios';

// const API_URL = 'http://localhost:8000/api/v1/transactions/payment';
const API_URL = 'https://ams-omega-lilac.vercel.app/api/v1/transactions/payment';

// const API_URL_REPORT =
//   'http://localhost:8000/api/v1/transactions/paymentsreport';
const API_URL_REPORT =
  'https://ams-omega-lilac.vercel.app/api/v1/transactions/paymentsreport';

// const API_GET_TRANSACTIONS = 'http://localhost:8000/api/v1/transactions';

const API_GET_TRANSACTIONS = 'https://ams-omega-lilac.vercel.app/api/v1/transactions';

// const API_CALLBACK =
//   'https://f19f-41-139-239-91.ngrok-free.app/api/v1/transactions/callback';

export async function payRent({ amount, tel }) {
  const response = await axios({
    method: 'post',
    url: `${API_URL}`,
    data: {
      amount: amount,
      phone: tel,
    },
    withCredentials: true,
  });

  return response;
}

export async function confirmPayment() {
  const response = await axios({
    method: 'post',
    url: `${API_CALLBACK}`,
    withCredentials: true,
  });

  return response;
}

export async function getAllPayments() {
  const response = await axios({
    method: 'get',
    url: `${API_GET_TRANSACTIONS}`,
    withCredentials: true,
  });

  return response?.data.data;
}

export async function getMonthlyStats() {
  const response = await axios({
    method: 'get',
    url: `${API_GET_TRANSACTIONS}/monthlypayments`,
    withCredentials: true,
  });

  return response?.data.data;
}

export async function getYearlyStats() {
  const response = await axios({
    method: 'get',
    url: `${API_GET_TRANSACTIONS}/yearlypayments`,
    withCredentials: true,
  });

  return response?.data.data;
}

export async function getReport(reportType) {
  console.log(reportType);
  const response = await axios({
    method: 'get',
    url: `${API_URL_REPORT}/${reportType}`,
    responseType: 'blob',
  });

  return response.data;
}
