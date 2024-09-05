import { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

function Users() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await sendRequest(
          import.meta.env.VITE_REACT_APP_BACKEND_URL + '/users'
        );
        setUserData(data.users);
      } catch {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && userData && <UsersList items={userData} />}
    </>
  );
}

export default Users;
