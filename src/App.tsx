import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { LoginPage } from './components/LoginPage';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import { MyListings } from './components/MyListings';
import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // required by carousel

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
         <ProtectedRoute path="/listings">
          <MyListings />
         </ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
