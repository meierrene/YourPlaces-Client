import { useEffect, useReducer, useState } from 'react';
import { validate } from '../../util/validators';
import './Input.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.payload,
        isTouched: true,
        isValid: validate(action.payload, action.validators),
      };
    default:
      return state;
  }
};

function Input({
  id,
  label,
  type,
  element = 'input',
  placeholder,
  rows = 3,
  errorText,
  validators,
  onInput,
  value: initValue,
  valid,
}) {
  const [unhide, setUnhide] = useState(false);
  const [{ value, isTouched, isValid }, dispatch] = useReducer(reducer, {
    value: initValue || '',
    isTouched: false,
    isValid: valid || false,
  });

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  const handleChange = e =>
    dispatch({
      type: 'CHANGE',
      payload: e.target.value,
      validators: validators,
    });

  const handleUnhide = () => setUnhide(u => !u);

  const elementArea =
    (element === 'input' && (
      <div className={id.includes('password') ? 'password' : ''}>
        <input
          id={id}
          type={id.includes('password') ? (unhide ? 'text' : type) : type}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleChange}
          value={value}
        />
        {id.includes('password') && (
          <span className="icon">
            <svg
              onClick={handleUnhide}
              width="25"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              {unhide ? (
                <path d="M409.84,132.33l95.91-95.91A21.33,21.33,0,1,0,475.58,6.25L6.25,475.58a21.33,21.33,0,1,0,30.17,30.17L140.77,401.4A275.84,275.84,0,0,0,256,426.67c107.6,0,204.85-61.78,253.81-161.25a21.33,21.33,0,0,0,0-18.83A291,291,0,0,0,409.84,132.33ZM256,362.67a105.78,105.78,0,0,1-58.7-17.8l31.21-31.21A63.29,63.29,0,0,0,256,320a64.07,64.07,0,0,0,64-64,63.28,63.28,0,0,0-6.34-27.49l31.21-31.21A106.45,106.45,0,0,1,256,362.67ZM2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.15,147.11,148.4,85.33,256,85.33a277,277,0,0,1,70.4,9.22l-55.88,55.88A105.9,105.9,0,0,0,150.44,270.52L67.88,353.08A295.2,295.2,0,0,1,2.19,265.42Z" />
              ) : (
                <path d="M320,256a64,64,0,1,1-64-64A64.07,64.07,0,0,1,320,256Zm189.81,9.42C460.86,364.89,363.6,426.67,256,426.67S51.14,364.89,2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.14,147.11,148.4,85.33,256,85.33s204.86,61.78,253.81,161.25A21.33,21.33,0,0,1,509.81,265.42ZM362.67,256A106.67,106.67,0,1,0,256,362.67,106.79,106.79,0,0,0,362.67,256Z" />
              )}
            </svg>
          </span>
        )}
      </div>
    )) ||
    (element === 'textarea' && (
      <textarea
        id={id}
        rows={rows}
        onChange={handleChange}
        onBlur={handleChange}
        value={value}
      />
    ));

  return (
    <div
      className={`form-control ${
        !isValid && isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {elementArea}
      {!isValid && isTouched && <p>{errorText}</p>}
    </div>
  );
}

export default Input;
