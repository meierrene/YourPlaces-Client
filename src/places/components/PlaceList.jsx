import './PlaceList.css';
import PlaceItem from './PlaceItem';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';

function PlaceList({ items, onDelete }) {
  if (!items?.length) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. How about to create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {items.map(place => (
        <PlaceItem key={place.id} place={place} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default PlaceList;
