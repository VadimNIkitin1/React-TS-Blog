import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Store/customHooks';
import { editArticle } from '../../Store/Reducers/SingleArticleSlice';

import style from './EditArticle.module.scss';

const EditArticle: FC = () => {
  const { body, title, description, slug } = useAppSelector((state) => state.article.article);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: { title, body, description },
  });

  interface IEditForm {
    title: string;
    description: string;
    body: string;
  }

  interface IEditData {
    article: {
      title: string;
      description: string;
      body: string;
      slug: string;
    };
  }

  const onSubmit: SubmitHandler<IEditForm> = (data: IEditForm) => {
    const requestData: IEditData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        slug: slug!,
      },
    };
    reset();

    dispatch(editArticle(requestData));
    navigate('/', { replace: true });
  };

  return (
    <div className={style.CreateArticle}>
      <div className={style.CreateArticle_card}>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={style.form_title}>Edit article</h2>
          <label className={style.form_label}>
            Title
            <input
              {...register('title', {
                required: 'Required field',
              })}
              placeholder="Title"
              className={style.form_input}
            />
          </label>
          {errors.title && <p className={style.error}>{errors.title.message}</p>}
          <label className={style.form_label}>
            Short description
            <input
              {...register('description', {
                required: 'Required field',
              })}
              placeholder="Description"
              className={style.form_input}
            />
          </label>
          {errors.description && <p className={style.error}>{errors.description.message}</p>}
          <label className={style.form_label}>
            Text
            <textarea
              {...register('body', {
                required: 'Required field',
              })}
              placeholder="Text"
              className={style.form_textarea}
            />
          </label>
          {errors.body && <p className={style.error}>{errors.body.message}</p>}
          <label className={style.form_label__tags}>
            Tags
            <label className={style.tags_form}>
              <input placeholder="Tag" className={style.form_input__tags} />
              <button className={style.btn_delete}>Delete</button>
              <button className={style.btn_add}>Add Tag</button>
            </label>
          </label>
          <button className={style.form_submit} disabled={!isValid}>
            <input type="submit" value="Send" />
          </button>
        </form>
      </div>
    </div>
  );
};

export { EditArticle };
