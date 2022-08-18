/* eslint-disable max-len */
import VoteSection from './VoteSection';

export default function Post({
  id, name, content, upvote, downvote, owner, currentUserId, currentUserToken,
}) {
  return (
    <div className='post'>
      <h1>{name}</h1>
      <article>{content}</article>
      <br />
      <VoteSection postId={id} userToken={currentUserToken} userId={currentUserId} disabled={owner === currentUserId} upvote={upvote} downvote={downvote} />
    </div>

  );
}
