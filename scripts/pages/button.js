class Button {
  constructor(text, positionX, positionY, cssClass) {
    this.text = text
    this.positionX = positionX
    this.positionY = positionY
    this.cssClass = cssClass
    this.button = createButton(this.text)
    this.button.addClass(this.cssClass)

    if (currentScene === 'home') {
      this.button.mousePressed(() => this._startGame());
    }

    if (currentScene === 'main' && this.cssClass === 'botao-reiniciar') {
      this.button.mousePressed(() => this._restartStage());
    }
    
    if (currentScene === 'main' && this.cssClass === 'botao-home') {
      this.button.mousePressed(() => this._homeGame());
    }
    
  }

  setup() {
    this.newScreen.draw()
  }

  draw() {
    this.button.position(this.positionX, this.positionY)
    this.button.center('horizontal')
  }

  _startGame() {
    this.button.remove();
    currentScene = 'main'
    gameMusic.loop()
    gameMusic.setVolume(0.3)
  }

  _restartStage() {
    this.button.remove();
    main.restart();
  }
  
  _homeGame(){
    this.button.remove();
    currentScene = 'home'
    startButton = new Button('Start', width / 2, height / 1.35, 'botao-tela-inicial')
    main.restart()
    gameMusic.stop()
    loop()
  }
  
  none(){
    this.button.addClass('none')
  }
  
}