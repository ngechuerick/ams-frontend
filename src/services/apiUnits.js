import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api/v1/units';
// const API_URL = 'http://localhost:8000/api/v1/units';
const API_URL = 'https://ams-omega-lilac.vercel.app/api/v1/units';

export async function getUnit(unitId) {
  const response = await axios({
    method: 'get',
    url: `${API_URL}/${unitId}`,
  });

  return response.data?.data;
}

export async function getAllUnits(paramsItems) {
  const response = await axios({
    method: 'get',
    url: `${API_URL}`,
    params: {
      ...paramsItems,
    },
  });

  return response.data?.data;
}

export async function deleteUnit(unitId) {
  const response = await axios({
    method: 'delete',
    url: `${API_URL}/${unitId}`,
    data: {
      id: unitId,
    },
    withCredentials: true,
  });

  return response;
}

export async function createUnit(unitData) {
  const response = await axios({
    method: 'post',
    url: `${API_URL}`,
    data: {
      unitType: unitData.unitType,
      apartmentUnit: unitData.apartmentUnit,
      unitNum: unitData.unitNum,
      floor: unitData.floor,
      status: unitData.status,
      description: unitData.description,
    },
    withCredentials: true,
  });

  return response;
}

export async function updateUnit(unitData) {
  const { apartmentUnit, description, floor, unitType } = unitData;

  const response = await axios({
    method: 'patch',
    url: `${API_URL}/${unitData.unitId}`,
    data: {
      apartmentUnit,
      description,
      floor,
      unitType,
    },
    withCredentials: true,
  });

  return response;
}
