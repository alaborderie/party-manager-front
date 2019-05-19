import axios from 'axios';

const API = 'http://localhost:4000/api';

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