import Head from 'next/head';
import ContentWrapper from '../components/template/ContentWrapper';
import Post from '../components/posts/Post';
import { siteTitle, siteDescription } from '../utils/constants';
import { getAllPostInThread } from '../utils/utils';

export default function SSRID({ data }) {
  const { name, data: threadDatas } = data;

  const starterIndex = threadDatas.findIndex((post) => post.isStarter);
  const starterPost = threadDatas.splice(starterIndex, 1)[0];
  const comments = threadDatas;
  return (
    <>
      <Head>
        <title>{`${name} - ${siteTitle}`}</title>
        <meta name="description" content={siteDescription} />
      </Head>

      <ContentWrapper>
        <div className='list'>
          <Post name={name} starterPost={starterPost} comments={comments} />
        </div>
      </ContentWrapper>
    </>
  );
}

// eslint-disable-next-line import/prefer-default-export
export async function getServerSideProps(context) {
  const { id } = context.params;
  const { data } = await getAllPostInThread(id);
  return {
    props: { data },
  };
}
