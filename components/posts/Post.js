/* eslint-disable max-len */
import VoteSection from './VoteSection';

export default function Post({
  id, name, content, upvote, downvote, owner, currentUserInfo, setCommentId, edited, setIsEditing, isStarter,
}) {
  return (
    <div className='post'>
      <h1>{name}</h1>
      <article>{content}</article>
      <br />
      {edited ? <span className='edited'>Edited</span> : null}
      <VoteSection postId={id} upvote={upvote} downvote={downvote}
        disabled={!currentUserInfo || owner === currentUserInfo.userId}
        currentUserInfo={currentUserInfo}
        setCommentId={setCommentId}
        setIsEditing={setIsEditing}
        isStarter={isStarter} />
    </div>

  );
}
