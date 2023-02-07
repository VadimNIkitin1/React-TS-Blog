import { FC, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppSelector } from '../Store/customHooks';

import style from './Layout.module.scss';

const Layout: FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const { author } = useAppSelector((state) => state.article.article);

  return (
    <>
      <div className={style.Layout}>
        <Link to="/" className={style.logo}>
          Realworld Blog
        </Link>
        {isAuth ? (
          <div className={style.userPanel}>
            <button>
              <Link to="/" className={style.panel_btnSignup}>
                Create Article
              </Link>
            </button>
            <p>{author.username}</p>
            <div className={style.userImg}>
              <img src={author.image} alt="userImg" />
            </div>
            <button className={style.logoutBtn}>Log Out</button>
          </div>
        ) : (
          <div className={style.panel}>
            <button>
              <Link to="/sign-in" className={style.sign_in}>
                Sign In
              </Link>
            </button>
            <Link to="/sign-up" className={style.panel_btnSignup}>
              Sign Up
            </Link>
          </div>
        )}
      </div>

      <Outlet />
      <footer className={style.footer}>2023 © Nikitin Vadim</footer>
    </>
  );
};
export { Layout };
