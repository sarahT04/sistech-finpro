import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ContentWrapper from '../../components/template/ContentWrapper';
import { selectCategoriesState, selectToken } from '../../store/authSlice';
import { putNewCategoryName } from '../../utils/utils';

export default function EditCategory() {
  const router = useRouter();
  const { category } = router.query;
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categorySelect, setCategorySelect] = useState(category);
  const [message, setMessage] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const categoriesState = useSelector(selectCategoriesState);
  const userToken = useSelector(selectToken);
  const handleCategoryEdit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line max-len
    const categoryId = categoriesState.find((categoryObject) => categoryObject.name === categorySelect).id;
    const { status } = await putNewCategoryName(categoryId, categoryTitle, userToken);
    if (status === 200) {
      setMessage('Thread has been edited');
    } else {
      setMessage('An error occured. Sorry.');
    }
    setDisableButton(true);
  };
  return (
    <ContentWrapper>
      <form className="form" onSubmit={handleCategoryEdit}>
        <select value={categorySelect} onChange={(e) => setCategorySelect(e.target.value)}>
          {
            categoriesState.map(((categoryState) => (
              // eslint-disable-next-line max-len
              <option value={categoryState.name} key={categoryState.id}>{categoryState.name.toUpperCase()}</option>
            )))
          }
        </select>
        <h4>Edit Category</h4>
        <input id='category-title' value={categoryTitle} placeholder="New Category Title" onChange={(e) => setCategoryTitle(e.target.value)} />
        <button disabled={disableButton}>Edit Thread</button>
      </form>
      {!message ? null
        : <div className='message'>
          <h4>{message}</h4>
        </div>
      }
    </ContentWrapper>
  );
}
