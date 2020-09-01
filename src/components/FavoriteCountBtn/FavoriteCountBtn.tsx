import React from 'react';
import { Tooltip } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import servicesApi from '../../services/servicesAPI';
import { addFavotitesPost, addUnfavotitesPost } from '../../actions/actions';

const FavoriteCountBtn: React.FC<any> = ({
  count,
  slug,
  favorited,
}): JSX.Element => {
  const { isAuth, user } = useSelector((state: any) => state.isAuthentication);
  const token = isAuth && user.token;
  const dispatch = useDispatch();

  const onClickBtn = () => {
    const api = new servicesApi();
    const subscribe = favorited ? addUnfavotitesPost : addFavotitesPost;
    const method = favorited ? 'DELETE' : 'POST';
    api
      .changeRequest(null, token, method, `articles/${slug}/favorite`)
      .then(() => dispatch(subscribe()));
  };

  return (
    <Tooltip
      key='comment-basic-like-sdasf'
      title={!isAuth ? 'Требуется авторизация' : 'Мне нравится'}
    >
      <button
        className='post__like_btn'
        onClick={onClickBtn}
        disabled={!isAuth}
      >
        {favorited ? <HeartFilled /> : <HeartOutlined />}
        <span className='comment-action'>{count}</span>
      </button>
    </Tooltip>
  );
};

export default FavoriteCountBtn;