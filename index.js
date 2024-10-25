let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
};

let deviceType = "";
let draw = false;
let erase = false;

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

function createGrid(rows, cols) {
    container.innerHTML = "";
    let count = 0;
    for (let i = 0; i < rows; i++) {
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow");

        for (let j = 0; j < cols; j++) {
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${count}`);
            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            });

            col.addEventListener(events[deviceType].move, (e) => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY
                ).id;
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col);
        }
        container.appendChild(div);
    }
}

// Genera una cuadrícula de 35x35 al cargar la página
window.onload = () => {
    gridWidth.value = 35;
    gridHeight.value = 35;
    widthValue.innerHTML = "35";
    heightValue.innerHTML = "35";
    createGrid(35, 35);
};

gridButton.addEventListener("click", () => {
    createGrid(gridHeight.value, gridWidth.value);
});

function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((element) => {
        if (elementId === element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorButton.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
});

// Cambiar el cursor a un pincel o borrador según el modo activo
eraseBtn.addEventListener("click", () => {
    erase = true;
    container.style.cursor = "url('borrador.png'), auto"; // Cambia 'borrador.png' a la ruta de tu imagen de borrador
});

paintBtn.addEventListener("click", () => {
    erase = false;
    container.style.cursor = "url('pincel.png'), auto"; // Cambia 'pincel.png' a la ruta de tu imagen de pincel
});

gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 10 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 10 ? `0${gridHeight.value}` : gridHeight.value;
});

// Agregar funcionalidad para descargar la cuadrícula como PNG
function downloadPixelArt() {
    const canvas = document.createElement('canvas');
    const cellSize = 10; // Tamaño en píxeles para cada celda
    const width = parseInt(gridWidth.value);
    const height = parseInt(gridHeight.value);let container = document.querySelector(".container");
    let gridButton = document.getElementById("submit-grid");
    let clearGridButton = document.getElementById("clear-grid");
    let gridWidth = document.getElementById("width-range");
    let gridHeight = document.getElementById("height-range");
    let colorButton = document.getElementById("color-input");
    let eraseBtn = document.getElementById("erase-btn");
    let paintBtn = document.getElementById("paint-btn");
    let widthValue = document.getElementById("width-value");
    let heightValue = document.getElementById("height-value");
    
    let events = {
        mouse: {
            down: "mousedown",
            move: "mousemove",
            up: "mouseup"
        },
        touch: {
            down: "touchstart",
            move: "touchmove",
            up: "touchend",
        },
    };
    
    let deviceType = "";
    let draw = false;
    let erase = false;
    
    const isTouchDevice = () => {
        try {
            document.createEvent("TouchEvent");
            deviceType = "touch";
            return true;
        } catch (e) {
            deviceType = "mouse";
            return false;
        }
    };
    
    isTouchDevice();
    
    function createGrid(rows, cols) {
        container.innerHTML = "";
        container.style.gridTemplateColumns = `repeat(${cols}, 20px)`;
        let count = 0;
        for (let i = 0; i < rows; i++) {
            count += 2;
            let div = document.createElement("div");
            div.classList.add("gridRow");
    
            for (let j = 0; j < cols; j++) {
                count += 2;
                let col = document.createElement("div");
                col.classList.add("gridCol");
                col.setAttribute("id", `gridCol${count}`);
                col.addEventListener(events[deviceType].down, () => {
                    draw = true;
                    if (erase) {
                        col.style.backgroundColor = "transparent";
                    } else {
                        col.style.backgroundColor = colorButton.value;
                    }
                });
    
                col.addEventListener(events[deviceType].move, (e) => {
                    let elementId = document.elementFromPoint(
                        !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                        !isTouchDevice() ? e.clientY : e.touches[0].clientY
                    ).id;
                    checker(elementId);
                });
    
                col.addEventListener(events[deviceType].up, () => {
                    draw = false;
                });
    
                div.appendChild(col);
            }
            container.appendChild(div);
        }
    }
    
    // Genera una cuadrícula de 35x35 al cargar la página
    window.onload = () => {
        gridWidth.value = 35;
        gridHeight.value = 35;
        widthValue.innerHTML = "35";
        heightValue.innerHTML = "35";
        createGrid(35, 35);
    };
    
    gridButton.addEventListener("click", () => {
        let width = Math.min(gridWidth.value, 50); // Limitar a 50
        let height = Math.min(gridHeight.value, 50); // Limitar a 50
        createGrid(height, width);
    });
    
    clearGridButton.addEventListener("click", () => {
        container.innerHTML = "";
    });
    
    eraseBtn.addEventListener("click", () => {
        erase = true;
    });
    
    paintBtn.addEventListener("click", () => {
        erase = false;
    });
    
    gridWidth.addEventListener("input", () => {
        widthValue.innerHTML = gridWidth.value < 10 ? `0${gridWidth.value}` : gridWidth.value;
    });
    
    gridHeight.addEventListener("input", () => {
        heightValue.innerHTML = gridHeight.value < 10 ? `0${gridHeight.value}` : gridHeight.value;
    });
    
    
    canvas.width = width * cellSize;
    canvas.height = height * cellSize;
    const ctx = canvas.getContext('2d');

    document.querySelectorAll('.gridCol').forEach((cell, index) => {
        const x = (index % width) * cellSize;
        const y = Math.floor(index / width) * cellSize;
        ctx.fillStyle = cell.style.backgroundColor || '#FFFFFF';
        ctx.fillRect(x, y, cellSize, cellSize);
    });

    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Agregar botón de descarga al HTML
const downloadBtn = document.createElement('button');
downloadBtn.textContent = 'Descargar Pixel Art';
downloadBtn.addEventListener('click', downloadPixelArt);
document.querySelector('.opt-wrapper').appendChild(downloadBtn);
