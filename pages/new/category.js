import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../../store/authSlice';
import ContentWrapper from '../../components/template/ContentWrapper';
import { postNewCategoryAdmin } from '../../utils/utils';

export default function NewCategory() {
  const token = useSelector(selectToken);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [message, setMessage] = useState(null);
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    try {
      const post = {
        title: postTitle,
        content: postContent,
      };
      const res = postNewCategoryAdmin(categoryTitle, post, token);
      setMessage('wow');
    } catch (err) {
      setMessage('An error happened, sorry.');
    }
  };
  return (
    <ContentWrapper>
      <form className="form" onSubmit={handleCategorySubmit}>
        <h4>New Category</h4>
        <input id='category-title' value={categoryTitle} placeholder="New Category Title" onChange={(e) => setCategoryTitle(e.target.value)} />
        <h4>Starter Thread</h4>
        <input id='starter-post-title' value={postTitle} placeholder="Your thread title" onChange={(e) => setPostTitle(e.target.value)} />
        <textarea id="starter-post-content" rows={10} cols={50} placeholder="And the thing you want to discuss about?" value={postContent} onChange={(e) => setPostContent(e.target.value)} />
        <button>Add Category</button>
      </form>
      {!message ? null
        : <div className='message'>
          <h4>{message}</h4>
        </div>
      }
    </ContentWrapper>
  );
}
