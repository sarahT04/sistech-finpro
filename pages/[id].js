import Head from 'next/head';
import Post from '../components/posts/Post';
import ContentWrapper from '../components/template/ContentWrapper';

const SSRID = ({ data = [] }) => (
  <>
    <Head>
      <title>{data.name}-Erika</title>
      <meta name="description" content="A female haven for all the gamers." />
    </Head>
    <ContentWrapper>
      <div id="post-list">
        <Post staticData={false} {...data} />
      </div>
    </ContentWrapper>
  </>
);

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://swapi.dev/api/people/${id}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': '*',
    },
  });
  const data = await res.json();
  return {
    props: {
      data: { ...data, id },
    },
  };
}
export default SSRID;
