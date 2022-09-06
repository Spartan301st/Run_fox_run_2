# Three.js Journey

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

```bash
# Install dependencies (only the first time)[](readme.md)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

## Project Notes

Writing whole code within the same file isn't ideal for the larger projects. Hard to find/re-use, conflicts with other vars/devs
We better split our spaghetti code into separate files(MODULES) and import them as needed. All the library/package imports are modules
When using webpack all the JS imports are merged into one file. We don't have to worry about the compatibility of modules. Note that modules are natively supported in different browsers
When we're importing from modules we can just import the things that we need and not everything
We can have one main component like App for the given project. We ca ncreate a class and export it. Then we can import it in script.js and create a new instance. In the class constructor we can add the instance name of the main class to the window, ex. window.app = this. This comes handy when we need to access the instance from the dev tools. Note the naming in this case. If you have other classes with the same name the last one would be accessible
When instantiating the main class we can pass the selected canvas to indicate which canvas we're dealing with. Now we are able to access the canvas arg from the class's constructor to do some manipulations.
there are handy classes that we can put in Utils dir inside our main App dir.
When the resize event occurs we can trigger an event to which we can listen from other classes and update camera or renderer for example.
Use this.functionName() within the arrow callback function to save the context.
There are 3 ways of accessing parent module data from the child module, either using a global var.(from window; very messy), by sending a param(this of the parent module; too much hustle), or by a singleton
A singleton is a class that will instantiate just like normal class when we create it 1st time. But for all the following times it will return that 1st instance.
For resize event we better propagate it from parent (App) to children modules, otherwise if we create resize event listener on each module there might be a clash of events
We need to update the class on each frame for the orbitControls and its damping feature
In the Environment class we can control the lights, shadows and environment map.
For better control we can centralize asset loading in a dedicated class (Resources) that will instantiate all of the loaders, loop through an array of assets and load them, trigger an event when all assets are loaded
crossFadeFrom is a method for transition of the animation from one to another. It should be called on the incoming action, with the prev action as the 1st param and the duration of the transition as the 2nd param. We have to reset and play the new animation
We need to dispose of geometries, materials, textures and specific things like controls, passes...
Note that when disposing of the things make sure to dive deeper and check everything that can be disposed
