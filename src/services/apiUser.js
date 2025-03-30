import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api/v1/users';
// const API_URL = 'http://localhost:8000/api/v1/users';
const API_URL = 'https://ams-omega-lilac.vercel.app/api/v1/users';

export async function createUser(userData) {
  const response = await axios({
    method: 'post',
    url: `${API_URL}`,
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      role: userData.role,
      email: userData.email,
      password: userData.password,
      passwordConfirm: userData.passwordConfirm,
    },
    withCredentials: true,
  });

  return response;
}

export async function getOneUser(userId) {
  const response = await axios({
    method: 'get',
    url: `${API_URL}/${userId}`,
    withCredentials: true,
  });

  return response.data?.data;
}

export async function getAllUsers(paramsItems) {

  const response = await axios({
    method: 'get',
    url: `${API_URL}`,
    withCredentials: true,
    params: {
      ...paramsItems,
    },
  });

  console.log(response)

  return response.data?.data.data;
}

export async function setUnitTenant(setUnitData) {
  const { tenantId, paidRent, unitId } = setUnitData;

  const response = await axios({
    method: 'post',
    url: `${API_URL}/assignUnit`,
    data: {
      tenantId: `${tenantId}`,
      paidRent: `${paidRent}`,
      unit: `${unitId}`,
    },
    withCredentials: true,
  });

  return response.data;
}

export async function updateUser(userData) {
  const { email, firstName, lastName, phoneNumber, userId, role } = userData;

  const response = await axios({
    method: 'patch',
    url: `${API_URL}/${userId}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      email,
      role,
      firstName,
      lastName,
      phoneNumber,
      photo: userData.photo ? userData.photo[0] : '',
    },
    withCredentials: true,
  });

  console.log(response);

  return response.data;
}

export async function deleteUser(delData) {
  const response = await axios({
    method: 'delete',
    url: `${API_URL}/${delData.tenantId}`,
    data: {
      unitId: delData.unitId,
    },
    withCredentials: true,
  });

  return response.data;
}

export async function sendCommunication(communicationData) {
  const { tenantemail, message, subject, commMethod } = communicationData;

  const response = await axios({
    method: 'post',
    url: `${API_URL}/communication`,
    data: {
      tenantemail,
      message,
      subject,
      commMethod,
    },
    withCredentials: true,
  });

  return response.data;
}
