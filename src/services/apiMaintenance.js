import axios from 'axios';

// const API_URL = 'http://localhost:8000/api/v1/maintenances';
const API_URL = 'https://ams-omega-lilac.vercel.app/api/v1/maintenances';

export async function getAllMaintenances() {
  const response = await axios({
    method: 'get',
    url: `${API_URL}`,
    withCredentials: true,
  });

  return response.data.data;
}
export async function updateMaintenance(updateData) {
  const { status, maintenanceId } = updateData;

  const response = await axios({
    method: 'patch',
    url: `${API_URL}/${maintenanceId}`,
    data: {
      status: status,
    },
    withCredentials: true,
  });

  return response.data.data;
}

export async function getMaintenance(maintenanceId) {
  const response = await axios({
    method: 'get',
    url: `${API_URL}/${maintenanceId}`,
  });

  return response.data?.data.data;
}

export async function createMaintenance(data) {
  const response = await axios({
    method: 'post',
    url: `${API_URL}`,
    data: {
      ...data,
    },
    withCredentials: true,
  });

  return response.data.data;
}
export async function deleteMaintenance() {}
