import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query/';
import Link from 'next/link';
import { setCategoriesState } from '../../store/authSlice';
import { getCategoriesList } from '../../utils/utils';
import Loading from '../template/Loading';

export default function CategoriesList() {
  const dispatch = useDispatch();

  const { data: categoriesData, isLoading } = useQuery(['categories-list'], async () => {
    const { data } = await getCategoriesList();
    dispatch(setCategoriesState(data));
    return data;
  });
  return (
    <div className="list">
      {isLoading
        ? <Loading />
        : <ul>
          {categoriesData.map((data) => (
            <Link href={`categories/${data.name}`} key={`${data.id}link`}>
              <li key={data.id}>{data.name}</li>
            </Link>
          ))}
        </ul>
      }
    </div>
  );
}
