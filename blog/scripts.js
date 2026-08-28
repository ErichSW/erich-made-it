
/* 
input: nothing
output: array with 3 integers used for rgb
*/
function candyColors() {
    let min = 200;
    let max = 255;
    
    let r = Math.floor(Math.random() * (max - min + 1)) + min;
    let g = Math.floor(Math.random() * (max - min + 1)) + min;
    let b = Math.floor(Math.random() * (max - min + 1)) + min;
    
    let colors = [r, g, b];
    let cut = 0.9;
    
    // Find the lowest value and its index
    let lowestVal = Math.min(...colors);
    let lowestIndex = colors.indexOf(lowestVal);
    
    // Decrease the lowest value to boost saturation
    colors[lowestIndex] = Math.max(0, Math.floor(colors[lowestIndex] * cut));
    
    return colors;
}

/* creates nested elements used as a banner */
const containers = document.querySelectorAll('.box-container');
let width = 10;

containers.forEach(container => {
    for (let i = 0; i < width; i++) {
        const box = document.createElement('div');
        box.className = 'candy-box';
        container.appendChild(box);
    }
});

/* apply colors to posts and banner elements */
const elements = document.querySelectorAll('.post, .candy-box');

elements.forEach(el => {
    // Call your function to get an [r, g, b] array
    const [r, g, b] = candyColors();
    
    // Apply it as a background color
    el.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    
    // border darkness
    let d = 0.8; 
    el.style.borderColor = `rgb(${r * d}, ${g *d}, ${b * d})`;
});