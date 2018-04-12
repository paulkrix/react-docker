import React from "react";

import Square from "./Square";

export default class Row extends React.Component {
  render() {
    const { row, y, rowContents } = this.props;
    const squares = row.map( ( value, index ) => {
      var contents = [];
      for( var i = 0; i < rowContents.length; i++ ) {
        var item = rowContents[i];
        if( item.position.x === index ) {
          contents.push( item );
        }
      }
      return <Square value={value} x={index} y={y} key={index} contents={contents}></Square>
    });
    return (
      <div class="row">{ squares }</div>
    );
  }
}
