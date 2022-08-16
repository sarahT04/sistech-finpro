/* eslint-disable camelcase */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dateToEnUsString } from '../../utils/utils';

export default function Post({ name, comments, starterPost }) {
  return (
    <div className='post'>
      <div className='starter'>
        <h1>{name}</h1>
        <p>{starterPost.content}</p>
      </div>
      {
        comments.map((comment) => (
          <div className='comments' key={comment.id}>
            {comment.content}
          </div>
        ))
      }
    </div>
  );
}

function Footer({ comments }) {
  return (
    <footer>
      <FontAwesomeIcon />
      <FontAwesomeIcon />
      <span>{comments} comments</span>
    </footer>
  );
}
