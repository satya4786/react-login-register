import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Login from './account/login';
import Register from './account/register';

function App() {
  return (
    <HashRouter>
     <Route exact path="/" component={Login}/> 
     <Route exact path="/register" component={Register}/>
    </HashRouter>
  );
}

export default App;