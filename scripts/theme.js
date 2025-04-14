const body = document.querySelector('body');
const themeDragElement = document.querySelector('.main-theme-button-round');
const themeButtonInners = document.querySelectorAll('.main-theme-button-inner');

// THEME OBJECT
const themeObject = {
    themeClasses: ['theme-one', 'theme-two', 'theme-three'],
};

// HANDLING THE THEME BUTTON INNERS

for (let i = 0; i < themeButtonInners.length; i++) {
    themeButtonInners[i].addEventListener('click', () => {
        body.setAttribute('class', themeObject.themeClasses[i]);
    });
};  