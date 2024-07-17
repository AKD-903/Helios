function toggleMenu() {
    const navContainer = document.querySelector('.navContainer');
    navContainer.classList.toggle('open');
    document.getElementById("userProfile").innerHTML="User Profile";
}