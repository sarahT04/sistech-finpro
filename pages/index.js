import Head from 'next/head';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import PostList from '../components/posts/PostList';
import ContentWrapper from '../components/template/ContentWrapper';
import { siteTitle, siteDescription } from '../utils/constants';

const postClient = new QueryClient();

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
      </Head>
      <ContentWrapper>
        <QueryClientProvider client={postClient}>
          <PostList />
        </QueryClientProvider>
      </ContentWrapper>
    </>
  );
}
