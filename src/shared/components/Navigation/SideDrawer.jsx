import { useRef } from 'react';
import './SideDrawer.css';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

function SideDrawer({ children, show, onClick }) {
  const nodeRef = useRef(null);

  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <aside className="side-drawer" onClick={onClick}>
        {children}
      </aside>
    </CSSTransition>
  );
  const element = document.body;
  return createPortal(content, element);
}

export default SideDrawer;
