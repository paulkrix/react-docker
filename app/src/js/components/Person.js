import React from "react";

export default class Person extends React.Component {
  render() {
    console.log( "rendering person" );
    return (
      <div class="person"></div>
    );
  }
}
