import React from "react";

import * as WorldActions from "../actions/WorldActions";
import WorldStore from "../stores/WorldStore";

import Row from "./Row.js";

export default class World extends React.Component {
  constructor() {
    super();
    this.getSquares = this.getSquares.bind(this);
    this.state = {
      squares: WorldStore.getSquares(),
    }
  }

  componentDidMount() {
    WorldStore.on("change", this.getSquares);
  }

  componentWillUnmount() {
    WorldStore.removeListener("change", this.getSquares);
  }

  getSquares() {
    this.setState({
      squares: WorldStore.getSquares(),
    });
  }

  render() {
    const { squares } = this.state;
    const { people } = this.props;
    const RowComponents = squares.map( ( row_array, index ) => {
      var contents = [];
      for( var i = 0; i < people.length; i++  ) {
        var person = people[i];
        if( person.position.y === index ) {
          contents.push( person );
        }
      }
      return <Row key={index} y={index} row={row_array} rowContents={contents} />;
    });

    return (
      <div class="world">{ RowComponents }</div>
    );
  }
}
