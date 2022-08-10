export default function Post({
  created, homeworld, gender, name, films, height, mass,
}) {
  return (
    <div className="post" id={name}>
      <div className="username-date-div"><h3>{name}, by {homeworld}</h3><p>{created}</p></div>
      <div className="post-div"><p>{height}</p></div>
      <div className="likes-category-div"><span>{mass}</span><p>{films.join(', ')}</p></div>
      <div className="comments-div">{gender}</div>
    </div>
  );
}

/*
 id, username, title, content, date, likes, comments, category,
<div className="post" id={id}>
      <div className="username-date-div"><h3>{title}, by {username}</h3><p>{date}</p></div>
      <div className="post-div"><p>{content}</p></div>
      <div className="likes-category-div"><span>{likes}</span><p>{category.join(', ')}</p></div>
      <div className="comments-div">{comments}</div>
    </div>
*/
