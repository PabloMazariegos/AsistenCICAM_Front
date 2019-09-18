import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//COMPONENTES
//-------------------------------
import NavBar         from './Components/NavBar/NavBar';
import Home           from './Components/Home/Home';
import Mantenimiento  from './Components/Mantenimiento/Mantenimiento';


ReactDOM.render(
  <BrowserRouter>
    <NavBar/>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Mantenimiento" exact component={Mantenimiento} />
    </Switch>
  </BrowserRouter>, 
  document.getElementById('root')
);

