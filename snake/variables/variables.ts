const GAME_COLORS = {
  snakeBody: 'sienna', // Цвет тела змеи
  snakeHead: 'saddlebrown', // Цвет головы змеи
  apple: 'red', // Цвет яблока
  bombs: 'black', // Цвет бомб
};

const CANVAS_SIZE = [20, 20]; // Размер холста [ширина, высота]; Примечание: фоновое изображение имеет размер 20x20 и не масштабируется при изменении CANVAS_SIZE!

const SNAKE_START = [[7, 9]]; // Начальная позиция змеи; координаты [x, y]

const FIRST_APPLE = [12, 9]; // Начальная позиция яблока; координаты [x, y]

const SPEED = 3; // Скорость змеи; чем меньше значение, тем быстрее змея двигается

const BOMB_SPAWN_TIME = 30000; // Как часто должна появляться новая бомба (в миллисекундах)

const LEVEL_MULTIPLIER = 5; // Змея будет двигаться быстрее после поедания X яблок

const APPLE_SPEED = 10000; // Изменение позиции яблока (в миллисекундах)

const DIRECTIONS = {
  ArrowUp: [0, -1], // Направление движения при нажатии клавиши стрелка вверх; координаты [x, y]
  ArrowDown: [0, 1], // Направление движения при нажатии клавиши стрелка вниз; координаты [x, y]
  ArrowLeft: [-1, 0], // Направление движения при нажатии клавиши стрелка влево; координаты [x, y]
  ArrowRight: [1, 0], // Направление движения при нажатии клавиши стрелка вправо; координаты [x, y]
};

export {
  GAME_COLORS,
  CANVAS_SIZE,
  SNAKE_START,
  FIRST_APPLE,
  SPEED,
  BOMB_SPAWN_TIME,
  LEVEL_MULTIPLIER,
  APPLE_SPEED,
  DIRECTIONS,
};
