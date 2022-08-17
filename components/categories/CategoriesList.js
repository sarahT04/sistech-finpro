/* eslint-disable no-nested-ternary */
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query/';
import Link from 'next/link';
import { setCategoriesState } from '../../store/authSlice';
import { getCategoriesList } from '../../utils/utils';
import Loading from '../template/Loading';
import ErrorPage from '../404/404';

export default function CategoriesList() {
  const dispatch = useDispatch();

  const { data: categoriesData, isLoading, isError } = useQuery(['categories-list'], async () => {
    const { data } = await getCategoriesList();
    dispatch(setCategoriesState(data));
    return data;
  });
  return (
    <div className="categories">
      <h3>Categories</h3>
      <div className="list">
        {isLoading
          ? <Loading />
          : isError
            ? <ErrorPage />
            : <ul>
              {categoriesData.map((data) => (
                <Link href={`categories/${data.name}`} key={`${data.id}link`}>
                  <li title={data.name} key={data.id}>{data.name}</li>
                </Link>
              ))}
            </ul>
        }
      </div>
    </div>
  );
}
