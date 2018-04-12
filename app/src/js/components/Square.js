import React from "react";

import * as WorldActions from "../actions/WorldActions";
import Person from "./Person";

export default class Square extends React.Component {
  startDrag( x, y ) {
    WorldActions.startDrag( x, y );
  }
  endDrag( x, y ) {
    WorldActions.endDrag( x, y );
  }
  render() {
    const { x, y, value, contents } = this.props;
    if( contents.length > 0 ) {
      console.log( contents );
    }
    const items = contents.map( ( item, index ) => {
      const TagName = item.getTagName();
      return <TagName key={index} />;
    });
    console.log( items );
    return (
      <div class="square" data-value={value} x={x} y={y} onMouseDown={ () => this.startDrag( x, y )} onMouseUp={ () => this.endDrag( x, y ) }>
        { items }
      </div>
    );
  }
}
