/* eslint-disable no-nested-ternary */
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import Loading from '../template/Loading';
import Post from './Post';

const API_URL = 'https://swapi.dev/api/people?page=';

const getPageParamFromString = (string) => Number(string?.split('=')[1]);

export default function PostList() {
  const { ref, inView } = useInView();
  // Infinite query
  const {
    data: datas, isLoading, fetchNextPage, isFetchingNextPage,
  } = useInfiniteQuery(['post-data'], async ({ pageParam = 1 }) => {
    const data = await fetch(API_URL + pageParam);
    return data.json();
  }, {
    getPreviousPageParam: (firstPage) => getPageParamFromString(firstPage?.previous),
    getNextPageParam: (lastPage) => getPageParamFromString(lastPage?.next),
  });

  // If the div is in the view, fetch next page.
  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  return (
    <div id="post-list">
      {
        isLoading
          ? <Loading />
          : datas?.pages.map((page) => (
            page?.results.map((data) => (
              <Post key={data.name} {...data} />
            ))
          ))
      }
      <div ref={ref} id='load-more'>
        <p>
          {isFetchingNextPage
            ? <Loading />
            : isLoading
              ? ''
              : 'The end of the page.'}
        </p>
      </div>
    </div>
  );
}
