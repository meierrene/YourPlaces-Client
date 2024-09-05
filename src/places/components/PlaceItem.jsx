import { useState } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Map from '../../shared/components/UIElements/Map';
import Modal from '../../shared/components/UIElements/Modal';
import { useAuth } from '../../shared/context/AuthContext';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './PlaceItem.css';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

function PlaceItem({ place, onDelete }) {
  const { userId, token } = useAuth();
  const [showMap, setShowMap] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleToggleMap = () => setShowMap(open => !open);

  const handleToggleConfirm = () => setShowConfirm(open => !open);

  const handleDelete = async () => {
    setShowConfirm(false);
    try {
      await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/places/${place.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + token,
        }
      );
      onDelete(place.id);
    } catch {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={handleToggleMap}
        header={place.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={handleToggleMap}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={place.location} zoom={12} />
        </div>
      </Modal>
      <Modal
        show={showConfirm}
        onCancel={handleToggleConfirm}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={handleToggleConfirm}>
              CANCEL
            </Button>
            <Button danger onClick={handleDelete}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed a delete this place? Please note that it cannot
          be undone later.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`${import.meta.env.VITE_REACT_APP_ASSET_URL}/${place.image}`}
              alt={place.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{place.title}</h2>
            <h3>{place.address}</h3>
            <p>{place.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={handleToggleMap}>
              VIEW ON MAP
            </Button>
            {userId === place.creator && (
              <>
                <Button to={`/places/${place.id}`}>EDIT</Button>
                <Button danger onClick={handleToggleConfirm}>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}

export default PlaceItem;
