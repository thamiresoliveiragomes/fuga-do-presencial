function setup() {
  cnv = createCanvas(windowWidth, windowHeight)
  
  window.DEBUG_COLLISION = false; 
  
  frameRate(40);

  home = new Home()
  home.setup()
  
  main = new Main()
  main.setup()
  
  allScenes = {
    main,
    home
  }

}

function keyPressed() {
  main.keyPressed(key)
}

function draw() {
  allScenes[currentScene].draw();
}
