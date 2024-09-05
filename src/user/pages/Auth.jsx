import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useAuth } from '../../shared/context/AuthContext';
import { useForm } from '../../shared/hooks/form-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EQUAL,
} from '../../shared/util/validators';
import './Auth.css';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

function Auth() {
  const { isLoggedIn, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  const initialState = {
    email: { value: '', isValid: false },
    password: { value: '', isValid: false },
  };

  const [{ inputs, isValid }, handleInput, setFormData] = useForm(
    initialState,
    false
  );

  const handleSubmit = async e => {
    e.preventDefault();
    if (isLogin) {
      try {
        const data = await sendRequest(
          import.meta.env.VITE_REACT_APP_BACKEND_URL + '/users/login',
          'POST',
          JSON.stringify({
            email: inputs.email.value,
            password: inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        );
        login(data.userId, data.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append('name', inputs.name.value);
        formData.append('email', inputs.email.value);
        formData.append('password', inputs.password.value);
        formData.append('image', inputs.image.value);
        const data = await sendRequest(
          import.meta.env.VITE_REACT_APP_BACKEND_URL + '/users/signup',
          'POST',
          formData
        );
        login(data.userId, data.token);
      } catch {}
    }
  };

  const handleSwitch = () => {
    if (!isLogin) {
      setFormData(
        {
          ...inputs,
          name: undefined,
          passwordConfirm: undefined,
          image: undefined,
        },
        inputs.email.isValid && inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...inputs,
          name: { value: '', isLogin: false },
          passwordConfirm: { value: '', isLogin: false },
          image: { value: null, isLogin: false },
        },
        false
      );
    }
    setIsLogin(login => !login);
  };

  if (isLoggedIn) return null;

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <Input
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name"
                onInput={handleInput}
              />
              <ImageUpload
                center
                id="image"
                onInput={handleInput}
                errorText="Please provide an image."
              />
            </>
          )}
          <Input
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={handleInput}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password."
            onInput={handleInput}
          />
          {!isLogin && (
            <Input
              id="passwordConfirm"
              type="password"
              label="Confirm Password"
              validators={[VALIDATOR_EQUAL(inputs?.password?.value)]}
              errorText="The password should match."
              onInput={handleInput}
            />
          )}
          <Button type="submit" disabled={!isValid}>
            {isLogin ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={handleSwitch}>
          SWITCH TO {!isLogin ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </Card>
    </>
  );
}

export default Auth;
