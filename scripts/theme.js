const body = document.querySelector('body');
const themeDragElement = document.querySelector('.main-theme-button-round');
const themeButtonInners = document.querySelectorAll('.main-theme-button-inner');
let themeDragElementPosX = 0;

// THEME OBJECT
const themeObject = {
    themeClasses: ['theme-one', 'theme-two', 'theme-three'],
    themeTransform: ['translate(0, -50%)', 'translate(15px, -50%)', 'translate(30.5px, -50%)'],
};

// HANDLING THE THEME BUTTON INNERS

for (let i = 0; i < themeButtonInners.length; i++) {
    themeButtonInners[i].addEventListener('click', () => {
        body.setAttribute('class', themeObject.themeClasses[i]);
        themeDragElement.style.transform = themeObject.themeTransform[i];
    });
};

// MOVING THE DRAG ELEMENT TO CHANGE THE THEME
themeDragElement.addEventListener('mousedown', () => {
    themeDragElementPosX = themeDragElement.offsetLeft;

    document.addEventListener('mousemove', moveTheDragElement);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', moveTheDragElement);

        if (themeDragElementPosX < 8) {
            body.setAttribute('class', themeObject.themeClasses[0]);
            themeDragElement.style.transform = 'translate(0, -50%)';
        } else if (themeDragElementPosX > 8 && themeDragElementPosX < 22) {
            themeDragElement.style.transform = 'translate(15px, -50%)';
            body.setAttribute('class', themeObject.themeClasses[1]);
        } else {
            themeDragElement.style.transform = 'translate(30.5px, -50%)';
            body.setAttribute('class', themeObject.themeClasses[2]);
        };
    });
});

function moveTheDragElement(e) {
    themeDragElementPosX = e.clientX - (themeDragElement.parentNode.offsetLeft + (themeDragElement.offsetWidth / 2) + themeDragElement.offsetLeft);

    themeDragElement.style.transform = `translate(${themeDragElementPosX}px, -50%)`;

    if (themeDragElementPosX < 1) {
        document.removeEventListener('mousemove', moveTheDragElement);
        themeDragElement.style.transform = 'translate(0px, -50%)';
    } else if (themeDragElementPosX > 31) {
        document.removeEventListener('mousemove', moveTheDragElement);
        themeDragElement.style.transform = 'translate(31px, -50%)';
    };
};