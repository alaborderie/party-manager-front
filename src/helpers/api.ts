import axios from 'axios';

// const API = 'http://localhost:4000/api';
const API = `${window.location.protocol}//${window.location.hostname}:4000/api`

export function api(token: string) {
  return axios.create({
    baseURL: API,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function getUserData(id: string | number, jwt: string) {
  try {
    const { data } = await axios.get(`${API}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    return data.data;
  } catch(err) {
    throw err;
  }
}
