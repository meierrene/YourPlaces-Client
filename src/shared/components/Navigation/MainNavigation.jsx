import { Link } from 'react-router-dom';
import MainHeader from './MainHeader';
import './MainNavigation.css';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import { useState } from 'react';
import Backdrop from '../UIElements/Backdrop';

function MainNavigation() {
  const [isOpened, setIsOpened] = useState(false);

  const handleNavigation = () => {
    setIsOpened(open => !open);
  };

  return (
    <>
      {isOpened && <Backdrop onClick={handleNavigation} />}
      <SideDrawer show={isOpened} onClick={handleNavigation}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={handleNavigation}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
}

export default MainNavigation;
