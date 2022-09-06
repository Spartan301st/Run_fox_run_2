import EventEmitter from "./EventEmitter.js";
export default class Sizes extends EventEmitter {
  constructor() {
    // for accessing/extending the constructor of the EventEmitter class
    super();
    // Initial Setup
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Resize event
    window.addEventListener("resize", () => {
      // redefine values
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      // trigger exists in EventEmitter
      this.trigger("resize");
    });
  }
}
