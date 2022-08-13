import Head from 'next/head';
import Post from '../components/posts/Post';
import ContentWrapper from '../components/template/ContentWrapper';
import { siteTitle, siteDescription } from '../utils/constants';

const SSRID = ({ data = [] }) => (
  <>
    <Head>
      <title>{data.name} - {siteTitle}</title>
      <meta name="description" content={siteDescription} />
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
