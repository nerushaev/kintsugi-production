import React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";
import logoUrl from '../../../assets/kintsugi-logo.jpg';

const Logo = (className) => {
  return (
    <Link to="/" href="../../../public/index.html">
      <img
        className={`${className.className}`}
        src={logoUrl}
        alt="logo"
      />
    </Link>
  );
};

export default Logo;
