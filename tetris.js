const canvas = document.getElementById('tetris');
const contexto = canvas.getContext('2d');


contexto.scale(20,20);

//pieza T - intancia
// en si es una matriz que iremos dibujando
const matrixT = [
  [0,0,0],
  [1,1,1],
  [0,1,0]
];
//jugador
const player = {
  pos: {x : 6, y : 0},
  matrix:crearPieza('T'),
  score : 0
  //piezas creables : Cubo T L Linv S Z
};



//controles por teclado


  function playerMove(dir){

    player.pos.x += dir;
    //esto evitará que las piezas salgan de el canvas
    if (colision(arena,player)) {
      player.pos.x -= dir;
    }
  }


  document.addEventListener('keydown', event =>{
      console.log(event);
      //keycode helper http://pomle.github.io/keycode/
      if(event.keyCode === 39){
        playerMove(1);
      }else if(event.keyCode === 40){
        playerDrop();
      }else if(event.keyCode === 37){
        playerMove(-1);
      }else if(event.keyCode === 87){
        playerRotar(-1);
      }
      else if(event.keyCode === 81){
        playerRotar( 1);
      }
    });

//fin de controles por teclado

// area de dibujo

function crearMatrix(w,h){
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }

  return matrix;
}

// Arena como tal una tabla donde estarán "atoradas" las piezas

const arena = crearMatrix(16,20);
console.log(arena);
//console.table(arena); //esto se ve en la consola pero no es necesario
//solo es la arena vacía

//crear piezas por medio de matrices
// los numeros dentro de las matrices serán un identificador
// para poder darle colo a las piezas
function crearPieza(type){
    if (type === 'T') {
      return [
        [1,1,1],
        [0,1,0],
        [0,1,0]
      ];
    }else if (type === 'L') {
      return [
        [2,2,2],
        [2,0,0],
        [0,0,0]
      ];
    }else if (type === 'S') {
      return [
        [0,0,0],
        [0,3,3],
        [3,3,0]
      ];
    }else if (type === 'Z') {
      return [
      [4,4,0],
      [0,4,4],
      [0,0,0]
      ];

    }else if (type === 'J') {
      return [
        [5,5,5],
        [0,0,5],
        [0,0,0]
      ];
    }else if (type === 'C') {
      return [
        [6,6,0],
        [6,6,0],
        [0,0,0]
      ];
    }
    else if (type === 'G') {
      return [
        [0,7,0],
        [0,7,0],
        [0,7,0]
      ];
    }
  }

  const colores = [
  null,
  '#ff1a75',
  '#5cd65c',
  'violet',
  '#66a3ff',
  '#ff66cc',
  '#ff8000',
  '#ffff00'
  ];

function playerReset(){
   const piezas = 'CJLZSTG';
   player.matrix = crearPieza(piezas[piezas.length * Math.random() | 0]);
   player.pos.y = 0;
   player.pos.x = 6;//(arena[0].length / 2| 0) -
                  //(player.matx[0].length / 2| 0);

//esto reinicia el tablero al no poder llebar màs columnas
    if (colision(arena,player)) {
      arena.forEach(row =>row.fill(0));
      alert('has perdido, lo siento baby blue ');
    }
 }



//merge significa combiar
/*
con merge combinamos los valores de la matris de una figura
con una posición real dentro de la area, area nos sirve para
acomodar las piezas según caen en una 'arena' y podemos verlo dentro
de console.table(arena); podremos ver el cambio gradual en la tabla
arena
*/
function merge(arena, player){
  player.matrix.forEach((row,y)=>{
    row.forEach((value,x)=>{
        if (value!=0) {
          arena[y+player.pos.y][x+player.pos.x]= value;
        }
      });
    });
}

function playerDrop(){
  player.pos.y++;
  //esto es para saber si ya ha hecho colision alguna matris
  if (colision(arena,player)) {
    player.pos.y--;
    //combinamos la tabla con la pieza del jugador
    merge(arena,player);
    playerReset();
    //player.pos.y= 0;
    sweepArena();
    updateScore();

  }
  dropCounter=0;
}


//dibujar todo
function dibujar(){
  contexto.fillStyle = '#000';
  contexto.fillRect (0,0,canvas.width,canvas.height);

  //aquí vamos a dibujar el progreso de la tabla arena
  dibujarT(arena,{x:0,y:0});
  dibujarT(player.matrix, player.pos);
};

//dibujando matris t, con eso cambias su posición
// player.pos.y = 0
// player.pos.x = 0
function dibujarT(matrix, offset){
  matrix.forEach((row , y) =>{
    row.forEach((value, x) =>{
      if (value !== 0) {
        contexto.fillStyle = colores[value];
        contexto.fillRect (x + offset.x,
                           y + offset.y,
                           1 ,1);
      }
    });
  });
}

//rotar pieza

function playerRotar(dir){
  let offset = 1;
  const posi = player.pos.x;
  rotar(player.matrix , dir);
  // este while nos ayuda a determinar
  // el area 'jugable' si se sale del arena
  //rotará la pieza
  while (colision(arena,player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : - 1));
/*dara un pequeño brinco al rotar y asì no saldrá
de la arena si estamos cerca al borde*/
    if (offset > player.matrix[0].length) {
      rotar(player.matrix, -dir);
      return;
    }
  }
}

function  rotar(matrix,dir){
    for (let y = 0; y < matrix.length; ++y) {
      for (var x = 0; x < y; ++x) {
        [
          matrix[x][y],
          matrix[y][x],
        ]=[
          matrix[y][x],
          matrix[x][y],
        ];
      }
    }
    if (dir > 0) {
      matrix.forEach(row => row.reverse());
    }else{
      matrix.reverse();
    }
}


//colisión

function colision(arena,player){
  const [matx,po] = [player.matrix,player.pos];
  for(let y = 0; y < matx.length; y++){
    for(let x = 0; x < matx[y].length;x++){
      if  (matx[y][x]!== 0 &&
          (arena[y +po.y] &&  //arena row exist?
          arena[y+po.y][x+po.x])!==0
          ){
            return true;
      }
    }
  }
  return false;
}

//termina colisión


//Limpiar Arena

function sweepArena(){
  let rowCount = 1;
  outer: for(let y = arena.length -1; y > 0; --y){
    for(let x = 0; x < arena[y].length; ++ x){
      if(arena[y][x]===0){
        continue outer;
      }
    }
    const row = arena.splice(y,1)[0].fill(0);
    arena.unshift(row);
    ++y

    player.score += rowCount * 10;
    rowCount *= 2;
  }
}

//termina Limpiar Arena

function updateScore(){
 document.getElementById('score').innerText = player.score;
}

//update de la ventana
let dropCounter = 0;
let dropInterval = 1000;

let lasttime = 0
function updateDibujo(time = 0){
  const deltaTime = time - lasttime;
  lasttime = time;
//console.log(time);
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }

  dibujar();
  requestAnimationFrame(updateDibujo);
};

updateDibujo();
playerReset();


//fin area de dibujo
