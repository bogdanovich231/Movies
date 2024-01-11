import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormInput } from '../Types/Types';
import { schema } from '../Helper/validation';
import { auth, registerWithEmailAndPassword } from '../Helper/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Sign.scss';

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
    <div className="form_container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className="title">Sign Up</h4>
        <div className="field_container">
          <input placeholder="Your Name" {...register('name')} />
        </div>
        {errors.name ? <p>{errors.name.message}</p> : null}

        <div className="field_container">
          <input placeholder="Email" {...register('email')} />
        </div>
        {errors.email ? <p>{errors.email.message}</p> : null}

        <div className="field_container">
          <input placeholder="Password" type="password" {...register('password')} />
        </div>
        {errors.password ? <p>{errors.password.message}</p> : null}

        <div className="field_container">
          <input placeholder="Password Again" type="password" {...register('againPassword')} />
        </div>
        {errors.againPassword ? <p>{errors.againPassword.message}</p> : null}
        <div className="submit">
          <button type="submit">Sign Up</button>
        </div>
        <div className="auth_issue">
          <p>Already registered?</p>
          <Link to={'/autorization'}>Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
