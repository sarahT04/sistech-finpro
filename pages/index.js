import Head from 'next/head';
import Image from 'next/image';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import ContentWrapper from '../components/template/ContentWrapper';
import { siteTitle, siteDescription } from '../utils/constants';
import CategoriesList from '../components/categories/CategoriesList';

import catImage from '../public/cat_logo.png';

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
          <div className='index'>
            <h3>
              Welcome to {siteTitle}, your gaming forum intended only for the female gamers.<br />
              We hope through this forum we can build awareness in the female gaming industry,<br />
              also as a medium to share the cool stuffs and be comfortable with each other.<br />
              So please, no attacking. We are all cool people!
            </h3>
            <Image src={catImage} alt={`${siteTitle} logo`} />
          </div>
          <CategoriesList />
        </QueryClientProvider>
      </ContentWrapper>
    </>
  );
}
