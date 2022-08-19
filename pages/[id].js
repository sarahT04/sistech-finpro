import Head from 'next/head';
import jwt from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ContentWrapper from '../components/template/ContentWrapper';
import Post from '../components/posts/Post';
import { siteTitle, siteDescription } from '../utils/constants';
import { getAllPostInThread } from '../utils/utils';
import CommentList from '../components/posts/CommentList';
import UserCommentComponent from '../components/posts/UserComment';
import { selectAdminState } from '../store/authSlice';
import ErrorPage from '../components/404/404';

export default function SSRID({
  name, starterPost, commentsByParentsId, comments, threadId, error,
}) {
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const isAdmin = useSelector(selectAdminState);

  useEffect(() => {
    const userLocal = window.sessionStorage.getItem('TOKEN');
    if (userLocal) {
      const userToken = JSON.parse(userLocal);
      const tokenDecoded = jwt(userToken);
      setCurrentUserInfo({
        userId: tokenDecoded.iss,
        userToken,
      });
      if (isAdmin) {
        setCurrentUserInfo(
          {
            userId: tokenDecoded.iss,
            userToken,
            isAdmin: true,
          },
        );
      }
    }
  }, [isAdmin]);
  return (
    <>
      {error
        ? <ContentWrapper>
          <ErrorPage />
        </ContentWrapper>
        : <>
          <Head>
            <title>{`${name} - ${siteTitle}`}</title>
            <meta name="description" content={siteDescription} />
          </Head>

          <ContentWrapper>
            <div className='list'>
              <Post name={name} {...starterPost} currentUserInfo={currentUserInfo}
                setCommentId={setCommentId} setIsEditing={setIsEditing} />
              <CommentList comments={commentsByParentsId[starterPost.id]}
                allComments={commentsByParentsId} currentUserInfo={currentUserInfo}
                setCommentId={setCommentId} setIsEditing={setIsEditing} />
              {
                commentId
                  ? <UserCommentComponent
                    isEditing={isEditing}
                    threadId={threadId}
                    userToken={!currentUserInfo || currentUserInfo.userToken}
                    commentContent={comments.find((comment) => comment.id === commentId).content}
                    commentId={commentId}
                    setCommentId={setCommentId}
                    // eslint-disable-next-line max-len
                    isStarter={starterPost.id === commentId && starterPost.owner === currentUserInfo.userId}
                  />
                  : null
              }
            </div>
          </ContentWrapper>
        </>
      }
    </>
  );
}

// eslint-disable-next-line import/prefer-default-export
export async function getServerSideProps(context) {
  const { id } = context.params;
  const { data, status } = await getAllPostInThread(id);
  if (status !== 200) {
    return {
      props: {
        error: true,
      },
    };
  }
  const { name } = data;
  const commentsByParentsId = {};
  let starterPost = {};
  // abc
  data.data.forEach((comment) => {
    if (comment.isStarter) {
      starterPost = comment;
      return;
    }
    if (!commentsByParentsId[comment.replyId]) {
      commentsByParentsId[comment.replyId] = [];
    }
    commentsByParentsId[comment.replyId].push(comment);
  });
  return {
    props: {
      name,
      starterPost,
      commentsByParentsId,
      comments: data.data,
      threadId: id,
    },
  };
}
