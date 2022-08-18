/* eslint-disable max-len */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { handleDownvote, handleUpvote } from '../../utils/utils';

export default function VoteSection({
  postId, upvote, downvote, disabled, userToken,
}) {
  return (
    <div className="vote-div">
      <section>
        <FontAwesomeIcon style={disabled ? { color: 'grey' } : { cursor: 'pointer' }} icon={faArrowUp} onClick={disabled ? null : () => handleUpvote(postId, userToken)} />
        <span>{upvote}</span>
      </section>
      <section>
        <FontAwesomeIcon style={disabled ? { color: 'grey' } : { cursor: 'pointer' }} icon={faArrowDown} onClick={disabled ? null : () => handleDownvote(postId, userToken)} />
        <span>{downvote}</span>
      </section>
    </div>
  );
}
