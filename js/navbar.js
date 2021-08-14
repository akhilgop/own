var nav = document.querySelector('nav'); // Identify target
window.addEventListener('scroll', function (event) { // To listen for event
    event.preventDefault();

    if (window.scrollY <= 150) {
        nbb.style.color = '#fff';
        nav.style.boxShadow = 'none !important';
    } else {
        nav.style.backgroundColor = '#fff';
        nav.style.boxShadow = '0px 1px 6px rgba(0, 0, 0, 0.1)';
        nav.style.height = '80px';
    }
});



var nav = document.querySelector('nav'); // Identify target
window.addEventListener('scroll', function (event) { // To listen for event
    event.preventDefault();

    if (window.scrollY == 0) {
        nav.style.boxShadow = 'none';
        nav.style.height = '150px';
    } else {
        nav.style.backgroundColor = '#fff';

    }
});