window.onload = () => {
  const dropdowns = document.querySelectorAll(".header-dropdown-content")
  
for (const dropdown of dropdowns) {
  
  dropdown.onclick = () => verificarClass(dropdown) 
}
  function verificarClass(e) {
    elemento = e.nextElementSibling
    elemento.classList.toggle("hidden");
  }
}

