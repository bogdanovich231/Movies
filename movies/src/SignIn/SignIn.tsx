import { useForm } from 'react-hook-form';
import { auth, logInWithEmailAndPassword } from '../Helper/auth';
import { IFormInput } from '../Types/Types';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

function SignIn() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    console.log(data);
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
    <div>
      <form>
        <h4>Sign In</h4>
        <div>
          <input placeholder="Email" {...register('email', { required: 'Email is required' })} />
        </div>
        {errors.email ? <p>{errors.email.message}</p> : null}
        <div>
          <input
            placeholder="Password"
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
        </div>
        {errors.password ? <p>{errors.password.message}</p> : null}
        <div>
          <button type="button" onClick={() => handleSubmit(onSubmit)()}>
            Sign In
          </button>
        </div>
        <div>
          <p>Don&apos;t Have an Account Yet?</p>
          {/* <Link to={'/register'}>Sign Up</Link> */}
        </div>
      </form>
    </div>
  );
}

export default SignIn;
