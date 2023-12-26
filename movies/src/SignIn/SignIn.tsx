import { useForm } from 'react-hook-form';
import { auth, logInWithEmailAndPassword } from '../Helper/auth';
import { IFormInput } from '../Types/Types';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../SignUp/Sign.scss';

function SignIn() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    const { email, password } = data;
    try {
      await logInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/');
  }, [user, loading]);

  return (
    <div className="form_container">
      <form>
        <h4 className="title">Sign In</h4>
        <div className="field_container">
          <input placeholder="Email" {...register('email', { required: 'Email is required' })} />
        </div>
        {errors.email ? <p>{errors.email.message}</p> : null}
        <div className="field_container">
          <input
            placeholder="Password"
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
        </div>
        {errors.password ? <p>{errors.password.message}</p> : null}
        <div className="submit">
          <button type="button" onClick={() => handleSubmit(onSubmit)()}>
            Sign In
          </button>
        </div>
        <div className="auth_issue">
          <p>Don&apos;t Have an Account Yet?</p>
          <Link to={'/register'}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
