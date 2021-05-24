function modalContent(modalName) {
    
  let pNegra = document.getElementById("pantallaNegra")
  let i;
  let x = document.getElementsByClassName("modal-content")

  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  pNegra.style.display = "flex";
  document.getElementById(modalName).style.display = "block"; 

  ////----CERRAR MODAL PLANTILLAS----------////
  if(document.querySelector('.close-forgotPassword'))
  document.querySelector('.close-forgotPassword').addEventListener('click', function() {
    if(document.querySelector('#forgotPassword'))
  document.querySelector('#forgotPassword').style.display = 'none';
  pNegra.style.display = "none"
  })
  if(pNegra)
  pNegra.addEventListener('click', function() {
  if(document.querySelector('#forgotPassword'))
  document.querySelector('#forgotPassword').style.display = 'none';
  pNegra.style.display = "none"
  })

  






}