import { useRouter } from 'next/router';
import { useState } from 'react';
import { postUserComment, putUserEdit, putThreadEdit } from '../../utils/utils';

export default function UserCommentComponent({
  threadId, commentContent, commentId, userToken, isEditing, isStarter, setCommentId,
}) {
  const [userComment, setUserComment] = useState('');
  const [threadTitle, setThreadTitle] = useState('');
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      if (isStarter) {
        await putThreadEdit(threadId, threadTitle, commentId, userComment, userToken);
      } else {
        await putUserEdit(commentId, userComment, userToken);
      }
    } else {
      await postUserComment(threadId, userComment, commentId, userToken);
    }
    setCommentId(null);
    router.replace(router.asPath);
  };
  return (
    <div className="post">
      <h4>{isEditing ? 'Editing' : 'Commenting'} to: &quot;{commentContent.slice(0, 25)}...&quot;</h4>
      <form className="form" onSubmit={handleSubmit}>
        {isEditing
          ? <input id='thread-title' placeholder='Edit your title' value={threadTitle} onChange={(e) => setThreadTitle(e.target.value)} />
          : null}
        <textarea rows={10} cols={50} value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          placeholder={`Insert your ${isEditing ? 'edit' : 'comment'}. Make sure it's unique and different ;)`}></textarea>
        <button>{isEditing ? 'Edit Your Post' : 'Add New Comment'}</button>
      </form>
    </div>
  );
}
