import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

function UserPlaces() {
  const [placeData, setPlaceData] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { userId } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setPlaceData(data.places);
      } catch {}
    };

    fetchPlaces();
  }, [error, sendRequest, userId]);

  const handleDelete = id => {
    setPlaceData(prev => prev.filter(place => place.id !== id));
  };

  return (
    <>
      {error && !isLoading && !placeData && (
        <ErrorModal error={error} onClear={clearError} />
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <PlaceList items={placeData} onDelete={handleDelete} />
      )}
    </>
  );
}

export default UserPlaces;
