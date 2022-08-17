import Head from 'next/head';
import ContentWrapper from '../components/template/ContentWrapper';
import Post from '../components/posts/Post';
import { siteTitle, siteDescription } from '../utils/constants';
import { getAllPostInThread } from '../utils/utils';
import CommentList from '../components/posts/CommentList';

export default function SSRID({ name, starterPost, comments }) {
  return (
    <>
      <Head>
        <title>{`${name} ${siteTitle}`}</title>
        <meta name="description" content={siteDescription} />
      </Head>

      <ContentWrapper>
        <div className='list'>
          <Post name={name} {...starterPost} />
          <CommentList comments={comments[starterPost.id]} allComments={comments} />
        </div>
      </ContentWrapper>
    </>
  );
}

// eslint-disable-next-line import/prefer-default-export
export async function getServerSideProps(context) {
  const { id } = context.params;
  const { data } = await getAllPostInThread(id);
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
    props: { name, starterPost, comments: commentsByParentsId },
  };
}
