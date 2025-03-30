import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api/v1/users';
// const API_URL = 'http://localhost:8000/api/v1/users';
const API_URL = 'https://ams-omega-lilac.vercel.app/api/v1/users';

export async function login({ email, password }) {
  const response = await axios({
    method: 'POST',
    url: `${API_URL}/login`,
    data: {
      email,
      password,
    },
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}

export async function logout() {
  const response = await axios({
    method: 'get',
    url: `${API_URL}/logout`,
    withCredentials: true,
  });

  return response;
}

export async function getUser() {
  const user = await axios({
    method: 'get',
    url: `${API_URL}/me`,
    withCredentials: true,
  });

  return user?.data?.data?.user;
}

export async function updatePassword(updateData) {
  const { passwordCur, userId, newPassword, passwordConfirm } = updateData;

  const response = await axios({
    method: 'patch',
    url: `${API_URL}/updatePassword`,
    data: {
      passwordCur,
      userId,
      newPassword,
      passwordConfirm,
    },
    withCredentials: true,
  });

  return response.data;
}

export async function forgotPassword(emailData) {
  const response = await axios({
    method: 'post',
    url: `${API_URL}/forgotPassword`,
    data: {
      email: emailData.email,
    },
    withCredentials: true,
  });

  return response;
}

export async function verifyCode(codeData) {
  const response = await axios({
    method: 'post',
    url: `${API_URL}/validateToken`,
    data: {
      token: `${codeData}`,
    },
    withCredentials: true,
  });

  console.log(response);

  return response;
}

export async function resetPassword(passwordData) {
  const response = await axios({
    method: 'post',
    url: `${API_URL}/resetPassword`,
    data: {
      password: passwordData.password,
      passwordConfirm: passwordData.passwordConfirm,
    },
    withCredentials: true,
  });

  return response;
}
