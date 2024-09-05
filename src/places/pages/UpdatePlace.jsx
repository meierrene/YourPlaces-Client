import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './PlaceForm.css';
import { useForm } from '../../shared/hooks/form-hook';
import { useEffect, useState } from 'react';
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useAuth } from '../../shared/context/AuthContext';

function UpdatePlace() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [placeData, setPlaceData] = useState();
  const navigate = useNavigate();
  const { placeId } = useParams();
  const { token } = useAuth();

  const [{ inputs, isValid }, handleInput, setFormData] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
    },
    true
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const data = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        setPlaceData(data.place);
        setFormData(
          {
            title: { value: data.place.title, isValid: true },
            description: { value: data.place.description, isValid: true },
          },
          true
        );
      } catch {}
    };
    fetchPlace();
  }, [placeId, sendRequest, setFormData]);

  if (!placeData && !error)
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: inputs.title.value,
          description: inputs.description.value,
        }),
        { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }
      );
      navigate(-1);
    } catch {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && placeData && (
        <form onSubmit={handleSubmit} className="place-form">
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            errorText="Please enter a valid title."
            validators={[VALIDATOR_REQUIRE()]}
            onInput={handleInput}
            value={inputs.title.value}
            valid={inputs.title.isValid}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description."
            onInput={handleInput}
            value={inputs.description.value}
            valid={inputs.description.isValid}
          />
          <Button type="submit" disabled={!isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
}

export default UpdatePlace;
