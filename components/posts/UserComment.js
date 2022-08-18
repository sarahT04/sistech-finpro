import { useState } from 'react';
import { postUserComment, putUserEdit } from '../../utils/utils';

export default function UserCommentComponent({
  threadId, commentContent, commentId, userToken, isEditing,
}) {
  const [userComment, setUserComment] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await putUserEdit(commentId, userComment, userToken);
    } else {
      await postUserComment(threadId, userComment, commentId, userToken);
    }
  };
  return (
    <div className="post">
      <h4>{isEditing ? 'Editing' : 'Commenting'} to: &quot;{commentContent.slice(0, 25)}...&quot;</h4>
      <form className="form" onSubmit={handleSubmit}>
        <textarea rows={10} cols={50} value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          placeholder={`Insert your ${isEditing ? 'edit' : 'comment'}`}></textarea>
        <button>{isEditing ? 'Edit Your' : 'Add New'} Comment</button>
      </form>
    </div>
  );
}
