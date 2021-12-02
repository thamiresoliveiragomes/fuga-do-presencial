function preload() {
  data = loadJSON('data/data.json');

  backgroundHome = loadImage('images/background/homeScreen.gif');

  backgroundMainDay = loadImage('images/background/day.jpg');
  
  backgroundMainNight = loadImage('images/background/night.jpg');
  
  backgroundMainSunrise = loadImage('images/background/sunrise.jpg');

  imageCharacterWalk = loadImage('images/character/walk.png');

  imageCharacterJump = loadImage('images/character/jump.png');

  imageEnemy1 = loadImage('images/enemies/enemy1.png');

  imageEnemy2 = loadImage('images/enemies/enemy2.png');

  imageEnemy3 = loadImage('images/enemies/enemy3.png');

  imageLife = loadImage('images/assets/heart2.png');

  imageGameOver = loadImage('images/assets/gameover2.jpg');
  
  imageWin = loadImage('images/assets/win.jpg');
  
  fontZelda = loadFont('font/fontZelda.otf')

  gameMusic = loadSound('sound/musica-natal.mp3');

  jumpSound = loadSound('sound/somPulo.mp3');
}