import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ErrorPage from '../../components/404/404';
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
  const [disableButton, setDisableButton] = useState(false);
  const [message, setMessage] = useState(null);
  const [categorySelect, setCategorySelect] = useState(category);
  const handleThreadSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line max-len
    const categoryId = categoriesState.find((categoryObject) => categoryObject.name === categorySelect).id;
    const { status, data } = await postNewThread(categoryId, postTitle, postContent, token);
    if (status === 200) {
      setMessage(`Thread has been made with id: ${data.id}`);
    } else {
      setMessage('An error occured. Sorry.');
    }
    setDisableButton(true);
  };
  return (
    <ContentWrapper>
      {token
        ? <><form className="form" onSubmit={handleThreadSubmit}>
          <h4>Category:</h4>
          <select value={categorySelect} onChange={(e) => setCategorySelect(e.target.value)}>
            {
              categoriesState.map(((categoryState) => (
                // eslint-disable-next-line max-len
                <option value={categoryState.name} key={categoryState.id}>{categoryState.name.toUpperCase()}</option>
              )))
            }
          </select>
          <h4>Post:</h4>
          <input id='starter-post-title' value={postTitle} onChange={(e) => setPostTitle(e.target.value)} placeholder="What's your title?" />
          <textarea id="starter-post-content" rows={10} cols={50} value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder="And the thing you want to discuss about?" />
          <button disabled={disableButton}>Add Thread</button>
        </form>
          {!message ? null
            : <div className='message'>
              <h4>{message}</h4>
            </div>
          }</>
        : <ErrorPage />
      }
    </ContentWrapper>
  );
}
