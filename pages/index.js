import Head from 'next/head';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import ContentWrapper from '../components/template/ContentWrapper';
import { siteTitle, siteDescription } from '../utils/constants';
import CategoriesList from '../components/categories/CategoriesList';

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
          <CategoriesList />
        </QueryClientProvider>
      </ContentWrapper>
    </>
  );
}
