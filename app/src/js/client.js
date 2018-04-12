import React from "react";
import ReactDOM from "react-dom";
//import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Loop from "./components/Loop";
import World from "./components/World";

import Point from "./logic/Point";
import PersonLogic from "./logic/Person";

import './../scss/world.scss';


// import Archives from "./pages/Archives";
// import Featured from "./pages/Featured";
// import Layout from "./pages/Layout";
// import Settings from "./pages/Settings";

const people = [
  new PersonLogic( 'Jon', 'red', new Point( 2, 2 ) ),
  new PersonLogic( 'Paul', 'orange', new Point( 6, 3 ) ),
  new PersonLogic( 'Brett', 'blue', new Point( 1, 5 ) )
];
console.log( people );

const app = document.getElementById('app');

ReactDOM.render(
  <Loop>
    <World people={people}></World>
  </Loop>,
app);
