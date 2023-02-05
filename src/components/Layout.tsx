import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

import style from './Layout.module.scss';

const Layout: FC = () => {
  return (
    <>
      <div className={style.Layout}>
        <Link to="/" className={style.logo}>
          Realworld Blog
        </Link>
        <div className={style.panel}>
          <button>Sign In</button>
          <Link to="/" className={style.panel_btnSignup}>
            Sign Up
          </Link>
        </div>
      </div>
      <Outlet />
      <footer className={style.footer}>2023 © Nikitin Vadim</footer>
    </>
  );
};
export { Layout };
