/* eslint-disable no-nested-ternary */
import { useQuery, QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ContentWrapper from '../../components/template/ContentWrapper';
import Loading from '../../components/template/Loading';
import { selectAuthState, selectCategoriesState } from '../../store/authSlice';
import { siteTitle, siteDescription } from '../../utils/constants';
import { getAllThreadsInCategory } from '../../utils/utils';
import ErrorPage from '../../components/404/404';

const threadsInCategoryClient = new QueryClient();

function AllThreadsInCategory() {
  const router = useRouter();
  const isLoggedIn = useSelector(selectAuthState);
  const categoriesState = useSelector(selectCategoriesState);
  const { category } = router.query;
  // eslint-disable-next-line max-len
  const categoryId = categoriesState.find((categories) => categories.name === category)?.id;
  const { data: threadDatas, isLoading, isError } = useQuery(['threads-in-a-category'], async () => {
    const { data } = await getAllThreadsInCategory(categoryId);
    return data.data;
  });

  return (
    <div className='categories'>
      <h3>Category: {category}</h3>
      {isLoggedIn
        ? <div className='new-thread'>
          <Link href={`/new/thread?category=${category}`}>
            <h4><FontAwesomeIcon icon={faPlus} /> New Thread</h4>
          </Link>
        </div>
        : ''
      }
      <div className='list'>
        {isLoading
          ? <Loading />
          : isError ? <ErrorPage />
            : threadDatas.map((data) => (
        <Link href={`/${data.id}`} key={`${data.id}link`} >
          <div className='thread'>
            <p>{data.name}</p>
          </div>
        </Link>
            ))
        }
      </div>
    </div>
  );
}

export default function CategoryPage() {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
      </Head>
      <ContentWrapper>
        <QueryClientProvider client={threadsInCategoryClient}>
          <AllThreadsInCategory />
        </QueryClientProvider>
      </ContentWrapper>
    </>
  );
}
