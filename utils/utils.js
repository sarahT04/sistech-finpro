import axios from 'axios';
import {
  BEARER, CATEGORY_URL_LINK, THREAD_URL_LINK, URL_LINK,
} from './constants';

axios.defaults.headers.common.authorization = `Bearer ${BEARER}`;

// if (typeof window !== 'undefined') {
//   const token = localStorage.getItem('token');
//   if (token) {
//     axios.defaults.headers.common.authorization = `X-USER-TOKEN ${token}`;
//   }
// }

export const getAllPostInThread = async (postId) => axios.get(THREAD_URL_LINK + postId);

export const getCategoriesList = async () => axios.get(CATEGORY_URL_LINK);

// eslint-disable-next-line max-len
export const getAllThreadsInCategory = async (categoryId) => axios.get(CATEGORY_URL_LINK + categoryId);

export const authenticateUser = async ({ state, username, password }) => {
  if (state === 'register') {
    return axios.post(
      `${URL_LINK}auth/${state}`,
      {
        username,
        password,
        role: 'user',
      },
    );
  }
  return axios.post(
    `${URL_LINK}auth/${state}`,
    {
      username,
      password,
    },
  );
};

export const dateToEnUsString = (dateString) => new Date(dateString).toLocaleDateString('en-US');

export const getPageParamFromString = (string) => Number(string?.split('=')[1]);
