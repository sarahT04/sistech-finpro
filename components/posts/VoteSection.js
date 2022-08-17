import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function VoteSection({ upvote, downvote }) {
  return (
    <div className="vote-div">
      <section>
        <FontAwesomeIcon icon={faArrowUp} />
        <span>{upvote}</span>
      </section>
      <section>
        <FontAwesomeIcon icon={faArrowDown} />
        <span>{downvote}</span>
      </section>
    </div>
  );
}
