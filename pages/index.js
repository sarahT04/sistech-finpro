import Head from 'next/head';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import PostList from '../components/posts/PostList';
import ContentWrapper from '../components/template/ContentWrapper';

const postClient = new QueryClient();

export default function Home() {
  return (
    <>
      <Head>
        <title>Erika</title>
        <meta name="description" content="A female haven for all the gamers." />
      </Head>
      <ContentWrapper>
        <QueryClientProvider client={postClient}>
          <PostList />
        </QueryClientProvider>
      </ContentWrapper>
    </>
  );
}
