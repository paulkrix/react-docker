import React from "react";

import * as WorldActions from "../actions/WorldActions";
import WorldStore from "../stores/WorldStore";

import Row from "./Row.js";

export default class World extends React.Component {
  constructor(props) {
    super(props);
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

  getSquares = () => {
    this.setState({
      squares: WorldStore.getSquares(),
    });
  }

  render() {
    const { squares } = this.state;
    const { people } = this.props;
    const RowComponents = squares.map( ( row_array, index ) => {
      var contents = people.filter(person => person.position.y === index);
      return <Row key={index} y={index} row={row_array} rowContents={contents} />;
    });

    return (
      <div class="world">{ RowComponents }</div>
    );
  }
}
