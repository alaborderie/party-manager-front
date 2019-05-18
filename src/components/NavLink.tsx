import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import IconButton from './Button';

interface NavLinkProps {
  to: string;
  exact: boolean | undefined;
  children: any;
}

function NavLink(props: NavLinkProps) {
  const [isActive, setIsActive] = useState(false);

  function isLinkActive(match: any, location: any) {
    if (!match) {
      setIsActive(false);
      return false;
    }
    const active = match.url === location.pathname;
    setIsActive(active);
    return active;
  }
  // @ts-ignore
  return (
    <Link to={props.to} exact={props.exact} isActive={isLinkActive}>
      <IconButton {...props} isActive={isActive}>{props.children}</IconButton>
    </Link>
  )
}

export default NavLink;