/* eslint-disable no-nested-ternary */
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getApiDatas, getPageParamFromString } from '../../utils/utils';
import Loading from '../template/Loading';
import Post from './Post';

export default function PostList() {
  const { ref, inView } = useInView();
  // Infinite query
  const {
    data: datas, isLoading, fetchNextPage, isFetchingNextPage,
  } = useInfiniteQuery(['post-data'], getApiDatas, {
    getPreviousPageParam: (firstPage) => getPageParamFromString(firstPage.previous || undefined),
    getNextPageParam: (lastPage) => getPageParamFromString(lastPage.next || undefined),
  });

  // If the div is in the view, fetch next page.
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  return (
    <div id="post-list">
      {
        isLoading
          ? <Loading />
          : datas.pages.map((page) => (
            page.results.map((data, index) => (
              <Post key={data.name} {...data} id={index + 1} />
            ))
          ))
      }
      <div ref={ref} id='load-more'>
        {isFetchingNextPage
          ? <Loading />
          : isLoading
            ? ''
            : <p>The end of the page.</p>}

      </div>
    </div>
  );
}
