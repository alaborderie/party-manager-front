import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import Button from './Button';

interface NavLinkProps {
  to: string;
  exact?: boolean | undefined;
  children: any;
  [propName: string]: any;
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
  return (
    <Link to={props.to} exact={props.exact} isActive={isLinkActive}>
      <Button {...props} isActive={isActive}>{props.children}</Button>
    </Link>
  )
}

export default NavLink;