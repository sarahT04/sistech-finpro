/* eslint-disable max-len */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp, faArrowDown, faComment, faTrash, faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { handleDownvote, handleUpvote, handleDelete } from '../../utils/utils';

export default function VoteSection({
  postId, upvote, downvote, disabled: isUserPost, currentUserInfo, setCommentId, setIsEditing, isStarter,
}) {
  const [upvoteAmount, setUpvoteAmount] = useState(upvote);
  const [downvoteAmount, setDownvoteAmount] = useState(downvote);
  const superPower = currentUserInfo && currentUserInfo.isAdmin;
  return (
    <div className="vote-div">
      <section>
        {/* Upvote */}
        <FontAwesomeIcon style={isUserPost ? { color: 'grey' } : { cursor: 'pointer' }} icon={faArrowUp}
          onClick={isUserPost ? null : () => {
            handleUpvote(postId, currentUserInfo.userToken);
            setUpvoteAmount(upvoteAmount + 1);
          }} />
        <span>{upvoteAmount}</span>
      </section>
      <section>
        {/* Downvote */}
        <FontAwesomeIcon style={isUserPost ? { color: 'grey' } : { cursor: 'pointer' }} icon={faArrowDown}
          onClick={isUserPost ? null : () => {
            handleDownvote(postId, currentUserInfo.userToken);
            setDownvoteAmount(downvoteAmount + 1);
          }} />
        <span>{downvoteAmount}</span>
      </section>
      <section>
        {/* Commenting */}
        <FontAwesomeIcon style={!currentUserInfo ? { color: 'grey' } : { cursor: 'pointer' }} icon={faComment}
          onClick={!currentUserInfo ? null : () => {
            setCommentId(postId);
            setIsEditing(false);
          }} />
      </section>
      {/* Editing */}
      {
        currentUserInfo && (superPower || isUserPost)
          ? <section>
            <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faEdit}
              onClick={() => {
                setCommentId(postId);
                setIsEditing(true);
              }} />
          </section>
          : null
      }
      {/* Deleting */}
      {
        currentUserInfo && ((superPower && !isStarter) || (isUserPost && !isStarter))
          ? <section>
            <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faTrash}
              onClick={() => {
                // eslint-disable-next-line no-restricted-globals, no-alert
                const userConfirm = confirm('Are you sure you want to delete?');
                if (userConfirm) {
                  handleDelete(postId, currentUserInfo.userToken);
                }
              }} />
          </section>
          : null
      }
    </div>
  );
}
