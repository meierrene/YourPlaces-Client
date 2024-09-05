import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useAuth } from '../../shared/context/AuthContext';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './PlaceForm.css';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const initialState = {
  title: { value: '', isValid: false },
  description: { value: '', isValid: false },
  address: { value: '', isValid: false },
  image: { value: null, isValid: false },
};

function NewPlace() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [{ inputs, isValid }, handleInput] = useForm(initialState, false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', inputs.title.value);
      formData.append('description', inputs.description.value);
      formData.append('address', inputs.address.value);
      formData.append('image', inputs.image.value);
      await sendRequest(
        import.meta.env.VITE_REACT_APP_BACKEND_URL + '/places',
        'POST',
        formData,
        {
          Authorization: 'Bearer ' + token,
        }
      );
      navigate(-1);
    } catch {}
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <form className="place-form" onSubmit={handleSubmit}>
        {isLoading && !error && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          errorText="Please enter a valid title."
          validators={[VALIDATOR_REQUIRE()]}
          onInput={handleInput}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          errorText="Please enter a valid description."
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={handleInput}
        />{' '}
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          errorText="Please enter a valid address."
          validators={[VALIDATOR_REQUIRE()]}
          onInput={handleInput}
        />
        <ImageUpload
          id="image"
          onInput={handleInput}
          errorText="Please provide an image."
        />
        <Button type="submit" disabled={!isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
}

export default NewPlace;
