// Over here we get the references to HTML elements
const mainCanvas = document.getElementById("main-canvas");
const instructions = document.getElementById("instructions");
const clearButton = document.getElementById("clear-button");
const downloadButton = document.getElementById("download-button");
const downloadedUrl = document.getElementById("downloaded-url");
const canvasButton = document.getElementById("canvas-button");
const instructionsButton = document.getElementById("instructions-button");
const instructionsBackButton = document.getElementById("instructions-back-button");

// We start the counter for downloaded images, it starts in 0 everytime the code runs
let imageCount = 0;

// Here is the function to clear the canvas
const clearCanvas = () => {
    const context = mainCanvas.getContext("2d");
    context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
};

// Now we can see the function to download the canvas content as an image
const downloadCanvas = () => {
    imageCount++;
    const imageName = `image_${imageCount}.png`;

    const link = document.createElement("a");
    mainCanvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = imageName;
        link.click();
        downloadedUrl.innerHTML = `Imagen descargada: <a href="${url}" target="_blank">${imageName}</a>`;
        URL.revokeObjectURL(url);
    }, "image/png");
};

// Here is the event for the clear and download button
clearButton.addEventListener("click", clearCanvas);
downloadButton.addEventListener("click", downloadCanvas);

// Event to show the canva after click the button
canvasButton.addEventListener("click", () => {
    mainCanvas.style.display = "block";
    instructions.style.display = "none";

    const context = mainCanvas.getContext("2d");

    let isDrawing = false;
    let initialX;
    let initialY;

    const startDrawing = (x, y) => {
        isDrawing = true;
        context.beginPath();
        context.moveTo(x, y);
    };

    const draw = (x, y) => {
        if (!isDrawing) return;
        context.lineTo(x, y);
        context.stroke();
    };

    const stopDrawing = () => {
        isDrawing = false;
        context.closePath();
    };

    // Event to be able to draw when yo click the mouse
    mainCanvas.addEventListener("mousedown", (e) => {
        startDrawing(e.offsetX, e.offsetY);
    });

    mainCanvas.addEventListener("mousemove", (e) => {
        draw(e.offsetX, e.offsetY);
    });

    mainCanvas.addEventListener("mouseup", stopDrawing);

    mainCanvas.addEventListener("touchstart", (e) => {
        e.preventDefault();
        startDrawing(e.touches[0].clientX, e.touches[0].clientY);
    });

    mainCanvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
        draw(e.touches[0].clientX, e.touches[0].clientY);
    });

    mainCanvas.addEventListener("touchend", stopDrawing);

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
});

// Event to show the instructions after you click the button
instructionsButton.addEventListener("click", () => {
    mainCanvas.style.display = "none";
    instructions.style.display = "block";
});