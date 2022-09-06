import * as THREE from "three";
import App from "../App";
import Environment from "./Environment";
import Floor from "./Floor";
import Fox from "./Fox";

export default class World {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.resources = this.app.resources;

    // Test mesh
    // const testMesh = new THREE.Mesh(
    //   new THREE.BoxGeometry(1, 1, 1),
    //   //   new THREE.MeshBasicMaterial({ wireframe: true })
    //   new THREE.MeshStandardMaterial()
    // );
    // this.scene.add(testMesh);

    this.resources.on("ready", () => {
      // Setup
      this.floor = new Floor();
      this.fox = new Fox();
      this.environment = new Environment();
    });
  }
  update() {
    if (this.fox) this.fox.update();
  }
}
