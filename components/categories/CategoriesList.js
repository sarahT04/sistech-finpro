/* eslint-disable no-nested-ternary */
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query/';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { selectAdminState, setCategoriesState } from '../../store/authSlice';
import { getCategoriesList } from '../../utils/utils';
import Loading from '../template/Loading';
import ErrorPage from '../404/404';

export default function CategoriesList() {
  const dispatch = useDispatch();
  const isAdmin = useSelector(selectAdminState);

  const { data: categoriesData, isLoading, isError } = useQuery(['categories-list'], async () => {
    const { data } = await getCategoriesList();
    dispatch(setCategoriesState(data));
    return data;
  });
  return (
    <div className="categories">
      <div className='category-title'>
        <h4>Categories:</h4>
        {isAdmin
          ? <Link href={'/new/category'}>
            <h4><FontAwesomeIcon icon={faPlus} /> New Category</h4>
          </Link>
          : null
        }
      </div>
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
