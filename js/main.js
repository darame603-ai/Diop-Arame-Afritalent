// DARK/LIGHT mode
const btnDark = document.getElementById('btnDark');
if (localStorage.getItem('darkMode')==='enabled'){
    document.body.classList.add('dark-mode');
    if (btnDark) btnDark.textContent =  '☀️ Light';
}

function toggleDarkMode(){
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')){
        localStorage.setItem('darkMode', 'enabled');
        btnDark.textContent = '☀️';
    }
    else{
        localStorage.setItem('darkMode', 'disabled')
        btnDark.textContent = '🌙';
    }
}

// Navbar au scroll
window.addEventListener('scroll', function(){
    const navbar = document.querySelector('.navbar');
    const btnTop = document.getElementById('btnTop');
    // effet shrink
    if (window.scrollY > 50){
        navbar.classList.add('navbar-scrolled');
    }
    else{
        navbar.classList.remove('navbar-scrolled');
    }
    
// Bouton retour en haut
if (window.scrollY > 300){
    btnTop.style.display = 'flex';
}
else{
    btnTop.style.display = 'none';
}
});

// Retour en haut
function scrollToTop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}