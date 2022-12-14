/* eslint-disable max-len */
// eslint-disable-next-line import/no-cycle
import CommentList from './CommentList';
import VoteSection from './VoteSection';

export default function Comments({
  id, content, upvote, downvote, replies, allComments, owner, currentUserInfo, setCommentId, edited, setIsEditing,
}) {
  return (
    <>
      <div id={id} className='comment'>
        <section>{content}</section>
        <br />
        {edited ? <span className='edited'>Edited</span> : null}
        <VoteSection postId={id} upvote={upvote} downvote={downvote}
          disabled={!currentUserInfo || owner === currentUserInfo.userId}
          currentUserInfo={currentUserInfo}
          setCommentId={setCommentId}
          setIsEditing={setIsEditing} />
      </div>
      {replies.length > 0 && (
        <CommentList comments={replies} allComments={allComments}
          currentUserInfo={currentUserInfo} setCommentId={setCommentId}
          setIsEditing={setIsEditing} />
      )}
    </>
  );
}
