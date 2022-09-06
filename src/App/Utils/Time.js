import EventEmitter from "./EventEmitter.js";

export default class Time extends EventEmitter {
  constructor() {
    super();
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    // don't put 0 as it might create a specific bug. 16 because of 1000ms/60fps~16
    this.delta = 16;

    // We aren't calling tick immediately to avoid having delta 0
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;
    this.trigger("tick");
    // console.log(this.elapsed);
    // callback is necessary for keeping the context
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
