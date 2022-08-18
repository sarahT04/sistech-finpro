import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ContentWrapper from '../../components/template/ContentWrapper';
import { selectCategoriesState, selectToken } from '../../store/authSlice';
import { postNewThread } from '../../utils/utils';

export default function NewThread() {
  const router = useRouter();
  const { category } = router.query;
  const categoriesState = useSelector(selectCategoriesState);
  const token = useSelector(selectToken);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [message, setMessage] = useState(null);
  const handleThreadSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line max-len
    const categoryId = categoriesState.filter((stateCategory) => stateCategory.name === category)[0]?.id;
    setMessage('done');
    console.log(categoryId, postTitle, postContent, token);
    // const res = await postNewThread(categoryId, postTitle, postContent, token);
    // console.log(res);
    // router.push('/');
  };
  return (
    <ContentWrapper>
      <form className="form" onSubmit={handleThreadSubmit}>
        <select>
          
        </select>
        <input id='starter-post-title' value={postTitle} onChange={(e) => setPostTitle(e.target.value)} placeholder="What's your title?" />
        <textarea id="starter-post-content" rows={10} cols={50} value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder="And the thing you want to discuss about?" />
        <button>Add Thread</button>
      </form>
      {!message ? null
        : <div className='message'>
          <h4>{message}</h4>
        </div>
      }
    </ContentWrapper>
  );
}
