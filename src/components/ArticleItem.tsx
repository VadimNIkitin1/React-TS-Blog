import cuid from 'cuid';
import { textCut } from '../utils/text';
import style from './ArticleItem.module.scss';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Link } from 'react-router-dom';
import { IArticleIItem } from '../types/types';
import nonlike from '../img/heart 1.png';

const ArticleItem = ({
  title,
  tagList,
  author,
  createdAt,
  slug,
  description,
  favoritesCount,
}: IArticleIItem) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  const artDate = new Intl.DateTimeFormat('en-Us', dateOptions);

  return (
    <div className={style.articlesItem}>
      <div className={style.artInfo}>
        <div className={style.title_like}>
          <Link to={`/${slug}`}>
            <p className={style.title}>{title}</p>
          </Link>
          <img className={style.like_img} src={nonlike} alt="like" />
          <p className={style.favoritesCount}>{favoritesCount}</p>
        </div>
        <p className={style.articlesTags}>
          {tagList.map((t, i) => {
            const key = `${t}-${i}`;
            return (
              <span key={key} className={style.tags}>
                {`${textCut(t, 15)}`}
              </span>
            );
          })}
        </p>
        <p className={style.description}>{`${textCut(description, 200)}...`}</p>
      </div>
      <div className={style.userInfo}>
        <div>
          <p className={style.userName}>{author.username}</p>
          <p className={style.userDate}>{artDate.format(new Date(createdAt))}</p>
        </div>
        <div className={style.userImg}>
          <img src={author.image} alt="userImg" />
        </div>
      </div>
    </div>
  );
};
export { ArticleItem };
