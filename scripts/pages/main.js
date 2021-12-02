class Main {
  constructor() {
    this.index = 0
    // this.enemiesMap = [...data.enemiesMap]
    this.gif = createImg('images/assets/espaço.gif', 'gif')
  }

  setup() {
    this.gif.addClass('gif')
    this.gif.position(100, 100)
    this.gif.center('horizontal')
    this.gif.hide()

    mainScreen = new Screen(backgroundMainSunrise, 4)

    life = new Life(data.life.maximum, data.life.initial)

    score = new Score()

    characterWalk = new Character(matrizCharacterWalk, imageCharacterWalk, 0, -5, 400, 400, 1000, 1000, collisionPolygonCharacterWalk, matrizWalkCollide);

    characterJump = new Character(matrizCharacterWalk, imageCharacterJump, 0, -5, 400, 400, 1000, 1000, collisionPolygonCharacterWalk, matrizWalkCollide);

    characterPositions.push(characterWalk)
    characterPositions.push(characterJump)

    const enemyRain = new Enemy(matrizEnemy1, imageEnemy1, width, 15, 400, 400, 1000, 1000, collisionPolygonEnemy1, 0, 750);

    const enemyMetro = new Enemy(matrizEnemy2, imageEnemy2, width, -135, 500, 500, 1000, 1000, collisionPolygonEnemy2, 0, 1630);

    const enemyClockSlow = new Enemy(matrizEnemy3, imageEnemy3, width, 15, 150, 150, 1000, 1000, collisionPolygonEnemy3, 10, 2200);
    
    const enemyClockFast = new Enemy(matrizEnemy3, imageEnemy3, width, 15, 150, 150, 1000, 1000, collisionPolygonEnemy3, 20, 1000);

    allEnemies.push(enemyRain)
    allEnemies.push(enemyMetro)
    allEnemies.push(enemyClockSlow)
    allEnemies.push(enemyClockFast)

  }

  keyPressed(key) {
    if (key === ' ' && currentScene === 'main') {
      this.gif.remove()
      if (characterJump.jumps < 2 && currentScene === 'main') {
        jumpSound.play();
      }
      characterPositions.map(character => character.jump())
    }
  }

  draw() {
    mainScreen.show();
    mainScreen.move();

    score.show();
    score.add();
    
    this.gif.show()

    if (parseInt(score.score) === 50) {
      mainScreen.image = backgroundMainDay
      if(allEnemies[2].x < -150 || allEnemies[2].x > width) {
        allEnemies[2].speed = 0
      }
      if(allEnemies[3].x < -150 || allEnemies[3].x > width) {
        allEnemies[3].speed = 0
      }
      allEnemies[1].speed = 14
    }
    
    if (parseInt(score.score) === 100) {
      mainScreen.image = backgroundMainNight
      if(allEnemies[1].x < -500 || allEnemies[1].x > width) {
        allEnemies[1].speed = 0
      }
      allEnemies[0].speed = 12
    }
    
    if (parseInt(score.score) === 150) {
      allEnemies[3].speed = 17
      allEnemies[3].delay = 4000
      allEnemies[2].speed = 17
      allEnemies[2].delay = 2800
      allEnemies[1].speed = 15
      allEnemies[1].delay = 2500
      allEnemies[0].speed = 14
      allEnemies[0].delay = 3000
    }
    
    if (parseInt(score.score) === 200) {
      allEnemies.map(enemy => enemy.x = width + enemy.delay)
      life.currentLife = 0
      image(imageWin, 0, 0, width, height);
      characterWalk.x = -500
      characterJump.x = -500
      this._restartButton()
      this._homeButton()
      noLoop()
    }

    if (characterWalk.onFloor()) {
      characterWalk.show();
      characterWalk.applyGravity();
      indexCharacterPosition = 0
    } else {
      if (!characterJump.onFloor()) {
        characterWalk.applyGravity();
      }
      characterJump.show();
      characterJump.animate();
      characterJump.applyGravity();
      indexCharacterPosition = 1
    }

    const showEnemies = allEnemies.map(currentEnemy => {

      const visibleEnemy = currentEnemy.x < -currentEnemy.imageWidth;

      currentEnemy.show()
      currentEnemy.move()

      if (visibleEnemy) {
        currentEnemy.showAgain()
      }

      if (characterPositions[indexCharacterPosition].collide(currentEnemy)) {
        life.remove()
        characterPositions[0].stayInvincible()
        characterPositions[1].stayInvincible()

        if (life.currentLife < 1) {
          // image(imageGameOver, width, height, 1080, 1080)
          allEnemies.map(enemy => enemy.x = width + enemy.delay)
          mainScreen = new Screen(imageGameOver, 0)
          mainScreen.show()
          this._restartButton()
          this._homeButton()
          noLoop()
        }
      }
    })

    life.draw();
  }

  _restartButton() {
    this.restartButton = new Button('Restart', width, height / 2.5, 'botao-reiniciar');

    this.restartButton.draw();
  }

  restart() {
    mainScreen = new Screen(backgroundMainSunrise,4)
    life.currentLife = data.life.initial;
    score.score = 0;
    allEnemies[0].speed = 0
    allEnemies[0].delay = 750
    allEnemies[1].speed = 0
    allEnemies[1].delay = 1630
    allEnemies[2].speed = 10
    allEnemies[2].delay = 2200
    allEnemies[3].speed = 20
    allEnemies[3].delay = 1000
    allEnemies.map(enemy => enemy.x = width + enemy.delay)
    characterWalk.x = 0
    characterJump.x = 0
    this.homeButton.none()
    this.restartButton.none()
    loop()
  }
  
  _homeButton() {
    this.homeButton = new Button('Home', width, height / 2.5, 'botao-home');

    this.homeButton.draw();
  }

}