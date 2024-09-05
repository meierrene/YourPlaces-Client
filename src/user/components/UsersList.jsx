import Card from '../../shared/components/UIElements/Card';
import UserItem from './UserItem';
import './UsersList.css';

function UsersList({ items }) {
  if (!items.length) {
    return (
      <div className="center">
        <Card>
          <h2>No users found</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {items.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}

export default UsersList;
