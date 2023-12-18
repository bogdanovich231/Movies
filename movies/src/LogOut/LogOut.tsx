import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Helper/auth';

function LogOut() {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth);
    navigate('/');
  };
  return <button onClick={logout}>Log out</button>;
}

export default LogOut;
