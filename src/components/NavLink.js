import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import IconButton from './IconButton';

function NavLink(props) {
  const [isActive, setIsActive] = useState(false);

  function isLinkActive(match, location) {
    if (!match) {
      setIsActive(false);
      return false;
    }
    const active = match.url === location.pathname
    setIsActive(active);
    return active;
  }
  return (
    <Link to={props.to} exact={props.exact} isActive={isLinkActive}>
      <IconButton {...props} isActive={isActive}>{props.children}</IconButton>
    </Link>
  )
}

export default NavLink;