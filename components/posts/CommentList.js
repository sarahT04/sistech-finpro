// eslint-disable-next-line import/no-cycle
import Comments from './Comments';

export default function CommentList({ comments, allComments }) {
  return (
    <div className="post">
      {comments
        ? comments.map((comment) => (
          <div key={comment.id} className="comment-stack">
            <Comments {...comment} allComments={allComments} replies={
              Object.prototype.hasOwnProperty?.call(allComments, comment.id)
                ? allComments[comment.id] : []
            } />
          </div>
        ))
        : <h4>No comment yet..</h4>
      }
    </div>
  );
}
