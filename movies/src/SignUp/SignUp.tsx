import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormInput } from '../Types/Types';
import { schema } from '../Helper/validation';
import { auth, registerWithEmailAndPassword } from '../Helper/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  const onSubmit = async (data: IFormInput) => {
    try {
      const { name, email, password } = data;
      await registerWithEmailAndPassword(name, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/');
  }, [user, loading]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Sign Up</h4>
        <div>
          <input placeholder="Your Name" {...register('name', { required: true })} />
        </div>
        {errors.name ? <p>{errors.name.message}</p> : null}

        <div>
          <input placeholder="Email" {...register('email', { required: true })} />
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
          <input
            placeholder="Password Again"
            type="password"
            {...register('againPassword', { required: 'Confirm Password is required' })}
          />
        </div>
        {errors.againPassword ? <p>{errors.againPassword.message}</p> : null}
        <div>
          <button type="submit">Sign Up</button>
        </div>
        <div>
          <p>Already registered?</p>
          <p>Sign In</p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
