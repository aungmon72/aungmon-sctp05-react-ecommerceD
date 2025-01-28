import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';


function Navbar() {
  const [globalVariableNavbar, setGlobalVariableNavbar] = useState(0);
  // console.log(globalVariableNavbar);
  // setGlobalVariableNavbar(globalVariableNavbar + 1);
  // if (globalVariableNavbar%100==0) console.log(globalVariableNavbar);
  const [isNavbarShowing, setIsNavbarShowing] = useState(false);
  const [isNavbarUserShowing, setIsNavbarUserShowing] = useState(false);
  // returns the current URL
  const [location] = useLocation();
  let counter;
  //console.log("location  == ", location);
  //  console.log("Navbar.jsx");
  const toggleNavbar = () => {
    setIsNavbarShowing(!isNavbarShowing);
  };
  const toggleNavbarUser = () => {
    setIsNavbarUserShowing(prevState => !prevState);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link href="/" className="navbar-brand">E-Shop</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${location === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/products" className={`nav-link ${location === '/products' ? 'active' : ''}`}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/register" className={`nav-link ${location === '/register' ? 'active' : ''}`}>
                Register
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/cart" className={`nav-link ${location === '/cart' ? 'active' : ''}`}>
                Cart
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/login" className={`nav-link ${location === '/login' ? 'active' : ''}`}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/logoff" className={`nav-link ${location === '/logoff' ? 'active' : ''}`}>
                Logoff
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/profile" className={`nav-link ${location === '/profile' ? 'active' : ''}`}>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/userpassword" className={`nav-link ${location === '/userpassword' ? 'active' : ''}`}>
                Password Change
              </Link>
            </li>

            <li>
              {NavbarUser(isNavbarUserShowing)}
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );  // return

  function NavbarUser2(isNavbarShowing) {
    return (
      <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item" onClick={toggleNavbarUser}>
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleNavbarUser}
            >!!!User!!!
              <span className="navbar-toggler-icon"> ^^^User^^^</span>
            </button>
          </li>
          <li className="nav-item" onClick={toggleNavbarUser}>
            <span className="nav-link">
              ++User++
            </span>
          </li>
          <li className="nav-item">
            <Link href="/login" className={`nav-link ${location === '/login' ? 'active' : ''}`}>
              --User Login--
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/logoff" className={`nav-link ${location === '/logoff' ? 'active' : ''}`}>
              --User Logoff--
            </Link>
          </li>
        </ul>
      </div>
    );  // return
  }  //    function NavbarUser2() {

  function NavbarUser(isNavbarShowing) {
    return (
      <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} id="navbarNav">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item" onClick={toggleNavbarUser}>
            <span className="nav-link">
              ++User++
            </span>
          </li>
          <li className="nav-item">
            <Link href="/login" className={`nav-link ${location === '/login' ? 'active' : ''}`}>
              --User Login--
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/logoff" className={`nav-link ${location === '/logoff' ? 'active' : ''}`}>
              --User Logoff--
            </Link>
          </li>
        </ul>
      </div>
    );  // return
  }  //    function NavbarUser() {

}  //    function Navbar() {






export default Navbar;
