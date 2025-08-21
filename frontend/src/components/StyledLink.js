// src/components/StyledLink.js

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const StyledLink = ({ to, children, className, onClick = () => {} }) => {
  const { setPageLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    onClick(); // Call original onClick if it exists (e.g., for closing mobile menu)
    
    setPageLoading(true);

    setTimeout(() => {
      navigate(to);
      // A short delay after navigation before hiding the loader
      setTimeout(() => setPageLoading(false), 200);
    }, 500); // 0.5 second loading animation
  };

  // If it's an external link or a hash link, use a regular <a> tag
  if (to.startsWith('#') || to.startsWith('http')) {
    return <a href={to} className={className}>{children}</a>;
  }

  return (
    <Link to={to} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};

export default StyledLink;