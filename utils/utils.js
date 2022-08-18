import axios from 'axios';
import {
  AUTH_URL_LINK,
  BEARER, CATEGORY_URL_LINK, POST_URL_LINK, THREAD_URL_LINK, VOTE_URL_LINK,
} from './constants';

axios.defaults.headers.common.authorization = `Bearer ${BEARER}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const makeUserTokenHeader = (userToken) => ({
  headers: {
    'X-USER-TOKEN': userToken,
  },
});

export const putUserEdit = async (postId, content, userToken) => axios.put(
  POST_URL_LINK + postId,
  {
    content,
  },
  makeUserTokenHeader(userToken),
);

export const postUserComment = async (threadId, content, replyId, userToken) => axios.post(
  POST_URL_LINK,
  {
    threadId,
    content,
    replyId,
  },
  makeUserTokenHeader(userToken),
);

const postNewCategory = async (categoryName, userToken) => axios.post(
  CATEGORY_URL_LINK,
  { name: categoryName },
  makeUserTokenHeader(userToken),
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
  makeUserTokenHeader(userToken),

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
      `${AUTH_URL_LINK}${state}`,
      {
        username,
        password,
        role: 'user',
      },
    );
  }
  return axios.post(
    `${AUTH_URL_LINK}${state}`,
    {
      username,
      password,
    },
  );
};

export const handleUpvote = async (postId, userToken) => axios.post(
  VOTE_URL_LINK,
  {
    postId,
    voteType: 'upvote',
  },
  makeUserTokenHeader(userToken),
);

export const handleDownvote = async (postId, userToken) => axios.post(
  VOTE_URL_LINK,
  {
    postId,
    voteType: 'downvote',
  },
  makeUserTokenHeader(userToken),
);

export const handleDelete = async (postId, userToken) => axios.delete(
  POST_URL_LINK + postId,
  makeUserTokenHeader(userToken),
);

export const putNewCategoryName = async (categoryId, name, userToken) => axios.put(
  CATEGORY_URL_LINK + categoryId,
  {
    name,
  },
  makeUserTokenHeader(userToken),
);
