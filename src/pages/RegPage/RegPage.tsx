import { FC } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import style from './RegPage.module.scss';
import { ISubmitForm } from '../../types/types';

const RegPage: FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    reset,
  } = useForm<ISubmitForm>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ISubmitForm> = (data: object) => {
    alert(JSON.stringify(data));
    reset();
  };

  return (
    <div className={style.RegPage}>
      <div className={style.regForm}>
        <h2 className={style.formTitle}>Create new account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <label className={style.inputBlock}>
            Username
            <input
              {...register('username', {
                required: 'Required field',
                minLength: {
                  value: 3,
                  message: 'Your username needs to be at least 6 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Max length 20 letters',
                },
              })}
              placeholder="Username"
              className={style.input}
            />
          </label>
          {errors.username && <p className={style.error}>{errors.username.message}</p>}
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
              {...register('pass', {
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
          {errors.pass && <p className={style.error}>{errors.pass.message}</p>}
          <label className={style.inputBlock}>
            Repeate password
            <input
              {...register('repeatePass', {
                required: 'Required field!!',
                validate: (value, allValues) => {
                  const { pass } = allValues;
                  return pass === value;
                },
              })}
              type="password"
              placeholder="Repeate password"
              className={style.input}
            />
          </label>
          {getValues('repeatePass') !== getValues('pass') && (
            <p className={style.error}>Passwords must mutch!</p>
          )}
          {errors.repeatePass && <p className={style.error}>{errors.repeatePass.message}</p>}
          <label className={style.check}>
            <input
              {...register('checkbox', {
                required: 'Required field',
              })}
              type="checkbox"
              className={style.checkBox}
            />
            I agree to the processing of my personal information
          </label>
          {errors.checkbox && <p className={style.error}>{errors.checkbox.message}</p>}
          <button className={style.formBtn}>
            <input type="submit" value="Create" disabled={!isValid} />
          </button>
        </form>
        <div className={style.formFooter}>
          Already have an account?{' '}
          <Link to="/sign-in">
            <p className={style.redirect}>Sign In.</p>
          </Link>{' '}
        </div>
      </div>
    </div>
  );
};
export { RegPage };
