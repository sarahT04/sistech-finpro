import Comments from './Comments';

export default function CommentList({ comments, allComments }) {
  return (
    <div className="post">
      {
        comments.map((comment) => (
          <div key={comment.id} className="comment-stack">
            <Comments {...comment} allComments={allComments} replies={
              Object.prototype.hasOwnProperty?.call(allComments, comment.id)
                ? allComments[comment.id] : []
            } />
          </div>
        ))
      }
    </div>
  );
}
