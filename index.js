// Variables to adjust Overlay
canvasWidth = 1920;                             // OBS canvas width
canvasHeight = 1080;                            // OBS canvas height
imgSource = "./images/online.png";              // HTTP Source for
imgSize = 1;                                    // Adjust final image size
canvasFramerate = 60;                           // OBS Framerate in FPS
imgVelocity = 1;

const canvas = document.querySelector(".canvas");
canvas.width = canvasWidth;
canvas.height = canvasHeight;
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = imgSource;
imgWidth = image.width * imgSize;
imgHeight = image.height * imgSize;
imgX = canvasWidth / 2 + imgWidth / 2;
imgY = canvasHeight / 2 + imgHeight / 2;
isImageLoaded = false;

image.addEventListener("load", () => {
    isImageLoaded = true;
    ctx.drawImage(image, imgX, imgY, imgWidth, imgHeight);
});

let lastTime = 0;
let targetTime = 1000 / canvasFramerate;
let imgXVelocity = imgVelocity / 5;
let imgYVelocity = imgVelocity / 5;

const drawFrame = (currentTime) => {
    const deltaTime = currentTime - lastTime;
    if (deltaTime > targetTime && isImageLoaded) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imgX = Math.floor(imgX + imgXVelocity * deltaTime);
        imgY = Math.floor(imgY + imgYVelocity * deltaTime);
        if (imgX + imgWidth > canvasWidth) {
            imgXVelocity = -1 * Math.abs(imgXVelocity);
        }
        if (imgX < 0) {
            imgXVelocity = Math.abs(imgXVelocity);
        }
        if (imgY + imgHeight > canvasHeight) {
            imgYVelocity = -1 * Math.abs(imgYVelocity);
        }
        if (imgY < 0) {
            imgYVelocity = Math.abs(imgYVelocity);
        }
        ctx.drawImage(image, imgX, imgY, imgWidth, imgHeight);
        lastTime = currentTime;
    }

    window.requestAnimationFrame(drawFrame);
};

requestAnimationFrame(drawFrame);