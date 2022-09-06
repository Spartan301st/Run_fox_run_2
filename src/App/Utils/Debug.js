import * as dat from "dat.gui";
export default class Debug {
  constructor() {
    // for accessing url text after # symbol
    // console.log(window.location.hash);
    // if the hash part is debug then activate it
    this.active = window.location.hash === "#debug";
    if (this.active) {
      this.ui = new dat.GUI();
    }
  }
}
