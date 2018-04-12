import React from "react";

import Square from "./Square";

export default class Row extends React.Component {
  render() {
    const { row, y, rowContents } = this.props;
    const squares = row.map( ( value, index ) => {
      var contents = rowContents.filter(item => item.position.x === index);
      return <Square value={value} x={index} y={y} key={index} contents={contents}></Square>
    });
    return (
      <div class="row">{ squares }</div>
    );
  }
}
