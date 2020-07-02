import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import HomePage from './components/homepage.component';
import NotFound from './components/notfound.component';

function Header(props) {

  const isLogin = localStorage.getItem("login")

  return <nav className="navbar navbar-expand-lg navbar-light fixed-top">
    <div className="container">
      <Link className="navbar-brand" to={"/sign-in"}>Varmtech</Link>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto">
        
          {isLogin && <li className="nav-item">
            <Link className="nav-link" onClick={() => {
               localStorage.removeItem("login");
               localStorage.removeItem("id");
           window.location = '/';
            }}>Log out</Link>
          </li>
        }
        </ul>
      </div>
    </div>
  </nav>
}

function App() {
  return (<Router>
    <div className="App">
      <Header />
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            {/* <Route exact path='/' component={SignUp} /> */}
            <Route exact path="/" render={props => <Login {...props} />} />
            <Route path="/homepage" component={HomePage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
          
}

export default App;
