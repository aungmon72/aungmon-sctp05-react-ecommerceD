import ProductCard from './ProductCard';
import React, {useState, useEffect } from 'react';
import Navbar from './Navbar';
import HomePage from './HomePage';
import { Route, Switch } from 'wouter';
import ProductsPage from './ProductsPage';
import RegisterPage from './RegisterPage';
import { useFlashMessage } from './FlashMessageStore';
import ShoppingCart from './ShoppingCart';
// make sure to import `UserLogin.jsx` after the other imports
import UserLogin from "./UserLogin";
import UserLogoff from "./UserLogoff";
import Profile from "./Profile";
import UserPassword from "./UserPassword";

//  
// STRIPE_SECRET_KEY = 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

//  console.log("App.jsx");
function home() {
  for (let i = 1; i <= 23; i++) {
    for (let j = 1; j <= 40; j++) {
        if (i >= 1 && i <= 11) {
            if (i === 1 && j >= 11 && j <= 30) {
                if (j === 11 || j === 30) {
                    process.stdout.write("\\");
                } else if (j === 12 || j === 29) {
                    process.stdout.write("S");
                } else if (j === 13 || j === 28) {
                    process.stdout.write("Y");
                } else {
                    process.stdout.write(" ");
                }
            } else {
                process.stdout.write(" ");
            }
        } else if (i >= 12 && i <= 16) {
            if (j === 21 || j === 40) {
                process.stdout.write("!");
            } else {
                process.stdout.write("#");
            }
        } else {
            if (j === 1 || j === 21 || j === 40) {
                process.stdout.write("@");
            } else if ((j >= 7 && j <= 14) || (j >= 22 && j <= 39)) {
                process.stdout.write("=");
            } else if (j >= 23 && j <= 38) {
                process.stdout.write(".");
            } else {
                process.stdout.write(" ");
            }
        }
    }
    console.log(); // New line after each row
}

}
function App2() {


  return (
    <>
      <Navbar />

      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>

      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p>&copy; 2023 E-Shop. All rights reserved.</p>
        </div>
      </footer>
		</>    
  );
}

let counter = 0;

function App() {
  const { getMessage, clearMessage  } = useFlashMessage();
  const flashMessage = getMessage();
  if (++counter % 40 ==0) console.log("App()  ", counter);
  useEffect(() => {

    const timer = setTimeout(() => {
      clearMessage();
    }
    , 3000);
    return () => {
      clearTimeout(timer);
    };
  }
  , [flashMessage]);

  return (
    <>
      <Navbar />
      {flashMessage.message && (
        <div className={`alert alert-${flashMessage.type} text-center flash-alert`} role="alert">
          {flashMessage.message}
        </div>
      )}
      <Switch>
        <Route path="/"               component={HomePage} />
        <Route path="/products"       component={ProductsPage} />
        <Route path="/register"       component={RegisterPage} />
        <Route path="/login"          component={UserLogin} />
        <Route path="/cart"           component={ShoppingCart} />
        <Route path="/logoff"         component={UserLogoff} />
        <Route path="/profile"        component={Profile} />
        <Route path="/userpassword"   component={UserPassword} />
        
      
      </Switch>

      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p>&copy; 2023 E-Shop. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}


export default App;