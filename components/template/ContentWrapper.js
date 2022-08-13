import Link from 'next/link';
import Image from 'next/image';
// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

import { selectAuthState, setAuthState } from '../../store/authSlice';
import catLogo from '../../public/cat_logo.png';

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

function UserProfile({ onUserAuthentication }) {
  return (
    <div className='dropdown'>
      <FontAwesomeIcon icon={faCircleUser} size="2x" />
      <div className='dropdown-content'>
        <Link href='/profile'>
          <li title="View your profile">Profile</li>
        </Link>
        <Link href='/settings'>
          <li title="Set some things">Settings</li>
        </Link>
        {/*  href='/api/logout' */}
        <li title="Logout" onClick={onUserAuthentication} >Logout</li>
      </div>
    </div>

  );
}

function Header() {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

  const onUserAuthentication = () => (authState
    ? dispatch(setAuthState(false))
    : dispatch(setAuthState(true)));

  return (
    <header>
      <Link href='/'>
        <div id="logo-header">
          <Image onContextMenu={(e) => e.preventDefault()} src={catLogo} alt="Erika Cat Logo" width={25} height={25} />
          <h1 title="Erika">Erika</h1>
        </div>
      </Link>
      {
        authState
          ? <UserProfile onUserAuthentication={onUserAuthentication} />
          : <>
            <button id="login" onClick={onUserAuthentication}>Log in</button>
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
          <Link href="/categories">
            <a>Categories</a>
          </Link>
        </li>
      </ul>
    </nav >
  );
}

// style={{ marginLeft: '100%' }}
