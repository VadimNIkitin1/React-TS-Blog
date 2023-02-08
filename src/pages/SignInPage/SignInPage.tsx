import { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import style from './SignInPage.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginForm } from '../../types/types';
import { ILogin } from '../../model/signup';
import { useAppDispatch } from '../../Store/customHooks';
import { login } from '../../Store/AuthSlice';

const SignInPage: FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const onSubmit: SubmitHandler<ILoginForm> = (data: ILoginForm) => {
    const requestData: ILogin = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    reset();
    dispatch(login(requestData));
    navigate(fromPage, { replace: true });
  };

  return (
    <div className={style.SignInPage}>
      <div className={style.regForm}>
        <h2 className={style.formTitle}>Sign in</h2>
        <form onChange={handleSubmit(onSubmit)} className={style.form}>
          <label className={style.inputBlock}>
            Email address
            <input
              {...register('email', {
                required: 'email is not correct',
                pattern: {
                  value:
                    /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$/u,
                  message: 'Please enter valid Email!',
                },
              })}
              type="email"
              placeholder="Email address"
              className={style.input}
            />
          </label>
          {errors.email && <p className={style.error}>{errors.email.message} </p>}
          <label className={style.inputBlock}>
            Password
            <input
              {...register('password', {
                required: 'Required field',
                minLength: {
                  value: 6,
                  message: 'Your password needs to be at least 6 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'Max length 40 letters',
                },
              })}
              type="password"
              placeholder="Password"
              className={style.input}
            />
          </label>
          {errors.password && <p className={style.error}>{errors.password.message}</p>}
          <button className={style.formBtn}>
            <input type="submit" value="Login" disabled={!isValid} />
          </button>
        </form>
        <div className={style.formFooter}>
          Don`t have an account?{' '}
          <Link to="/sign-in">
            <p className={style.redirect}>Sign Up.</p>
          </Link>{' '}
        </div>
      </div>
    </div>
  );
};
export { SignInPage };
