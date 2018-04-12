import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class WorldStore extends EventEmitter {

  constructor() {
    super()
    this.generateWorld();
    this.startDragSquare = null;

  }

  generateWorld() {
    const extras = [
      Math.floor( 1 + Math.random() * 3 ),
      Math.floor( 1 + Math.random() * 3 ),
      Math.floor( 1 + Math.random() * 3 ),
      Math.floor( 1 + Math.random() * 3 ),
    ];
    this.cols = 5 + extras[0] + extras[2];
    this.rows = 5 + extras[1] + extras[3];
    this.squares = [];
    for( var y = 0; y < this.rows; y++ ) {
      var row = [];
      for( var x = 0; x < this.cols; x++ ) {
        var value = 0;
        if( x >= extras[0] &&
            x < this.cols - extras[2] &&
            y >= extras[1] &&
            y < this.rows - extras[3] ) {
          value = 1;
        }
        row.push( value );
      }
      this.squares.push( row );
    }

    for( var y = 0; y < extras[1]; y++ ) {
      var additionalChance = 0.33 * ( 1 - (y / extras[1]));
      for( var x = 0; x < 5; x++ ) {
        var value = 0;
        if( this.squares[ extras[1] - y ][ extras[0] + x ] === 1 ) {
          value = Math.min( Math.round( Math.random() + additionalChance ), 1 );
        }
        this.squares[ extras[1] - y - 1 ][ extras[0] + x ] = value;
      }
    }
    for( var y = 0; y < extras[3]; y++ ) {
      var additionalChance = 0.33 * ( 1 - (y / extras[3]));
      for( var x = 0; x < 5; x++ ) {
        var value = 0;
        if( this.squares[ this.rows - extras[3] + y - 1 ][ extras[0] + x ] === 1 ) {
          value = Math.min( Math.round( Math.random() + additionalChance ), 1 );
        }
        this.squares[ this.rows - extras[3] + y ][ extras[0] + x ] = value;
      }
    }

    for( var y = 0; y < 5; y++ ) {
      for( var x = 0; x < extras[0]; x++ ) {
        var additionalChance = 0.33 * ( 1 - (x / extras[0]));
        var value = 0;
        if( this.squares[ extras[1] + y ][ extras[0] - x ] === 1 ) {
          value = Math.min( Math.round( Math.random() + additionalChance ), 1 );
        }
        this.squares[ extras[1] + y ][ extras[0] - x - 1] = value;
      }
    }

    for( var y = 0; y < 5; y++ ) {
      for( var x = 0; x < extras[2]; x++ ) {
        var additionalChance = 0.33 * ( x - (y / extras[2]));
        var value = 0;
        if( this.squares[ extras[1] + y ][ this.cols - extras[2] + x - 1 ] === 1 ) {
          value = Math.min( Math.round( Math.random() + additionalChance ), 1 );
        }
        this.squares[ extras[1] + y ][ this.cols - extras[2] + x ] = value;
      }
    }
  }

  updateSquare( x, y, value ) {
    this.squares[y][x] = value;
    this.emit( "change" );
  }

  handleDrag( x, y ) {
    //if theres no start to this drag then ignore the action
    if( this.startDragSquare === null ) {
      return;
    }
    var start = {
      x: Math.min( this.startDragSquare.x, x ),
      y: Math.min( this.startDragSquare.y, y )
    }
    var end = {
      x: Math.max( this.startDragSquare.x, x ),
      y: Math.max( this.startDragSquare.y, y )
    }
    this.startDragSquare = null;
    for( var x = start.x; x <= end.x; x++ ) {
      for( var y = start.y; y <= end.y; y++ ) {
        this.squares[y][x] = 0;
      }
    }
    this.emit( "change" );
  }

  getSquares() {
    return this.squares;
  }

  handleActions(action) {
    switch(action.type) {
      case "UPDATE_SQUARE": {
        this.updateSquare(action.x,action.y,action.value);
        break;
      }
      case "START_DRAG": {
        this.startDragSquare = { x:action.x, y:action.y };
        break;
      }
      case "END_DRAG": {
        this.handleDrag( action.x, action.y );
        break;
      }
    }
  }

}

const worldStore = new WorldStore;
dispatcher.register(worldStore.handleActions.bind(worldStore));

export default worldStore;
