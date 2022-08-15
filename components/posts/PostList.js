import { useQuery } from '@tanstack/react-query/';
import { getApiDatas } from '../../utils/utils';
import Loading from '../template/Loading';
import Post from './Post';

export default function PostList() {
  const { data: datas, isLoading } = useQuery(['post-datas'], getApiDatas);
  return (
    <div id="post-list">
      {
        // eslint-disable-next-line no-nested-ternary
        isLoading
          ? <Loading />
          : datas.data
            ? datas.data.map((data) => (
              <Post key={data.name} {...data} />
            ))
            : <p>Nothing here as of yet..</p>
      }
    </div>
  );
}
