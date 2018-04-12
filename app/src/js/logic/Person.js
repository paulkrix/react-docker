import Person from "../components/Person"

export default class PersonLogic {
  tagName = Person;
  constructor( name, colour, position ) {
    this.name = name;
    this.colour = colour;
    this.position = position;
  }
  getTagName() {
    return this.tagName;
  }
}
