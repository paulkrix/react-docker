import dispatcher from "../dispatcher";

export function updateSquare( x, y, value) {
  dispatcher.dispatch({
    type: "UPDATE_SQUARE",
    x,
    y,
    value
  });
}

export function startDrag( x, y ) {
  dispatcher.dispatch({
    type: "START_DRAG",
    x,
    y
  });
}

export function endDrag( x, y ) {
  dispatcher.dispatch({
    type: "END_DRAG",
    x,
    y
  });
}
