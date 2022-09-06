import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import Resources from "./Utils/Resources";
import sources from "./sources.js";
import Debug from "./Utils/Debug";

// would be used for a singleton instance
let instance = null;

export default class App {
  constructor(canvas) {
    // if instance already exists. Will be called from the Camera class
    if (instance) {
      return instance;
    }
    // initial instatiation of the instance
    instance = this;
    // global access
    window.app = this;
    this.canvas = canvas;

    // Initial setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    // sending reference to this App class as an arg to camera for creating it
    // this.camera = new Camera(this);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // Resize event to change sizes. Exists in EventEmitter
    // using arrow function notation to same the context of EventEmitter
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Tick event for tracking elapsed time, etc.
    this.time.on("tick", () => {
      this.update();
    });
  }
  resize() {
    // console.log(`Resizing`);
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    // console.log(`updating`);
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  destroy() {
    // stopping all events
    this.sizes.off("resize");
    this.time.off("tick");

    // traverse the whole scene
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        for (const key in child.material) {
          const value = child.material[key];
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });
    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) {
      this.debug.ui.destroy();
    }
  }
}
