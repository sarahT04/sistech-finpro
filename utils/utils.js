import axios from 'axios';
import { BEARER, CATEGORY_URL_LINK, URL_LINK } from './constants';

axios.defaults.headers.common.authorization = `Bearer ${BEARER}`;

if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['X-USER-TOKEN'] = token;
  }
}

export const getApiDatas = async () => axios.get(CATEGORY_URL_LINK);

export const authenticateUser = async ({ state, username, password }) => {
  if (state === 'register') {
    return axios.post(
      `${URL_LINK}auth/${state}`,
      {
        username,
        password,
        role: 'user',
      },
    ).catch((err) => console.log(err));
  }
  return axios.post(
    `${URL_LINK}auth/${state}`,
    {
      username,
      password,
    },
  ).catch((err) => console.log(err));
};

export const dateToEnUsString = (dateString) => new Date(dateString).toLocaleDateString('en-US');

export const getPageParamFromString = (string) => Number(string?.split('=')[1]);
