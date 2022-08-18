/* eslint-disable max-len */
// eslint-disable-next-line import/no-cycle
import CommentList from './CommentList';
import VoteSection from './VoteSection';

export default function Comments({
  id, content, upvote, downvote, replies, allComments, owner, userId, userToken,
}) {
  return (
    <>
      <div id={id} className='comment'>
        <section>{content}</section>
        <br />
        <VoteSection postId={id} userToken={userToken} disabled={owner === userId} upvote={upvote} downvote={downvote} />
      </div>
      {replies.length > 0 && (
        <CommentList comments={replies} allComments={allComments} />
      )}
    </>
  );
}
