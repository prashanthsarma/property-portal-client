import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { LoginPage } from './features/login/LoginPage';
import './App.css';
import { Search } from './features/property/Search';
import { Navbar } from './features/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Search />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          {/* <Route path="/dashboard">
            <Dashboard />
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
