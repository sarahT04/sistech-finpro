/* eslint-disable max-len */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { handleDownvote, handleUpvote } from '../../utils/utils';

export default function VoteSection({
  postId, upvote, downvote, disabled,
}) {
  return (
    <div className="vote-div">
      <section>
        <FontAwesomeIcon style={disabled ? { color: 'grey' } : null} icon={faArrowUp} onClick={disabled ? null : () => handleUpvote(postId)} />
        <span>{upvote}</span>
      </section>
      <section>
        <FontAwesomeIcon style={disabled ? { color: 'grey' } : null} icon={faArrowDown} onClick={disabled ? null : () => handleDownvote(postId)} />
        <span>{downvote}</span>
      </section>
    </div>
  );
}
