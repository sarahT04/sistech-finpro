import VoteSection from './VoteSection';

export default function Post({
  name, content, upvote, downvote,
}) {
  return (
    <div className='post'>
      <h1>{name}</h1>
      <article>{content}</article>
      <br />
      <VoteSection upvote={upvote} downvote={downvote} />
    </div>

  );
}
