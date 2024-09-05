import { NavLink } from 'react-router-dom';
import './NavLinks.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Button from '../FormElements/Button';

function NavLinks() {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <NavLink to={`${userId}/places`}>MY PLACES</NavLink>
          </li>
          <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
          </li>
          <li>
            <Button onClick={logout}>LOGOUT</Button>
          </li>
        </>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
