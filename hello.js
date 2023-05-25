const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
console.log(ctx);

// GRANDEZZA DELL'AREA DEL CANVAS
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// INSTANZIO IL MIO OGGETTO IMMAGINE
const playerImage = new Image();
playerImage.src = 'shadow_dog.png';

// INDICO QUANTO E' GRANDE OGNI MIO SPRITE (OGNI SINGOLA IMMAGINE DELL'ANIMAZIONE)
const spriteWidth = 575;
const spriteHeight = 523;

let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrame = 3;

const spriteAnimation = [];
const animationStates = [
    {
        name: "idle",
        frames: 7,
    },
    {
        name: "jump",
        frames: 7,
    },
];

// SCORRO LE VARIE ANIMAZIONI POSSIBILI
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }

    // SCORRO TUTTI I FRAME DELL'ANIMAZIONE IN ESAME E MEMORIZZO LE SUE COORDINATE
    for(let j=0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y:positionY});
    }

    // SALVO LE COORDINATE DI TUTTI I FRAME DI UNA DETERMINATA ANIMAZIONE
    spriteAnimation[state.name] = frames;
})

function animate() {
    // PULISCO L'AREA DA ANIMARE
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    let position = Math.floor(gameFrame/staggerFrame) % spriteAnimation["idle"].loc.length;
    frameX = spriteWidth * position;

    // DISEGNO LA MIA IMMAGINE
    // drawImage(nomeImg, coordinataX da cui ritagliare, cooY da cui ritagliare, larghezza da ritagliare
    // altezza da ritagliate, cooX del canvas su cui metterel'img, cooY del canvas su cui mettere l'img,
    // larghezza della immagine, altezza della immagina)
    ctx.drawImage(playerImage, frameX, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();