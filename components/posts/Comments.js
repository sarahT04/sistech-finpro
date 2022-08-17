import CommentList from './CommentList';
import VoteSection from './VoteSection';

export default function Comments({
  id, content, upvote, downvote, replies, allComments,
}) {
  return (
    <>
      <div id={id} className='comment'>
        <section>{content}</section>
        <br />
        <VoteSection upvote={upvote} downvote={downvote} />
      </div>
      {replies.length > 0 && (
        <CommentList comments={replies} allComments={allComments} />
      )}
    </>
  );
}
