main();

function main() {
  displayOrderIdAndPrice();
}

function displayOrderIdAndPrice() {

  
  let spanPrice = document.querySelector('.display-price');  
  spanPrice.innerText = localStorage.getItem('total');

  let spanId = document.querySelector('.display-orderid'); 
  spanId.innerText = localStorage.getItem("orderId");


  // On vide le localStorage pour recommencer plus tard le processus d'achat
  localStorage.clear(); 
}

