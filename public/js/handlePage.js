const profNav = document.getElementById('prof-nav');
const aboutNav = document.getElementById('about-nav');
const dashNav = document.getElementById('dash-nav');

if (window.location.pathname.endsWith("/profile")) {
    profNav.setAttribute('class', 'nav-link active');
    
} else if (window.location.pathname.endsWith("/about-us")){
    aboutNav.setAttribute('class', 'nav-link active');

} else {
    dashNav.setAttribute('class', 'nav-link active');
}