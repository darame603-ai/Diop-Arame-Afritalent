
document.body.classList.add('js-loaded');
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

// Compteurs statistiques
function animerCompteur(element){
    const target = parseInt(element.getAttribute('data-target'));
    const duree = 2000;
    const increment = target / (duree / 16);
    let actuel = 0;
    const timer = setInterval(() => {
        actuel += increment;
        if (actuel >= target){
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        }
        else{
            element.textContent = Math.floor(actuel).toLocaleString();
        }
    },16);
}

// Fade-in
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
            const Compteurs = entry.target.querySelectorAll('.stat-nombre');
            Compteurs.forEach(c => animerCompteur(c));
            observer.unobserve(entry.target);
        }
    });
}, {threshold:0.2});
document.querySelectorAll('.fade-section').forEach(section =>{
    observer.observe(section);
});

// FILTRAGE POUR LES FREELANCES
function filtrer(categorie) {
  const cartes = document.querySelectorAll('[data-categorie]');
  const boutons = document.querySelectorAll('.filtre-btn');

  // Met à jour le bouton actif
  boutons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  // Filtre les cartes
  cartes.forEach(carte => {
    if (categorie === 'tous' || 
        carte.getAttribute('data-categorie') === categorie) {
      carte.style.display = 'block';
    } else {
      carte.style.display = 'none';
    }
  });
}

// Validation de formulaire
function validerFormulaire(event){
    event.preventDefault();
    let valide = true;
    // Récupère les champs
    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
     const email = document.getElementById('email');
      const message = document.getElementById('message');
    // Réinitialise les erreurs
    document.querySelectorAll('.erreur').forEach(e => e.textContent = '');
    document.querySelectorAll('.form-control').forEach(f => {
        f.classList.remove('is-invalid');
        f.classList.remove('is-valid');
    });
    // Verification nom
    if (nom && nom.value.trim()===''){
        afficherErreur('erreur-nom', 'Le nom est requis');
        nom.classList.add('is-invalid');
        valide = false;
    }
    else if (nom){
        nom.classList.add('is-valid')
    }
    // verification prenom
    if (prenom && prenom.value.trim()===''){
        afficherErreur('erreur-prenom','Le prenom est requis')
    }
    else if(prenom){
        prenom.classList.add('is-valid');
    }
    // Verification email avec regex
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !regexEmail.test(email.value)){
        afficherErreur('erreur-email','Format email invalide (ex:nom@email.com)');
        email.classList.add('is-invalid');
        valide = false;
    }
    else if (email){
        email.classList.add('is-valid');
    }
    // Verification message (minimum 20 caractères)
    if (message && message.value.trim().length<20){
        afficherErreur('erreur-message',
            'Message trop court(20 caractères minimum)');
        message.classList.add(is-invalid);
        valide = false;
    }
    else if (message){ 
        message.classList.add('is-valid');
    }
    // Message de succès si tout est valide
    if (valide) {
        document.getElementById('message-succes').style.display = 'block';
        event.target.reset(); 
        setTimeout(()=>{
             document.getElementById('message-succes').style.display = 'none';
        },3000);
    }
}

function afficherErreur(id,message){
    const el = document.getElementById(id);
    if (el) el.textContent = message;
}