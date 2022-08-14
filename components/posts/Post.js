/* eslint-disable camelcase */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { dateToEnUsString } from '../../utils/utils';

export default function Post({
  // eslint-disable-next-line max-len
  staticData, created, eye_color, hair_color, gender, name, films, url, mass, id, username, title, content, date, likes, comments, category,
}) {
  return (
    <div className="post" id={staticData ? id : name}>
      {
        staticData
          ? <>
            <div className="username-date-div"><h3>{title}, by {username}</h3><p>{date}</p></div>
            <article className="post-div"><p>{content}</p></article>
            <div className="likes-category-div"><span>{likes}</span><p>{category.join(', ')}</p></div>
            <div className="comments-div">{comments}</div>
          </>
          : <>
            <Link href={`/${id}`}>
              <div style={{ cursor: 'pointer' }} className="username-date-div"><h3>{name}, with {eye_color} and {hair_color} hair.</h3><p>{dateToEnUsString(created)}</p></div>
            </Link>
            <div className="post-div"><p>Plays in:<br />{films.join(', ')}</p></div>
            <div className="likes-category-div"><span>A {mass} massed of</span><p>{gender}</p></div>
            <div className="comments-div">Look more at: {url}</div>
            {/* <Footer /> */}
          </>
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
/*
<div className="post" id={name}>
      <div className="username-date-div"><h3>{name}, by {homeworld}</h3><p>{created}</p></div>
      <div className="post-div"><p>{height}</p></div>
      <div className="likes-category-div"><span>{mass}</span><p>{films.join(', ')}</p></div>
      <div className="comments-div">{gender}</div>
    </div>
*/

/*
<div className="post" id={id}>
      <div className="username-date-div"><h3>{title}, by {username}</h3><p>{date}</p></div>
      <div className="post-div"><p>{content}</p></div>
      <div className="likes-category-div"><span>{likes}</span><p>{category.join(', ')}</p></div>
      <div className="comments-div">{comments}</div>
    </div>
*/
