const Canvas = document.getElementById('MyCanvas');
const Ctx = Canvas.getContext('2d');

let drawing;
let drawAnimation;

window.addEventListener('mousemove', (event) => {
    mouse_coordinates.x = event.offsetX;
    mouse_coordinates.y = event.offsetY;
})

window.addEventListener('load', () => {
    let windowWidth =  window.innerWidth;
    let windowHeight = window.innerHeight;
    
    Canvas.width = windowWidth;
    Canvas.height = windowHeight;

    drawing = new Draw(Ctx, Canvas.width, Canvas.height);
    drawing.animate(0);
})

window.addEventListener('resize', () => {

    cancelAnimationFrame(drawAnimation);

    console.log('How dare you?');

    let windowWidth =  window.innerWidth;
    let windowHeight = window.innerHeight;
    
    Canvas.width = windowWidth;
    Canvas.height = windowHeight;

    Ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    drawing = new Draw(Ctx, Canvas.width, Canvas.height);
    drawing.animate(0);
})

let mouse_coordinates = {
    x: 0,
    y: 0
};

window.addEventListener('mousemove', (event) => {
    mouse_coordinates = {
        x: event.offsetX,
        y: event.offsetY
    }
})

class Draw{
    #ctx;
    #ctxWidth;
    #ctxHeight;
    linearGradient;
    lastTime;
    interval;
    timer;
    constructor(ctx, width, height){
        this.#ctx = ctx;
        this.#ctx.lineWidth = 0.75;
        this.#ctxWidth = width;
        this.#ctxHeight = height;
        this.#createLinearGradient();
        this.angle = 0;
        this.interval = 500;
        this.lastTime = 0;
        this.timer = 0;
        this.cellSize = 7.5;
        this.#ctx.strokeStyle = this.linearGradient;
        this.radius = 0;
        this.rd = .075;
    }
    #createLine(angle, x, y){
        let positionX = x;
        let positionY = y;
        let distanceX = mouse_coordinates.x - positionX;
        let distanceY = mouse_coordinates.y - positionY;
        let difference = (distanceX ** 2 + distanceY ** 2) / 15000;

        difference > 10 ? difference = 10 : ''

        const length = 20;
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x + Math.cos(angle) * difference, y + Math.sin(angle) * -difference);
        this.#ctx.stroke();
    }
    animate(timeStamp){
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        this.#ctx.clearRect(0, 0, this.#ctxWidth, this.#ctxHeight);
        //this.#createLine(mouse_coordinates.x, mouse_coordinates.y);
        if (this.timer > this.interval){
            this.angle += .1;
            this.radius += this.rd;
            this.#ctx.clearRect(0, 0, this.#ctxWidth, this.#ctxHeight);
            if (this.radius > 15 || this.radius < -15) this.rd *= -1;
            for (let y = 0; y < this.#ctxHeight; y += this.cellSize){
                for (let x = 0; x < this.#ctxWidth; x += this.cellSize){
                    const angle = (Math.cos(x * -0.01) + Math.sin(y * -0.01)) * this.radius;
                    this.#createLine(angle, x, y);
                }
            }
            //this.#createLine(this.#ctxWidth/2 + Math.sin(this.angle) * 100, 
            //this.#ctxHeight/2 + Math.cos(this.angle) * 100);
            
        }
        else{
            this.timer += deltaTime;
        }

        drawAnimation = requestAnimationFrame(this.animate.bind(this));
    }
    #createLinearGradient(){
        this.linearGradient = this.#ctx.createLinearGradient(0, 0, this.#ctxWidth, this.#ctxHeight);
        this.linearGradient.addColorStop('0.25', 'red');
        this.linearGradient.addColorStop('0.5', 'yellow');
        this.linearGradient.addColorStop('0.75', 'blue');
        this.linearGradient.addColorStop('0.99', 'purple');
    }
    #whereIsTheMouse(){
        console.log(window);
    }
};

// Effects for Site-icon and Document-title

const LinkOfIcon = document.querySelectorAll('link')[0];
const How_Dare_You = new Audio('src/music/Sound1.mp3');

window.addEventListener('blur', () => {
    
    // play the sound
    How_Dare_You.play();

    LinkOfIcon.href = 'src/images/icon-of-site2.png';
    document.title = 'Come back, betch';
})

window.addEventListener('focus', () => {
    LinkOfIcon.href = 'src/images/icon-of-site.png';
    document.title = 'Effect';
})