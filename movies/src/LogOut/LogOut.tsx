import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Helper/auth';
import './LogOut.scss';

function LogOut() {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth);
    navigate('/');
  };
  return (
    <button className="logout" onClick={logout}>
      Log out
    </button>
  );
}

export default LogOut;
