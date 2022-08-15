import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { authenticateUser } from '../utils/utils';
import { selectAuthState, setAuthState, setToken } from '../store/authSlice';

// SHOULD BE OK

export default function AuthenticationPage() {
  const router = useRouter();
  const state = router.query.state ?? 'login';
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authState) {
      router.push('/');
    }
  }, [authState, router]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await authenticateUser({ state, username, password });
      if (state === 'register' && result.data.username === username) {
        setMessage('Succesful. Please login');
      }
      if (result.data.token) {
        localStorage.setItem('TOKEN', JSON.stringify(result.token));
        dispatch(setAuthState(true));
        dispatch(setToken(result.token));
      }
    } catch (err) {
      setMessage(`Unsuccesful ${state}. Please try again.`);
    }
  };

  return (
    <div className="authenticate-body">
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login">
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input type="text" className="login__input" placeholder="User name" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input type="password" className="login__input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button className="button login__submit"
                onClick={handleSubmit}>
                <span className="button__text">{
                  state === 'login'
                    ? 'Log in '
                    : 'Register '
                }now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
              <button className="button login__submit"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/authentication?state=${state !== 'login'
                    ? 'login'
                    : 'register '}`);
                }}>
                <span className="button__text">{
                  state !== 'login'
                    ? 'Log in '
                    : 'Register '
                }instead</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
            <div>
              <p>{message}</p>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
