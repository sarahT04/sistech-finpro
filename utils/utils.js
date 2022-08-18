import axios from 'axios';
import {
  BEARER, CATEGORY_URL_LINK, THREAD_URL_LINK, URL_LINK,
} from './constants';

axios.defaults.headers.common.authorization = `Bearer ${BEARER}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// if (typeof window !== 'undefined') {
//   const token = localStorage.getItem('token');
//   if (token) {
//     axios.defaults.headers.common.authorization = `X-USER-TOKEN ${token}`;
//   }
// }
const postNewCategory = async (categoryName, userToken) => axios.post(
  CATEGORY_URL_LINK,
  { name: categoryName },
  {
    headers: {
      'X-USER-TOKEN': userToken,
    },
  },
);

export const postNewThread = async (categoryId, postTitle, postContent, userToken) => axios.post(
  THREAD_URL_LINK,
  {
    categoryId,
    name: postTitle,
    firstPost: {
      content: postContent,
    },
  },
  {
    headers: {
      'X-USER-TOKEN': userToken,
    },
  },
);

export const postNewCategoryAdmin = async (categoryName, post, userToken) => {
  const { data } = await postNewCategory(categoryName, userToken);
  const thread = await postNewThread(data.id, post.title, post.content, userToken);
  return thread.data;
};

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
