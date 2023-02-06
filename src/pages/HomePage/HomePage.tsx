import { FC, useEffect, useState } from 'react';
import { ArticlesList } from '../../components/ArticlesList';
import { fetchArticles, fetchArticlesCount } from '../../Store/ArticlesSlice';
import { useAppDispatch, useAppSelector } from '../../Store/customHooks';
import { Pagination } from 'antd';

import style from './HomePage.module.scss';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.articles);
  const articlesCount = useAppSelector((state) => state.articles.articlesCount);

  const [currentPage, setCurrentPage] = useState(1);

  const changePage = (current: number) => {
    setCurrentPage(current);
  };

  useEffect(() => {
    dispatch(fetchArticles(currentPage - 1));
    dispatch(fetchArticlesCount());
  }, [dispatch, currentPage]);

  return (
    <div className={style.HomePage}>
      {loading && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}
      <ArticlesList />
      <div className={style.pagination}>
        <Pagination
          defaultCurrent={1}
          total={articlesCount / 5}
          current={currentPage}
          onChange={changePage}
        />
      </div>
    </div>
  );
};
export { HomePage };
