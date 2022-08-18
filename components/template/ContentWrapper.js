import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

import {
  selectAuthState, setAdminState, setAuthState, setToken,
} from '../../store/authSlice';
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
      <div className='col'>
        <h3>RISTEK Sistech Final Project</h3>
        <h4>Software Engineering division</h4>
        <br />
        <h3>Built using Next.js</h3>
        <br />
        <h4>Made with &#9829; by Sarah</h4>
        <br />
        <h5>sarahtanujaya@gmail.com</h5>
      </div>
      <div className='col'>
        <h4>See the Github repo at <br /> https://github.com/sarahT04/sistech-finpro</h4>
      </div>
    </footer>
  );
}

function UserProfile() {
  const dispatch = useDispatch();
  const onUserLogout = () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('userId');
    dispatch(setAuthState(false));
    dispatch(setAdminState(false));
    dispatch(setToken(null));
  };
  return (
    <div className='dropdown'>
      <FontAwesomeIcon icon={faCircleUser} size="2x" />
      <div className='dropdown-content'>
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
      {/* <Navbar /> */}
      {
        authState
          ? <UserProfile />
          : <div>
            <button id="login" onClick={() => router.push('/authentication?state=login')}>Log in</button>
            <button id="register" onClick={() => router.push('/authentication?state=register')}>Register</button>
          </div>
      }
    </header>
  );
}

// function Navbar() {
//   return (
//     <nav>
//       <li>
//         <Link href="/categories">
//           <a>Categories</a>
//         </Link>
//       </li>
//     </nav >
//   );
// }

// style={{ marginLeft: '100%' }}
