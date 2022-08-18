import VoteSection from './VoteSection';

export default function Post({
  name, content, upvote, downvote, owner, currentUserId,
}) {
  return (
    <div className='post'>
      <h1>{name}</h1>
      <article>{content}</article>
      <br />
      <VoteSection disabled={owner === currentUserId} upvote={upvote} downvote={downvote} />
    </div>

  );
}
