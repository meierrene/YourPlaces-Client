import { Link } from 'react-router-dom';
import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

function UserItem({ user }) {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${user.id}/places`}>
          <Avatar
            className="user-item__image"
            image={`${import.meta.env.VITE_REACT_APP_ASSET_URL}/${user.image}`}
            alt={user.name}
          />
          <div className="user-item__info">
            <h2>{user.name}</h2>
            <h3>
              {user.places.length} Place{user.places.length === 1 ? '' : 's'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}

export default UserItem;
