import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

import { selectAuthState } from '../../store/authSlice';

export default function ContentWrapper({ children }) {
  return (
    <>
      <Header />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export function Footer() {
  return (
    <footer>
      <h1>Some Footer</h1>
    </footer>
  );
}

function Header() {
  const authState = useSelector(selectAuthState);
  // const dispatch = useDispatch(); // To login/register use this later.
  return (
    <header>
      <Link href='/'>
        <h1 title="Erika" style={{ cursor: 'pointer' }}>Erika</h1>
      </Link>
      {
        authState
          ? <FontAwesomeIcon icon={faCircleUser} size="2x" />
          : <>
            <button id="login">Log in</button>
            <button id="register">Register</button>
          </>
      }

    </header>
  );
}

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Categories</a>
          </Link>
        </li>
      </ul>
    </nav >
  );
}

// style={{ marginLeft: '100%' }}
