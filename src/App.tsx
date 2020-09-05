import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { LoginPage } from './features/login/LoginPage';
import './App.css';
import { Search } from './features/property/Search';

function App() {  
  return (
    <div className="App">
      <Router>
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
