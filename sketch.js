//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 16;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;

// variáveis oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
//COM MULTPLAYAER
//if(keyIsDown(87)){
    //yRaqueteOponente -= 10;
  //}
  //if(keyIsDown(83)){
    //yRaqueteOponente += 10;
  //}


let colidiu = false;

// placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// sons do jogo
let raquetada
let ponto
let trilha

//possibilidade de erro da raquete oponente
let chanceDeErrar = 0;

function preload() {
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("pontos.wav");
  trilha = loadSound("trilha.mp3");
  
}

function setup() {
  createCanvas(600, 400); // Largura e Altura do ambiente
  trilha.loop();
}

function draw() {
  background(0); 
  mostraBolinha();  
  movimentaBolinha(); 
  verificarColisaoBorda(); 
  mostrarRaquete(xRaquete, yRaquete); 
  movimentaMinhaRaquete(); 
  //verificaColisaoRaquete(); 
  verificarColisaoRaquete(xRaquete, yRaquete);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificarColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  
}
// funções da bolinha
function mostraBolinha(){
   circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    XBolinha = 23
    }
}


function verificarColisaoBorda(){
  if (xBolinha + raio > width || 
      xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha + raio > height || 
     yBolinha - raio <0){
    velocidadeYBolinha *= -1;
  }
}
// funções das raquetes
function mostrarRaquete(x,y){
   rect(x, y, larguraRaquete, 
        alturaRaquete)
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}
// colisão da raquete
function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + larguraRaquete
&& yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
// solução para colisão do github
function   verificarColisaoRaquete(x, y){
  colidiu =
  collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - larguraRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
}

// placar e pontuação
function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(color(105, 89, 205));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(105, 89, 205));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
} 

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}
function calculaChanceDeErrar(){
  if(pontosDoOponente >= meusPontos){
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40
    }
  }  else{
        chanceDeErrar -= 1
        if (chanceDeErrar <= 35){
            chanceDeErrar = 35
      }
  }
}