import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

import { selectAuthState, setAuthState, setToken } from '../../store/authSlice';
import catLogo from '../../public/cat_logo.png';

export default function ContentWrapper({ children }) {
  return (
    <>
      <Header />
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

function UserProfile() {
  const dispatch = useDispatch();
  const onUserLogout = () => {
    localStorage.removeItem('TOKEN');
    dispatch(setAuthState(false));
    dispatch(setToken(null));
  };
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
        <li title="Logout" onClick={onUserLogout} >Logout</li>
      </div>
    </div>

  );
}

function Header() {
  // localStorage.setItem('TOKEN', JSON.stringify(result.token));
  const authState = useSelector(selectAuthState);
  const router = useRouter();

  return (
    <header>
      <Link href='/'>
        <div id="logo-header">
          <Image onContextMenu={(e) => e.preventDefault()} src={catLogo} alt="Erika Cat Logo" width={25} height={25} />
          <h1 title="Erika">Erika</h1>
        </div>
      </Link>
      <Navbar />
      {
        authState
          ? <UserProfile/>
          : <div>
            <button id="login" onClick={() => router.push('/authentication?state=login')}>Log in</button>
            <button id="register" onClick={() => router.push('/authentication?state=register')}>Register</button>
          </div>
      }
    </header>
  );
}

function Navbar() {
  return (
    <nav>
      <li>
        <Link href="/categories">
          <a>Categories</a>
        </Link>
      </li>
    </nav >
  );
}

// style={{ marginLeft: '100%' }}
