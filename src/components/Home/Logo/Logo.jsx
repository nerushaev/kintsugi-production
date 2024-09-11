import React, { memo } from "react";
import { Link } from "react-router-dom";
import "./Logo.css";
import logoUrl from '../../../assets/kintsugi-logo.jpg';

const Logo = memo(() => {
  return (
    <Link to="/" href="../../../public/index.html">
      <img
        className={"nav-logo"}
        src={logoUrl}
        alt="logo"
      />
    </Link>
  );
});

export default Logo;
