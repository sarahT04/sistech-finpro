import axios from 'axios';
import {
  AUTH_URL_LINK,
  BEARER, CATEGORY_URL_LINK, POST_URL_LINK, THREAD_URL_LINK, VOTE_URL_LINK,
} from './constants';

// HEADERS CONFIGURATION ===================
axios.defaults.headers.common.authorization = `Bearer ${BEARER}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const makeUserTokenHeader = (userToken) => ({
  headers: {
    'X-USER-TOKEN': userToken,
  },
});

// POST API CALLS BELOW ===================

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

export const handleDelete = async (postId, userToken) => axios.delete(
  POST_URL_LINK + postId,
  makeUserTokenHeader(userToken),
);

// CATEGORY API CALLS BELOW ===================

const postNewCategory = async (categoryName, userToken) => axios.post(
  CATEGORY_URL_LINK,
  { name: categoryName },
  makeUserTokenHeader(userToken),
);

export const getCategoriesList = async () => axios.get(CATEGORY_URL_LINK);

// eslint-disable-next-line max-len
export const getAllThreadsInCategory = async (categoryId) => axios.get(CATEGORY_URL_LINK + categoryId);

export const putNewCategoryName = async (categoryId, name, userToken) => axios.put(
  CATEGORY_URL_LINK + categoryId,
  {
    name,
  },
  makeUserTokenHeader(userToken),
);

export const deleteCategory = async (categoryId, userToken) => axios.delete(
  CATEGORY_URL_LINK + categoryId,
  makeUserTokenHeader(userToken),
);

// THREAD API CALLS BELOW ===================

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
export const getAllPostInThread = async (postId) => axios.get(THREAD_URL_LINK + postId);

const putThreadNameEdit = async (threadId, threadTitle, userToken) => axios.put(
  THREAD_URL_LINK + threadId,
  {
    name: threadTitle,
  },
  makeUserTokenHeader(userToken),
);

// CAMPURAN API CALLS BELOW =))) ===================

export const postNewCategoryAdmin = async (categoryName, post, userToken) => {
  const { data, status } = await postNewCategory(categoryName, userToken);
  if (status === 200) {
    const thread = await postNewThread(data.id, post.title, post.content, userToken);
    return thread.data;
  }
  return data;
};

// USER CONFIG API CALLS BELOW ===================

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

export const putThreadEdit = async (threadId, threadTitle, postId, userContent, userToken) => {
  const { data, status } = await putThreadNameEdit(threadId, threadTitle, userToken);
  if (status === 200) {
    const { postData, postStatus } = await putUserEdit(postId, userContent, userToken);
    if (postStatus === 200) {
      return postStatus;
    }
    return postData;
  }
  return data;
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

//
